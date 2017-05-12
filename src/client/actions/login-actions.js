import * as types from './action-types';
import {hostname} from './hostname'
export const loginRequest = () => {
    return {
        type: types.LOGIN_REQUEST,
    };
};
export const loginFailure = (err) => {
    return {
        type: types.LOGIN_FAILURE,
        err
    };
};
export const loginSuccess = () => {
    return {
        type: types.LOGIN_SUCCESS,
    };
};
export const logoutDone=()=>{
   return{ type: types.LOGOUT}
};
export const logout = () => {
    return (dispatch) => {
        return fetch(hostname+'/logout', {
            mode: "cors",
            method: "POST",
        })
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (response.ok === false) {
                    return Promise.reject(json)
                }
                return json
            })
            .then(
                data => {
                    dispatch(logoutDone())
                },
                (data) => dispatch(loginFailure(data.error || 'Log out failed'))
            )
    }
};
export function login(username, password) {
    return (dispatch) => {
        dispatch(loginRequest());

        const hash = new Buffer(`${username}:${password}`).toString('base64');
        console.log(hash);
        return fetch(hostname+'/auth', {
            mode: "cors",
            method: "POST",
            headers: new Headers({
                'Authorization': `Basic ${hash}`,
            })
        })
            .then(response => response.json().then(json => ({json, response})))
            .then(({json, response}) => {
                if (response.ok === false) {
                    return Promise.reject(json)
                }
                return json
            })
            .then(
                data => {
                    dispatch(loginSuccess())
                },
                (data) => dispatch(loginFailure(data.error || 'Log in failed'))
            )
    }

}