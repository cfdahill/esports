import {FETCH_REWARDS} from '../actions';


export default function(state = [], action) {
  switch(action.type) {
    case FETCH_REWARDS:
      return action.payload.data.rewards;
    default:
      return state;
  }
}