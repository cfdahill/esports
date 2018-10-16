import {FETCH_SHOP} from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_SHOP:
      return action.payload.data.shop;
    default:
      return state;
  }
}