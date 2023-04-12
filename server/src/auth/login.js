const { sign } = require("jsonwebtoken");
const { compareSync } = require("bcryptjs");
const response = require("../utils/response");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const checkIfEmailExists = require("../utils/checkUser");

module.exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body);

  /* Check if email exists. */
  const result = await checkIfEmailExists(email);
  if (!result.length) return response(404, { msg: "User doesn't exist. Please register first." });

  const encryptPassword = compareSync(password, result[0].password.S);
  const token = sign({ email }, "mytoken", { expiresIn: "1d" });
  if (encryptPassword) {
    return response(200, { user: unmarshall(result[0]), token });
  } else {
    return response(404, { msg: "Your password is incorrect." });
  }
};
