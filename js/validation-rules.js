// ====================
// VALIDATION RULES (Single Responsibility)
// ====================
class ValidationRules {
    static validateCharlotteRule(assignments, weekStartIndex) {
        for (let i = 0; i < Config.daysPerWeek; i++) {
            if (assignments[weekStartIndex + i]['18E'].includes('Charlotte')) {
                return { isValid: false, message: 'Charlotte er i 18E' };
            }
        }
        return { isValid: true, message: 'OK' };
    }

    static validateJetteRule(assignments, weekStartIndex) {
        let jetteDaysIn18E = 0;
        for (let i = 0; i < Config.daysPerWeek; i++) {
            if (assignments[weekStartIndex + i]['18E'].includes('Jette')) {
                jetteDaysIn18E++;
            }
        }
        return {
            isValid: jetteDaysIn18E === Config.jetteRequiredDays,
            message: `${jetteDaysIn18E} dage`,
            count: jetteDaysIn18E
        };
    }

    static validateBettinaRule(assignments, weekStartIndex) {
        const bettinaPlacements = new Map();
        let bettinaConsecutiveError = false;
        let lastFacility = null;

        for (let i = 0; i < Config.daysPerWeek; i++) {
            for (const facility in assignments[weekStartIndex + i]) {
                if (assignments[weekStartIndex + i][facility].includes('Bettina')) {
                    bettinaPlacements.set(facility, (bettinaPlacements.get(facility) || 0) + 1);
                    if (facility === lastFacility) {
                        bettinaConsecutiveError = true;
                    }
                    lastFacility = facility;
                }
            }
        }

        const uniqueStations = bettinaPlacements.size;
        const isValid = uniqueStations >= Config.bettinaMinStations && !bettinaConsecutiveError;

        return {
            isValid,
            uniqueStations,
            hasConsecutiveError: bettinaConsecutiveError
        };
    }
}