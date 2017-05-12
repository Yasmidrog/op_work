import * as types from './action-types';
import {checkErr} from './helpers'
import {hostname} from './hostname'
export const getGoods = (goods, filter) => {
    return {
        type: types.GET_GOODS,
        goods, filter
    };
};
export const sortGoods = (sort) => {
    return {
        type: types.SORT,
        sort
    };
};

export function retrieveGoods(fil) {
    return (dispatch) => {

        let filter, for_whom;
        filter=fil?fil.filter:undefined;
        for_whom=fil?fil.for_whom:undefined;

        return fetch(hostname+'/clothes/list/', {
            mode: "cors",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            method: "POST",
            body: JSON.stringify({filter:filter, for_whom:for_whom})
        }).then(response => response.json().then(json => ({
            json,
            response
        })))
            .then(checkErr)
            .then(
                data => {
                    console.log(data);
                    dispatch(getGoods(data.clothes, fil))
                },
                (data) => dispatch({type: types.ADD_ERROR, error: data.message || 'Error in retrieving'})
            )
    }
}


export function addGood(cloth) {
    return (dispatch, state) => {
        return fetch(hostname+'/clothes/add', {
            mode: "cors",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
            method: "POST",
            body: JSON.stringify({cloth:cloth})
        }).then(response => response.json().then(json => ({
            json,
            response
        })))
            .then(checkErr)
            .then(
                data => {
                    dispatch(retrieveGoods(state().goods.filter))
                }, (data) => dispatch({type: types.ADD_ERROR, error: data.message || 'Error in retrieving'})
            )
    }
}
export function remove(name) {
    return (dispatch,state) => {
        console.log(state());

        return fetch(hostname+'/clothes/remove', {
            mode: "cors",
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({vcode:name})

        }).then(response => response.json().then(json => ({
            json,
            response
        })))
            .then(checkErr)
            .then(
                data => {
                    dispatch(retrieveGoods(state().goods.filter))
                },
                (data) => dispatch({type: types.ADD_ERROR, error: data.message || 'Error in retrieving'})
            )
    }
}
