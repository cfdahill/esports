import {FETCH_PICKS} from '../actions/index';

export default function(state = [], action) {
  console.log(action.type);
  switch(action.type) {
    case FETCH_PICKS:
      console.log(action.payload.data.picks);
      return action.payload.data.picks;
    default:
      return state;
  }
}