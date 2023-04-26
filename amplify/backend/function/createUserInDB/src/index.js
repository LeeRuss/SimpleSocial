/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	userTable
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
var aws = require('aws-sdk');
var ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  let date = new Date();
  if (event.request.userAttributes.sub) {
    let params = {
      Item: {
        id: { S: event.request.userAttributes.sub },
        nickname: { S: event.request.userAttributes.nickname },
        description: { S: 'Welcome on my profile!' },
        createdAt: { S: date.toISOString() },
        updatedAt: { S: date.toISOString() },
        _lastChangedAt: { S: date.toISOString() },
        _version: { S: 1 },
      },
      TableName: 'Users-opwcfsmlrfgbtknhf4topro6pm-staging',
    };

    try {
      await ddb.putItem(params).promise();
      console.log('Success');
    } catch (err) {
      console.log('Error', err);
    }

    console.log('Success: Everything executed correctly');
    context.done(null, event);
  } else {
    console.log('Error: Nothing was written to DynamoDB');
    context.done(null, event);
  }
};
