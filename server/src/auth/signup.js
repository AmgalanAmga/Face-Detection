const { v4 } = require("uuid");
const { hashSync } = require("bcryptjs");
const response = require("../utils/response");
const { marshall } = require("@aws-sdk/util-dynamodb");
const checkIfEmailExists = require("../utils/checkUser");
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const db = new DynamoDB();

module.exports.handler = async (event) => {
  const { email, username, password, classno } = JSON.parse(event.body);

  /* Check if email exists in table */
  const result = await checkIfEmailExists(email);
  if (result.length > 0) return response(404, { msg: `This ${email} email exists. Please try again.` });

  /* Signup function */
  await db.putItem({
    TableName: process.env.STUDENTSTABLE,
    Item: marshall({
      email,
      classno,
      username,
      userId: v4(),
      password: hashSync(password, 15),
    }),
  });

  return response(200, { msg: "User successfully created." });
};
