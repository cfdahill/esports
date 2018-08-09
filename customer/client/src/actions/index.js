export function schedules(team) {
    return {
        type: 'EVENT_SCHEDULE',
        payload: team
    }
}