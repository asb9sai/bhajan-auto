/**
 * ============================================================================
 * SCRIPT NO     : 21
 * SCRIPT NAME   : 21_slot_avail_engine.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Activity G - Scans master records to identify and populate 
 *                 vacant mandatory slots directly onto the dashboard display rows.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    setupSlotAvailEngineListener();
});

function setupSlotAvailEngineListener() {
    const slotAvailButton = document.getElementById("btn_slot_avail_process");
    if (slotAvailButton) {
        slotAvailButton.addEventListener("click", () => {
            populateVacantSlotsOnScreen();
        });
    }
}

/**
 * Sweeps mandatory slots and visually flags vacancies on your admin screen panel row
 */
function populateVacantSlotsOnScreen() {
    if (!CURRENTLY_SELECTED_GROUP || !CURRENTLY_SELECTED_DATE) {
        return;
    }

    pullAllotmentSnapshotFromGitHubCloud(CURRENTLY_SELECTED_GROUP, CURRENTLY_SELECTED_DATE)
        .then(masterData => {
            if (!masterData) return;

            // Restrict sweep strictly to mandatory rows: 1-4 and 12-14
            const mandatoryRows =;

            mandatoryRows.forEach(rowId => {
                const targetInput = document.getElementById(`input_allottee_row_${rowId}`);
                if (!targetInput) return;

                const currentName = masterData[rowId] || "";

                if (currentName === "" || currentName.toUpperCase().includes("(NAME)")) {
                    targetInput.value = "";
                    targetInput.placeholder = "VACANT MANDATORY SLOT";
                    targetInput.style.backgroundColor = "#FFECEC"; // Soft red vacancy highlight
                } else {
                    targetInput.value = currentName.toUpperCase();
                }
            });
            console.log("Sairam! Slot availability vacancy engine scan execution complete.");
        });
}
