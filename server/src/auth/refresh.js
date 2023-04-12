const response = require("../utils/response");
const { verify, sign } = require("jsonwebtoken");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const checkIfEmailExists = require("../utils/checkUser");

module.exports.handler = async (event) => {
  const userToken = event.headers.Authorization;
  const decode = verify(userToken, "mytoken");
  const result = await checkIfEmailExists(decode.email);
  const token = sign({ email: result[0].email.S }, "mytoken", { expiresIn: "1d" });
  return response(200, { user: unmarshall(result[0]), token });
};
