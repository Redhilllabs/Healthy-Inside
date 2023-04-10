const AWS = require('aws-sdk');
const util = require("../utils/util");
const region = 'us-east-1';
const topicArn = 'arn:aws:sns:us-east-1:647331252240:salesForcastMessage';

// Create SNS client
const sns = new AWS.SNS({ region });

if (!sns.config.credentials || !sns.config.credentials.accessKeyId || !sns.config.credentials.secretAccessKey) {
    throw new Error('AWS SNS client failed to initialize properly');
}

async function sendSms(event, context){
    const phone_number = event.number;
    const message = event.message;
    if (!phone_number || !message) {
        const body = {
      data: 'Bad Request: "number" and "message" are required',
      status:400
        };
    return util.buildResponse(200, body);
    }
    const params = {
        Message: message,
        TopicArn: topicArn
    };
    try {
        const response = await sns.publish(params).promise();
        const message_id = response.MessageId;
        const body = {
      data: JSON.stringify({ message_id }) ,
      status:200
    };
    return util.buildResponse(200, body);
        // return { statusCode: 200, body: JSON.stringify({ message_id }) };
    } catch (error) {
        console.error(error);
        const body = {
      data:  JSON.stringify({ error: 'Internal Server Error in SNS' }),
      status:500
    };
    return util.buildResponse(200, body);
    }
};


module.exports = { sendSms };
