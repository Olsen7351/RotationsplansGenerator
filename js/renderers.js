// ====================
// HTML RENDERERS (Single Responsibility)
// ====================
class PlanRenderer {
    static renderWeeklyPlan(assignments) {
        let html = '<h2>Rotationsplan for 4 uger</h2>';
        
        for (let week = 0; week < Config.weeksCount; week++) {
            html += `<div class="week-section">`;
            html += `<h3>Uge ${week + 1}</h3>`;
            html += `<table><thead><tr><th>Område</th>${Config.daysOfWeek.map(day => `<th>${day}</th>`).join('')}</tr></thead><tbody>`;
            
            for (const area of Config.facilities) {
                html += `<tr><td>${area}</td>`;
                for (let day = 0; day < Config.daysPerWeek; day++) {
                    const dayIndex = week * Config.daysPerWeek + day;
                    const people = assignments[dayIndex][area].sort().join(', ') || '---';
                    html += `<td>${people}</td>`;
                }
                html += `</tr>`;
            }
            html += `</tbody></table></div>`;
        }
        
        return html;
    }
}

class ValidationRenderer {
    static renderValidationSummary(validationResults) {
        let html = '<h2>Ugentlig Regel-check</h2>';
        
        validationResults.forEach(result => {
            html += `<button type="button" class="collapsible">Regel-check: Uge ${result.week}</button>`;
            html += `<div class="collapsible-content" style="padding: 18px;">`;
            
            // Charlotte check
            const charlotteStatus = result.charlotte.isValid ? 'ok' : 'error';
            const charlotteText = result.charlotte.isValid ? 'OK' : 'FEJL';
            html += `<p><b>Charlotte i 18E:</b> <span class="${charlotteStatus}">${charlotteText}</span></p>`;
            
            // Jette check
            const jetteStatus = result.jette.isValid ? 'ok' : 'error';
            const jetteText = result.jette.isValid ? `OK (${result.jette.count} dage)` : `FEJL (${result.jette.count} dage)`;
            html += `<p><b>Jette i 18E:</b> <span class="${jetteStatus}">${jetteText}</span></p>`;
            
            // Bettina check
            const bettinaStatus = result.bettina.isValid ? 'ok' : 'error';
            const bettinaText = result.bettina.isValid ? 'OK' : 'FEJL';
            html += `<p><b>Bettinas Rotation:</b> <span class="${bettinaStatus}">${bettinaText}</span> <br><small>Unikke stationer: ${result.bettina.uniqueStations}, Samme station i streg: ${result.bettina.hasConsecutiveError ? 'Ja' : 'Nej'}</small></p>`;
            
            html += `</div>`;
        });
        
        return html;
    }
}