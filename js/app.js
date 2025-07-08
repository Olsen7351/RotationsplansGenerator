// ====================
// MAIN APPLICATION (Dependency Inversion)
// ====================
class RotationPlanApp {
    constructor() {
        this.planGenerator = new PlanGenerator(Config);
        this.planService = new PlanGeneratorService(this.planGenerator, Config.maxAttempts);
        this.validator = new PlanValidator();
        this.uiController = new UIController();
    }

    generateAndDisplayPlan() {
        try {
            const assignments = this.planService.generateGuaranteedPlan();
            const validationResults = this.validator.validate(assignments);
            
            const planHtml = PlanRenderer.renderWeeklyPlan(assignments);
            const summaryHtml = ValidationRenderer.renderValidationSummary(validationResults);
            
            this.uiController.displayPlan(planHtml);
            this.uiController.displaySummary(summaryHtml);
            
        } catch (error) {
            this.uiController.displayError(error.message);
        }
    }
}

// ====================
// APPLICATION BOOTSTRAP
// ====================
const app = new RotationPlanApp();

// Initialize on page load
window.addEventListener('load', () => {
    app.generateAndDisplayPlan();
});