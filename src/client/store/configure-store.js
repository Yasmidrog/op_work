import rootReducer from '../reducers/index';
import {createStore, compose, applyMiddleware} from 'redux';
import persistState from 'redux-localstorage'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
export default (initialState) => {
    return createStore(rootReducer, initialState, compose(applyMiddleware(logger, thunkMiddleware),
        persistState(undefined, {
            slicer: function(paths) {
                return state => {
                    return {...state, errors: false, login: {...state.login, error: false}}
                }
            }
        })))
};


