import * as types from '../actions/action-types';

export default function errors(state = [], action) {
    switch (action.type) {
        case types.ADD_ERROR:
            return state.concat([action.error]);

        case types.REMOVE_ERROR:
            return state.filter((error, i) => i !== action.index);

        default:
            return state;
    }
}