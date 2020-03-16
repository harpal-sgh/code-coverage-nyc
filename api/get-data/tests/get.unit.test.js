import * as lambda from '../repo/dynamodb';
import { get} from '../get';
import chai from 'chai';
import sinon from 'sinon';

const sandbox = sinon.createSandbox();
const expect = chai.expect;
let event, context;

describe('test lambda get', () => {
    afterEach(() => {
        sandbox.restore();
    });

    it('get lambda should return success', async () => {
        // Mock
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

        sandbox.stub(lambda, 'getResult').returns(result);
 
        // Act
        let response = await get(event, context);
        console.log(response.body);
        expect(response.statusCode).equal(200);
    });

    it('get lambda should return failure', async () => {
        sandbox.stub(lambda, 'getResult').throws(new Error('whatever'));

        // Act
        let response = await get(event, context);
        console.log(response.body);

        //Expect
        expect(response.statusCode).equal(500);

    });
});