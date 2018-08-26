import {combineReducers} from 'redux';
// import EventsReducer from './reducer_events';
import EventsReducer from './reducer_games';

const rootReducer = combineReducers({
    events: EventsReducer
});

export default rootReducer;