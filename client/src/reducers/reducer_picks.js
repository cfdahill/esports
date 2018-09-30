import {FETCH_PICKS} from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_PICKS:
      return action.payload.data.picks;
    default:
      return state;
  }
}