import sendRequest from './send-request';

const BASE_URL = '/api/auth';

export function facebookLogin(token) {
    return sendRequest(`${BASE_URL}/facebook/token`, 'POST', token);
}