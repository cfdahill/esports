import {FETCH_SCHEDULE} from '../actions';
import _ from 'lodash';


export default function(state = {}, action) {
  console.log(action.type);
    switch (action.type) {
        case FETCH_SCHEDULE:
            return _.mapKeys(action.payload.data, 'id');
        default:
            console.log("No action taken");
            return state;
    }
}