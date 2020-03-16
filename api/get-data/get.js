import { getResult } from './repo/dynamodb';
import { success, failure } from '../../libs/response-lib';

exports.get  = async (event, context) => {
  try {
    const data = await getResult(13, 'messages-table', 'inbox', false, 2);
    return success(data);
  } catch (err) {
    console.log(`Error ${err}`);
    return failure({ status: false });
  }
};