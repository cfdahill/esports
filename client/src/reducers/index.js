import {combineReducers} from 'redux';
// import EventsReducer from './reducer_events';
import EventsReducer from './reducer_schedule';
import PicksReducer from './reducer_picks';

const rootReducer = combineReducers({
  picks: PicksReducer,
  events: EventsReducer
});

export default rootReducer;