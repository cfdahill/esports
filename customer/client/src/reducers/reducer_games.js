export default function reducer(state={
  schedule: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch(action.type) {
    case "EVENT_SCHEDULE": {
      return {...state, fetching: true}
    }
    case "EVENT_SCHEDULE_ERROR": {
      return {...state, fetching: false, error: action.payload}
    }
    case "EVENT_SCHEDULE_FULFILLED": {
      return {
        ...state, 
        fetching: false,
        fetched: true,
        schedule: action.payload
      }
    }
    case "SINGLE_EVENT_ERROR": {
      return {...state, fetching: false, error: action.payload}
    }
    case "SINGLE_EVENT_FULFILLED": {
      return {
        ...state, 
        fetching: false,
        fetched: true,
        schedule: action.payload
      }
    }
    default : {
      return {error: "No action taken"}
    }
  }  
}
