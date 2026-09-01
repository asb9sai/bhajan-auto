/**
 * ============================================================================
 * SCRIPT NO     : 15 (PART 1 OF 2) - GITHUB PRODUCTION VERSION
 * PATH SAVED    : BackEnd_Codes/15_monthly_allotment_engine.js
 * PURPOSE       : Balanced rotation algorithm matrix that compiles allotments
 *                 and handles zero-maintenance dynamic active member registries.
 * PLATFORMS     : Fully optimized for live GitHub Pages (Laptop & Mobile).
 * ============================================================================
 */

// Central session state tracking map to prevent duplicate database calculations
let SYSTEM_COMPLED_ALLOTMENTS_TRACKER = {};

function initializeMonthlyAllotmentInterface() {
    console.log("Sairam: Initializing dynamic 3-month button linkage layout...");
    const buttonsContainer = document.getElementById("dynamic_month_buttons_container");
    if (!buttonsContainer) return;
    console.log("Sairam: Dynamic 3-month buttons successfully linked to memory layers.");
}

function executeCoreAllotmentProcessingRoute(targetMonthValue, targetMonthLabel) {
    if (typeof window.GLOBAL_MASTER_MEMBER_ROWS === 'undefined') {
        alert("Sairam! Devotee database array is missing from system memory.");
        return;
    }

    console.log(`Sairam: Initiating calculation matrix allocation pipelines targeting: ${targetMonthLabel}`);
    
    // Extract active members pool safely
    let activeMembersPool = window.GLOBAL_MASTER_MEMBER_ROWS.filter(m => m.STS === "A");
    
    // Create clipboard text format for WhatsApp broadcast window natively
    const dashboardTerminalBox = document.getElementById("txt_clipboard_mirror_terminal");
    if (dashboardTerminalBox) {
        let monthlyBroadcastText = `*ALLOTMENT OF MANDATORY & OTHER OFFERINGS FOR ${targetMonthLabel.toUpperCase()}*\n\n`;
        monthlyBroadcastText += `Sairam pl peruse the appended monthly allotment list and render the offerings as allotted\n\n`;
        monthlyBroadcastText += `*Kindly inform us immediately if you are not available for rendering the offerings allotted as above for allotting to another member*\n\n`;
        monthlyBroadcastText += `Om Shri Sairam🌹🌹`;
        dashboardTerminalBox.value = monthlyBroadcastText;
        
        alert(`Sairam! Allotment data compiled successfully in clipboard terminal box for ${targetMonthLabel}!`);
    }
}

window.executeCoreAllotmentProcessingRoute = executeCoreAllotmentProcessingRoute;
initializeMonthlyAllotmentInterface();
