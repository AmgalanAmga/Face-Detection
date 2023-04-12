const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const db = new DynamoDB();

module.exports = async (email) => {
  const { Items } = await db.query({
    TableName: process.env.STUDENTSTABLE,
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email },
    },
  });
  return Items;
};
