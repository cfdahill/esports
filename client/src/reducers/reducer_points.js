import {FETCH_POINTS} from '../actions';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_POINTS:
      return action.payload.data.points;
    default:
      return state;
  }
}