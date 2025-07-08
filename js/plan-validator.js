// ====================
// PLAN VALIDATOR (Single Responsibility)
// ====================
class PlanValidator {
    validate(assignments) {
        const results = [];
        
        for (let week = 0; week < Config.weeksCount; week++) {
            const weekStartIndex = week * Config.daysPerWeek;
            
            results.push({
                week: week + 1,
                charlotte: ValidationRules.validateCharlotteRule(assignments, weekStartIndex),
                jette: ValidationRules.validateJetteRule(assignments, weekStartIndex),
                bettina: ValidationRules.validateBettinaRule(assignments, weekStartIndex)
            });
        }
        
        return results;
    }
}