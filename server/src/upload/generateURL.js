const { S3 } = require("aws-sdk");
const { verify } = require("jsonwebtoken");
const response = require("../utils/response");

const s3 = new S3();

module.exports.handler = async (event) => {
  try {
    const token = event.headers.Authorization;
    const { bucket, fileKey } = event.queryStringParameters;
    const extension = fileKey.split(".")[1];
    const decoded = verify(token, "mytoken");
    const url = s3.getSignedUrl("putObject", {
      Bucket: bucket,
      Key: fileKey,
      ContentType: `image/${extension}`,
    });
    return response(200, { url });
  } catch (error) {
    return response(404, { error: error.message });
  }
};
