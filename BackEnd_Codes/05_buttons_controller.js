/**
 * ============================================================================
 * SCRIPT NO     : 05
 * SCRIPT NAME   : 05_buttons_controller.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Manages dashboard button interaction states. Wakes up the 7 
 *                 process buttons only when a specific group button is clicked.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

// Global state tracking variable restricted strictly to this file's context
let CURRENTLY_SELECTED_GROUP = null;

document.addEventListener("DOMContentLoaded", () => {
    setupGroupButtonListeners();
});

/**
 * Attaches click event monitors to your 6 main group buttons
 */
function setupGroupButtonListeners() {
    // Mapping button IDs to their respective short forms matching your database
    const groupButtonsMap = {
        "btn_group_wed": "WED",
        "btn_group_fri": "FRI",
        "btn_group_ard": "ARD",
        "btn_group_mah": "MAH",
        "btn_group_spl": "SPL",
        "btn_group_prm": "PRM"
    };

    Object.keys(groupButtonsMap).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener("click", () => {
                const groupCode = groupButtonsMap[buttonId];
                handleGroupSelection(groupCode, button);
            });
        }
    });
}

/**
 * Executes UI changes and awakens process buttons when a group is selected
 */
function handleGroupSelection(groupCode, clickedButtonElement) {
    // 1. Update our system tracking state
    CURRENTLY_SELECTED_GROUP = groupCode;

    // 2. Clear visual highlights from all group buttons first, then highlight the active one
    clearAllGroupHighlights();
    clickedButtonElement.classList.add(UI_STYLE_CONFIG.activeGroupClass);
    clickedButtonElement.style.border = "3px solid #003399"; // Distinct visual anchor

    // 3. Define the list of the 7 process buttons to activate
    const processButtonIds = [
        "btn_satsang_process",
        "btn_weekly_allotment",
        "btn_checklist_process",
        "btn_lyrics_process",
        "btn_reminder_process",
        "btn_slot_avail_process",
        "btn_final_list_process"
    ];

    // 4. Wake up each button by removing the 'disabled' block and restoring look
    processButtonIds.forEach(buttonId => {
        const processBtn = document.getElementById(buttonId);
        if (processBtn) {
            processBtn.disabled = false;
            processBtn.className = ""; // Clear out startup muted styles
            processBtn.style.cursor = "pointer";
            processBtn.style.backgroundColor = ""; // Restores original CSS color row styles
            processBtn.style.color = "#000000";   // Clear, sharp text visibility
        }
    });

    // 5. Instantly update the Description Box text layout on your screen
    updateDashboardDescription(groupCode);
}

/**
 * Resets all group buttons back to standard styling rules
 */
function clearAllGroupHighlights() {
    const groupButtonIds = ["btn_group_wed", "btn_group_fri", "btn_group_ard", "btn_group_mah", "btn_group_spl", "btn_group_prm"];
    groupButtonIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.classList.remove(UI_STYLE_CONFIG.activeGroupClass);
            btn.style.border = "";
        }
    });
}

/**
 * Dynamically updates the textual description area below the process row
 */
function updateDashboardDescription(groupCode) {
    const descDisplay = document.getElementById("txt_dashboard_description");
    const dateDropdown = document.getElementById(`select_date_${groupCode.toLowerCase()}`);
    
    let selectedDate = "(No Date Selected)";
    if (dateDropdown) {
        selectedDate = dateDropdown.value;
    }

    if (descDisplay) {
        descDisplay.innerHTML = `<strong>Selected Group:</strong> ${groupCode} | <strong>Target Date:</strong> ${selectedDate} | <em>Ready for process choices...</em>`;
    }
}
