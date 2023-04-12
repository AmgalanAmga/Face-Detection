const { Rekognition } = require("aws-sdk");
const { marshall } = require("@aws-sdk/util-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const writeAttendance = require("../utils/writeAttendance");

const db = new DynamoDB();
const rekognition = new Rekognition();

module.exports.handler = async (event) => {
  const {
    object: { key },
    bucket: { name },
  } = event.Records[0].s3;
  const res = await rekognition
    .searchFacesByImage({
      CollectionId: "students",
      Image: { S3Object: { Bucket: name, Name: key } },
    })
    .promise();
  const faceId = res.FaceMatches[0].Face.FaceId;
  const { Item } = await db.getItem({
    TableName: process.env.COLLECTIONTABLE,
    Key: marshall({ faceId }),
  });
  const lessonStarts = new Date();
  lessonStarts.setHours(5, 0, 0);
  const currentTime = Date.now();
  const substractedTime = (currentTime - lessonStarts.getTime()) / 60000;
  if (substractedTime < 0) {
    await writeAttendance(Item, "Цагтаа ирэв");
  } else if (substractedTime > 0 && substractedTime < 30) {
    await writeAttendance(Item, `${substractedTime.toFixed()} минут хоцров`);
  } else {
    await writeAttendance(Item, "Ирсэн гэвч тасаар бүртгэв.");
  }
};
