const { verify } = require("jsonwebtoken");
const response = require("../utils/response");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const db = new DynamoDB();

module.exports.handler = async (event) => {
  const { userId } = event.queryStringParameters;
  try {
    const token = event.headers.Authorization;
    const decoded = verify(token, "mytoken");
    const { Items } = await db.query({
      TableName: process.env.ATTENDANCETABLE,
      KeyConditionExpression: "userId = :userId AND createdAt = :createdAt",
      ExpressionAttributeValues: {
        ":userId": { S: userId },
        ":createdAt": { S: new Date().toLocaleString().slice(0, 9) },
      },
    });
    if (!Items.length) return response(200, { data: false });
    return response(200, { data: unmarshall(Items[0]) });
  } catch (error) {
    return response(404, { error: error.message });
  }
};
