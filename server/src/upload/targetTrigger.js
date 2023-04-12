const { Rekognition } = require("aws-sdk");
const { marshall } = require("@aws-sdk/util-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const db = new DynamoDB();
const rekognition = new Rekognition();

module.exports.handler = async (event) => {
  const {
    object: { key },
    bucket: { name },
  } = event.Records[0].s3;
  const res = await rekognition
    .indexFaces({ CollectionId: "students", Image: { S3Object: { Bucket: name, Name: key } } })
    .promise();
  const faceId = res.FaceRecords[0].Face.FaceId;
  const userId = key.split("/")[1].split(".")[0];
  const { Item } = await db.getItem({
    TableName: process.env.STUDENTSTABLE,
    Key: marshall({ userId }),
  });
  await db.putItem({
    TableName: process.env.COLLECTIONTABLE,
    Item: marshall({
      faceId,
      email: Item.email.S,
      userId: Item.userId.S,
      username: Item.username.S,
    }),
  });
};
