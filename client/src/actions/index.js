import axios from 'axios';

export const FETCH_SCHEDULE = 'fetch_schedule';
export const FETCH_PICKS = 'fetch_picks';
export const FETCH_POINTS = 'fetch_points';
export const FETCH_REWARDS = 'fetch_rewards';
// export const FETCH_SHOP = 'fetch_shop';
export const CREATE_PICK = 'create_pick';
export const CREATE_SCHEDULE = 'create_schedule';
export const UPDATE_SCHEDULE = 'update_schedule';

export function fetchPicks(id) {
  const request = axios.get(`/api/users/${id}`);
  return {
    type: FETCH_PICKS,
    payload: request
  };
}

export function fetchRewards(id) {
  const request = axios.get(`/api/users/${id}`);
  return {
    type: FETCH_REWARDS,
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

// export function fetchShop(shop) {
//   console.log('action: fetchShop called');
//   // const request = axios.get(`/api/shop`);
//   console.log(FETCH_SHOP);
//   return {
//       type: FETCH_SHOP,
//       payload: shop
//   };
// }

export function createPick(id, values, cb) {
  console.log("action.createPick triggered");
  const request = axios.put(`api/users/${id}`, values)
    .then(() => cb())
  return {
    type: CREATE_PICK,
    payload: request
  };
}

export function createSchedule(values, cb) {
  const request = axios.post(`api/games/`, values)
    .then(() => cb());
  return {
    type: CREATE_SCHEDULE,
    payload: request
  };
}

export function updateSchedule(id, values, cb) {
  const request = axios.put(`api/games/${id}`, values)
    .then(() => cb());
  return {
    type: UPDATE_SCHEDULE,
    payload: request
  };
}