/**
 * ============================================================================
 * SCRIPT NO     : 03-A
 * SCRIPT NAME   : 03_ui_initialization.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Enforces strict structural startup lockdown for the main interface.
 *                 Ensures all process buttons open in a safe, muted, unclickable state.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

// This function runs automatically the exact microsecond the webpage finishes loading
document.addEventListener("DOMContentLoaded", () => {
    initializeStartupLockdown();
});

/**
 * Secures the administration control panel on startup.
 * Explicitly locks out all process buttons to avoid accidental execution errors.
 */
function initializeStartupLockdown() {
    // Definitive list of element IDs for your 7 main administrative action buttons
    const processButtonIds = [
        "btn_satsang_process",     // Button B: SATSANG N
        "btn_weekly_allotment",    // Button C: WEEKLY ALLOTMENT
        "btn_checklist_process",   // Button D: CHECK LIST
        "btn_lyrics_process",      // Button E: PASTE LYRICS
        "btn_reminder_process",    // Button F: REMINDER
        "btn_slot_avail_process",  // Button G: SLOT AVLBL
        "btn_final_list_process"   // Button H: FINAL LIST
    ];

    processButtonIds.forEach(buttonId => {
        const buttonElement = document.getElementById(buttonId);
        
        if (buttonElement) {
            // Apply native HTML lockout attribute to block user clicks completely
            buttonElement.disabled = true;

            // Apply style configurations directly from our central config file
            buttonElement.className = UI_STYLE_CONFIG.disabledButtonClass;
            
            // Explicitly set standard styling properties to guarantee unclickable visual state
            buttonElement.style.backgroundColor = UI_STYLE_CONFIG.themeColors.backgroundMuted;
            buttonElement.style.color = "#777777";
            buttonElement.style.cursor = "not-allowed";
        }
    });

    console.log("Sairam! Control panel UI successfully secured and locked down for fresh startup.");
}
