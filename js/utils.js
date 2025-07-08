// ====================
// UTILITY FUNCTIONS
// ====================
class Utils {
    static shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    static createEmptyAssignments(totalDays, facilities) {
        return Array.from({ length: totalDays }, () => 
            facilities.reduce((acc, facility) => ({ ...acc, [facility]: [] }), {})
        );
    }

    static getWeekDayIndexes(week, daysPerWeek) {
        const start = week * daysPerWeek;
        return Array.from({ length: daysPerWeek }, (_, i) => start + i);
    }

    static getAllAssignedPeople(assignments, dayIndex) {
        return [].concat(...Object.values(assignments[dayIndex]));
    }
}