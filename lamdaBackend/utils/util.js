function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
     headers: {
      
      "Access-Control-Allow-Headers" :  "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "*"
    },
    body: JSON.stringify(body),
  };
}
module.exports.buildResponse = buildResponse ;