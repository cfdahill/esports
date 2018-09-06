import axios from 'axios';

export const FETCH_SCHEDULE = 'fetch_schedule';

export function fetchSchedule() {
    const request = axios.get(`http://localhost:3000/api/games`);
    return {
        type: FETCH_SCHEDULE,
        payload: request
    };
}