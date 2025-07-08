// ====================
// UI CONTROLLER (Interface Segregation)
// ====================
class UIController {
    constructor() {
        this.planContainer = document.getElementById('plan-container');
        this.summaryContainer = document.getElementById('summary-container');
    }

    displayPlan(planHtml) {
        this.planContainer.innerHTML = planHtml;
    }

    displaySummary(summaryHtml) {
        this.summaryContainer.innerHTML = summaryHtml;
        this.addCollapsibleEventListeners();
    }

    displayError(errorMessage) {
        this.planContainer.innerHTML = `<h2>Rotationsplan for 4 uger</h2><p class="error" style="padding: 0 20px;">Fejl under generering af plan: ${errorMessage} Prøv venligst igen.</p>`;
        this.summaryContainer.innerHTML = '';
    }

    addCollapsibleEventListeners() {
        const collapsibles = document.getElementsByClassName("collapsible");
        Array.from(collapsibles).forEach(collapsible => {
            collapsible.addEventListener("click", function() {
                this.classList.toggle("active");
                const content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        });
    }
}