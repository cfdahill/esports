import {FETCH_SCHEDULE} from '../actions';
// import _ from 'lodash';


export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_SCHEDULE:
            return action.payload.data;
        default:
            return state;
    }
}