// ====================
// PLAN GENERATOR (Open/Closed Principle)
// ====================
class PlanGenerator {
    constructor(config) {
        this.config = config;
    }

    generate() {
        const assignments = Utils.createEmptyAssignments(
            this.config.totalDays, 
            this.config.facilities
        );

        this.assignSpecialRoles(assignments);
        this.assignRemainingRoles(assignments);

        return assignments;
    }

    assignSpecialRoles(assignments) {
        for (let week = 0; week < this.config.weeksCount; week++) {
            const weekDayIndexes = Utils.getWeekDayIndexes(week, this.config.daysPerWeek);
            
            AssignmentRules.assignJetteToWeek(assignments, weekDayIndexes);
            AssignmentRules.assignBettinaToWeek(assignments, weekDayIndexes, week);
        }
    }

    assignRemainingRoles(assignments) {
        for (let dayIndex = 0; dayIndex < this.config.totalDays; dayIndex++) {
            AssignmentRules.assignRemainingPeople(assignments, dayIndex);
        }
    }
}