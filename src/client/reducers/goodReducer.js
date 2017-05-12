import * as types from '../actions/action-types';
let sort = (array, sort) => {
    return array.sort(function (a, b) {
       if(a[sort.name]>b[sort.name])
           return sort.order;
        if(a[sort.name]<b[sort.name])
            return -sort.order;
        if(a[sort.name]===b[sort.name])
            return 0
    })
};
export default (state = {goods: [], sort: null, filter:null}, action) => {
    switch (action.type) {
        case types.GET_GOODS:
            let gs=state.sort?sort([...action.goods], state.sort):[...action.goods];
            return {...state, goods: gs, filter:action.filter};
        case types.SORT:
            if (!action.sort)
                return {...state};
            else
                return {...state, goods: sort([...state.goods], action.sort), sort:action.sort};
        default:
            return {...state};
    }
};