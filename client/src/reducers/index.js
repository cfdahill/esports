import {combineReducers} from 'redux';
// import EventsReducer from './reducer_events';
import EventsReducer from './reducer_schedule';
import PicksReducer from './reducer_picks';
import PointsReducer from './reducer_points';
import ShopReducer from './reducer_shop';

const rootReducer = combineReducers({
  picks: PicksReducer,
  events: EventsReducer,
  points: PointsReducer,
  shop: ShopReducer
});

export default rootReducer;