import aws = require('aws-sdk');
aws.config.update({region: 'ap-northeast-2'});
const dyn = new aws.DynamoDB();
let index = 'matches';

export const handler = async (event: any, context: any): Promise<any> => {

  const req = event.queryStringParameters[0];

  const params = {
    TableName: 'comment-table',
    IndexName: index,
    ExpressionAttributeValues: {
      ':Id': {S: req}
    },
    KeyConditionExpression: 'matchId = :Id',
    ProjectionExpression: 'commentId, charName, memo, uploadedDate',
    ScanIndexForward: true
  };

  const res: any = await dyn.query(params).promise()
    .then(data => {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: data,
          runtime: context
        }),
        headers: {
          'Access-Control-Allow-Origin': 'https://stdev17.github.io',
          'Access-Control-Allow-Credentials': true,
        }
      };
      return response;
    })
    .catch(() => {
      const response = {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Failed Comment Read',
          runtime: context
        }),
        headers: {
          'Access-Control-Allow-Origin': 'https://stdev17.github.io',
          'Access-Control-Allow-Credentials': true,
        }
      };
      return response;
    });

    return res;

}

async function test (event: any, context: any, _index: string): Promise<any> {
  index = _index;
  return await handler(event, context);
}

export default test;