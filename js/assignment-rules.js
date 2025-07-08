// ====================
// ASSIGNMENT RULES (Single Responsibility)
// ====================
class AssignmentRules {
    static assignJetteToWeek(assignments, weekDayIndexes) {
        const jetteDays = Utils.shuffle(weekDayIndexes).slice(0, Config.jetteRequiredDays);
        jetteDays.forEach(dayIndex => {
            assignments[dayIndex]['18E'].push('Jette');
        });
    }

    static assignBettinaToWeek(assignments, weekDayIndexes, week) {
        let lastBettinaFacility = null;
        const bettinaFacilityPlacements = new Set();

        for (const dayIndex of weekDayIndexes) {
            const assignedPeopleToday = Utils.getAllAssignedPeople(assignments, dayIndex);
            
            if (assignedPeopleToday.includes('Bettina')) {
                throw new Error(`Planlægningskonflikt: Bettina er allerede placeret på dag ${dayIndex + 1}.`);
            }

            let potentialFacilities = Utils.shuffle(Config.facilities);
            
            if (lastBettinaFacility) {
                potentialFacilities = potentialFacilities.filter(f => f !== lastBettinaFacility);
            }
            
            potentialFacilities = potentialFacilities.filter(f => 
                assignments[dayIndex][f].length === 0
            );

            if (potentialFacilities.length === 0) {
                throw new Error(`Kunne ikke finde en gyldig station til Bettina på dag ${dayIndex + 1}.`);
            }

            const facilityForBettina = potentialFacilities[0];
            assignments[dayIndex][facilityForBettina].push('Bettina');
            lastBettinaFacility = facilityForBettina;
            bettinaFacilityPlacements.add(facilityForBettina);
        }

        if (bettinaFacilityPlacements.size < Config.bettinaMinStations) {
            throw new Error(`Uge ${week + 1}: Bettina dækkede kun ${bettinaFacilityPlacements.size} stationer. Reglen kræver min. ${Config.bettinaMinStations}.`);
        }
    }

    static assignRemainingPeople(assignments, dayIndex) {
        const assignedToday = Utils.getAllAssignedPeople(assignments, dayIndex);
        const availablePeople = Utils.shuffle(
            Config.people.filter(p => !assignedToday.includes(p))
        );

        for (const facility of Config.prioritizedFacilities) {
            const needed = Config.facilitySlots[facility];
            const current = assignments[dayIndex][facility].length;

            for (let i = 0; i < (needed - current); i++) {
                if (availablePeople.length === 0) {
                    throw new Error(`Planlægningskonflikt på dag ${dayIndex + 1}: Ikke flere ledige personer.`);
                }

                let personToAssign;
                if (facility === '18E') {
                    const validPersonIndex = availablePeople.findIndex(p => p !== 'Charlotte');
                    if (validPersonIndex === -1) {
                        throw new Error(`Planlægningskonflikt på dag ${dayIndex + 1}: Kun Charlotte er ledig til 18E.`);
                    }
                    personToAssign = availablePeople.splice(validPersonIndex, 1)[0];
                } else {
                    personToAssign = availablePeople.shift();
                }

                assignments[dayIndex][facility].push(personToAssign);
            }
        }
    }
}