const aws = require('aws-sdk');

aws.config.update({
    region: "us-east-2",
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    endpoint: "http://localhost:8000"
});

const docClient = new aws.DynamoDB.DocumentClient();

export const getResult =  async (id, tablename, type, isread, pagesize) => {
        var params = {
            TableName: tablename,
            IndexName: "gsi-index",
            Limit: pagesize,
            KeyConditionExpression: "user_id= :userid and begins_with(#sk, :messagefor)",
            ExpressionAttributeNames: {
                "#sk": "messagefor-created_date"
            },
            ExpressionAttributeValues: {
                ":userid": id,
                ":messagefor": type,

            },
            ScanIndexForward: false,
        };


        try {
            const data = await docClient.query(params).promise();
            return data;
        } catch (error) {
            console.log(error);
            throw (error);
        }
    };