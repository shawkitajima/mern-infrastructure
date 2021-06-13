import * as authAPI from './auth-api';
import {getUser} from './users-service'

export async function facebookLogin(access_token) {
    try {
        const token = await authAPI.facebookLogin({access_token});
        localStorage.setItem('token', token);
        return getUser()
    } catch(err) {
        throw new Error('Invalid Login');
    }
}