import { getResult } from '../repo/dynamodb';
import chai from 'chai';
import sinon from 'sinon';
import aws from 'aws-sdk';

const sandbox = sinon.createSandbox();
const expect = chai.expect;

describe('test dynamodb', () => {
    afterEach(() => {
        sandbox.restore();
    });

    it('getmessage should return data', async () => {
        // Stub
        const result = { Items:
            [ { messagebody: 'message 33 body',
                user_id: 13,
                subject: 'message 33',
                isread: true,
                message_id: 33,
                messagefor: 'inbox',
                created_date: '2020-03-14T20:20:54.123Z',
                'messagefor-created_date': 'inbox-2020-03-14T20:20:54.123Z' } ],
           Count: 1,
           ScannedCount: 1 };

        sandbox.stub(aws.DynamoDB.DocumentClient.prototype, 'query').returns({promise: () => result});

        // Act
        const response = await getResult(13, 'abc', 'inbox', true, 5);
        // Assert
        expect(response.Items[0]['message_id']).equal(33);

    });

    it('getmessage should return error', async () => {
        let err = new Error('whatever');
        //stub
        sandbox.stub(aws.DynamoDB.DocumentClient.prototype, 'query').returns({promise: () => err} );

        // Act/Assert
        expect(await getResult(13, 'abc', 'inbox', true, 5)).equal(err);
    });
});