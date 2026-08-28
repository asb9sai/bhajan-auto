/**
 * ============================================================================
 * SCRIPT NO     : 19
 * SCRIPT NAME   : 19_checklist_engine.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Activity D - Fetches monthly master data to dynamically 
 *                 populate the dashboard screen fields for the Checklist process.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    setupChecklistEngineListener();
});

function setupChecklistEngineListener() {
    const checklistButton = document.getElementById("btn_checklist_process");
    if (checklistButton) {
        checklistButton.addEventListener("click", () => {
            populateChecklistWorkspaceRows();
        });
    }
}

/**
 * Sweeps and fills the screen rows with monthly master records for the checklist view
 */
function populateChecklistWorkspaceRows() {
    if (!CURRENTLY_SELECTED_GROUP || !CURRENTLY_SELECTED_DATE) {
        alert("Sairam! Please select a Bhajan Group and Date first.");
        return;
    }

    console.log(`Sairam: Checklist engine loading data for ${CURRENTLY_SELECTED_DATE}`);

    // Read active Satsang option choice from the dashboard layout row
    const satsangDropdown = document.getElementById("select_satsang_option");
    const isSatsangActive = satsangDropdown && satsangDropdown.value === "Y";

    // Pull allocation data from the master cloud snapshot matching active selection parameters
    pullAllotmentSnapshotFromGitHubCloud(CURRENTLY_SELECTED_GROUP, CURRENTLY_SELECTED_DATE)
        .then(masterData => {
            if (!masterData) return;

            const totalRows = 14;
            for (let rowId = 1; rowId <= totalRows; rowId++) {
                const targetInput = document.getElementById(`input_allottee_row_${rowId}`);
                if (!targetInput) continue;

                const isSemiMandatory = rowId >= 5 && rowId <= 11;

                if (isSatsangActive && isSemiMandatory) {
                    targetInput.value = "";
                    targetInput.placeholder = "OMITTED - SATSANG ACTIVE";
                } else {
                    // Populate cell row with the exact master allocated name
                    targetInput.value = (masterData[rowId] || "").toUpperCase();
                }
            }
            console.log("Sairam! Checklist screen engine execution complete.");
        });
}
