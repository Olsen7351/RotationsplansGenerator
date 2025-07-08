// ====================
// PLAN GENERATOR SERVICE (Dependency Inversion)
// ====================
class PlanGeneratorService {
    constructor(planGenerator, maxAttempts = 500) {
        this.planGenerator = planGenerator;
        this.maxAttempts = maxAttempts;
    }

    generateGuaranteedPlan() {
        let attempts = 0;
        
        while (attempts < this.maxAttempts) {
            try {
                return this.planGenerator.generate();
            } catch (error) {
                attempts++;
                if (attempts >= this.maxAttempts) {
                    console.error("Sidste fejl:", error.message);
                    throw error;
                }
            }
        }
    }
}