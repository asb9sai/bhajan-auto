/**
 * ============================================================================
 * SCRIPT NO     : 20
 * SCRIPT NAME   : 20_reminder_engine.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Activity F - Reminder screen data-population engine. Sweeps 
 *                 lyrics logs to find active members who have not yet posted.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    setupReminderEngineListener();
});

function setupReminderEngineListener() {
    const reminderButton = document.getElementById("btn_reminder_process");
    if (reminderButton) {
        reminderButton.addEventListener("click", () => {
            populateReminderWorkspaceRows();
        });
    }
}

/**
 * Identifies unsubmitted active members and loads them onto your dashboard rows
 */
function populateReminderWorkspaceRows() {
    if (typeof LYRICS_SUBMISSION_REGISTRY === "undefined" || Object.keys(LYRICS_SUBMISSION_REGISTRY).length === 0) {
        alert("Sairam! Please run the PASTE LYRICS process first to map out text data.");
        return;
    }

    console.log("Sairam: Compiling active members missing lyrics submissions...");

    // Clear all dashboard input cells out first before repopulating
    for (let r = 1; r <= 14; r++) {
        const cell = document.getElementById(`input_allottee_row_${r}`);
        if (cell) cell.value = "";
    }

    let uiCellCounter = 1;

    // Sweep across the log registry map to find missing members
    Object.keys(LYRICS_SUBMISSION_REGISTRY).forEach(memberName => {
        const statusRecord = LYRICS_SUBMISSION_REGISTRY[memberName];
        
        // Match condition rule: Member is active but has NOT yet posted their lyrics text block
        if (statusRecord && !statusRecord.hasPosted) {
            if (uiCellCounter <= 14) {
                const targetRowField = document.getElementById(`input_allottee_row_${uiCellCounter}`);
                if (targetRowField) {
                    targetRowField.value = memberName.toUpperCase();
                }
                uiCellCounter++;
            }
        }
    });

    console.log(`Sairam: Populated ${uiCellCounter - 1} pending reminder rows onto screen layout.`);
}
