import * as types from '../actions/action-types';

export default (state = {
    isLoggingIn: false,
    isAuthenticated: false,
    error:false
}, action) =>{
    switch(action.type) {
        case types.LOGIN_REQUEST:
            return {
                isLoggingIn: true,
                isAuthenticated: false
            };
        case types.LOGIN_FAILURE:
            return {
                isLoggingIn: false,
                isAuthenticated: false,
                error:action.err
            };
        case types.LOGOUT:
            return{
                isLoggingIn: false,
                isAuthenticated: false
            };
        case types.LOGIN_SUCCESS:
            return {
                isLoggingIn: false,
                isAuthenticated: true,
            };

        default:
            return state;
    }
}
