const { marshall } = require("@aws-sdk/util-dynamodb");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const db = new DynamoDB();

module.exports = async (item, desc) => {
  await db.putItem({
    TableName: process.env.ATTENDANCETABLE,
    Item: marshall({
      description: desc,
      email: item?.email.S,
      userId: item?.userId.S,
      username: item?.username.S,
      createdAt: new Date().toLocaleString().slice(0, 9),
    }),
  });
};
