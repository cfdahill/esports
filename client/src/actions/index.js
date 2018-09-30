import axios from 'axios';

export const FETCH_SCHEDULE = 'fetch_schedule';
export const FETCH_PICKS = 'fetch_picks';
export const FETCH_POINTS = 'fetch_points';
export const CREATE_PICK = 'create_pick';

export function fetchPicks(id) {
  const request = axios.get(`/api/users/${id}`);
  return {
    type: FETCH_PICKS,
    payload: request
  };
}

export function fetchPoints(id) {
  const request = axios.get(`/api/users/${id}`);
  return {
    type: FETCH_POINTS,
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
  const request = axios.put(`api/users/${id}`, values)
    .then(() => cb());
  return {
    type: CREATE_PICK,
    payload: request
  }
}