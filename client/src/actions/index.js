import axios from 'axios';

export const FETCH_SCHEDULE = 'fetch_schedule';
export const FETCH_PICKS = 'fetch_picks';
export const CREATE_PICK = 'create_pick';

export function fetchPicks(id) {
  const request = axios.get(`/api/users/${id}`);
  return {
    type: FETCH_PICKS,
    payload: request
  };
}

export function fetchSchedule() {
  const request = axios.get(`/api/games`);
  return {
      type: FETCH_SCHEDULE,
      payload: request
  };
}

export function createPick(id, values, cb) {
  console.log("-------action.js-------");
  console.log(id, values);
  const request = axios.put(`api/users/${id}`, values)
    .then(() => cb());
  return {
    type: CREATE_PICK,
    payload: request
  }
}