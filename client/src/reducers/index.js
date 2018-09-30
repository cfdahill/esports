import {combineReducers} from 'redux';
// import EventsReducer from './reducer_events';
import EventsReducer from './reducer_schedule';
import PicksReducer from './reducer_picks';
import PointsReducer from './reducer_points';

const rootReducer = combineReducers({
  picks: PicksReducer,
  events: EventsReducer,
  points: PointsReducer
});

export default rootReducer;