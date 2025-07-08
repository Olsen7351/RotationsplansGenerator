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
    exportPlanToPDF() {
    const planContainer = document.getElementById('plan-container');
    if (!planContainer) return;

    // Create a wrapper for the PDF content
    const pdfWrapper = document.createElement('div');
    pdfWrapper.style.margin = '0';
    pdfWrapper.style.padding = '0';
    pdfWrapper.style.background = 'white';
    pdfWrapper.style.fontFamily = 'Arial, sans-serif';
    pdfWrapper.style.fontSize = '12px';

    // Clone the header
    const header = planContainer.querySelector('h2');
    if (header) {
        const headerClone = header.cloneNode(true);
        headerClone.style.marginBottom = '10px';
        headerClone.style.textAlign = 'center';
        pdfWrapper.appendChild(headerClone);
    }

    // Get all week sections
    const weekSections = Array.from(planContainer.querySelectorAll('.week-section'));

    // Group into two sets (1+2, 3+4)
    const weekGroups = [
        weekSections.slice(0, 2),
        weekSections.slice(2, 4),
    ];

    weekGroups.forEach((group, index) => {
        const page = document.createElement('div');
        page.style.pageBreakAfter = index < weekGroups.length - 1 ? 'always' : 'auto';
        page.style.margin = '0';
        page.style.padding = '10px';
        page.style.boxSizing = 'border-box';

        group.forEach(section => {
            const sectionClone = section.cloneNode(true);
            sectionClone.style.marginBottom = '20px';
            page.appendChild(sectionClone);
        });

        pdfWrapper.appendChild(page);
    });

    // PDF options
    const opt = {
        margin: 0,
        filename: 'rotationsplan.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, scrollY: 0 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(pdfWrapper).save();
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