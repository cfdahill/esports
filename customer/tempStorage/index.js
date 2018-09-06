import axios from 'axios';


export function schedules() {
  return function(dispatch) {
    axios.get("http://localhost:3000/api/games")
      .then((response) => {
        dispatch({
          type: 'EVENT_SCHEDULE_FULFILLED',
          payload: response.data
        })
        .catch((err) => {
          dispatch({
            type: 'EVENT_SCHEDULE_ERROR',
            payload: err
          })
        })
      })
    }
}

export function singleMatch(id) {
  return function(dispatch) {
    axios.get("http://localhost:3000/api/games/"+id)
      .then((response) => {
        dispatch({
          type: 'SINGLE_EVENT_FULFILLED',
          payload: response.data
        })
        .catch((err) => {
          dispatch({
            type: 'SINGLE_EVENT_ERROR',
            payload: err
          })
        })
      })
  }
}