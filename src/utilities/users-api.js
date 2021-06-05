import sendRequest from './send-request';

const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function requestPasswordResetToken(credentials) {
  return sendRequest(`${BASE_URL}/password/token`, 'POST', credentials);
}

export function changePassword(credentials) {
  return sendRequest(`${BASE_URL}/password`, 'PUT', credentials);
}

export function requestPhoneToken() {
  return sendRequest(`${BASE_URL}/phone/token`);
}

export function verifyPhonetoken(token) {
  return sendRequest(`${BASE_URL}/phone/verify`, 'PUT', {token})
}

export function updatePhoneNumber(phone) {
  return sendRequest(`${BASE_URL}/phone/update`, 'PUT', {phone})
}