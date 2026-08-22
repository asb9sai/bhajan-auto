/**
 * ============================================================================
 * SCRIPT NO     : 03
 * SCRIPT NAME   : 03_database_core.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Manages interactive active/inactive states of the 7 group
 *                 process buttons exclusively. Isolated from allotment workflows.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

let DASHBOARD_ACTIVE_GROUP_CODE = null;
let DASHBOARD_ACTIVE_PROCESS_NAME = null;

/**
 * Isolated State Controller: Explicitly targets and manages the 7 process buttons.
 * Keeps them frozen in a safe, unclickable muted grey layout mode.
 */
function enforceProcessButtonsLock(shouldEnable) {
    const processButtons = document.querySelectorAll('.process-btn');
    processButtons.forEach(btn => {
        if (shouldEnable) {
            btn.disabled = false;
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
            btn.style.pointerEvents = "auto";
        } else {
            btn.disabled = true;
            btn.style.opacity = "0.35";
            btn.style.cursor = "not-allowed";
            btn.style.pointerEvents = "none";
        }
    });
}

function refreshContextBannerText() {
    const bannerContainer = document.getElementById('contextBannerText');
    if (!bannerContainer) return;
    
    if (!DASHBOARD_ACTIVE_GROUP_CODE) {
        bannerContainer.innerText = "Here the selected Group, Date and Button Process to be displayed";
        return;
    }

    const titleExpansionMap = { "WED": "WEDNESDAY", "FRI": "FRIDAY", "ARD": "ARDRA", "MAH": "MAHILAS", "SPL": "SPECIAL BHAJAN", "PRM": "PRM" };
    const cleanGroupTitle = titleExpansionMap[DASHBOARD_ACTIVE_GROUP_CODE] || DASHBOARD_ACTIVE_GROUP_CODE;
    
    const targetDropdown = document.getElementById(`dropdown_${DASHBOARD_ACTIVE_GROUP_CODE}`);
    let activeDateStr = (targetDropdown && targetDropdown.value) ? targetDropdown.value : "CHOSEN DATE";

    if (DASHBOARD_ACTIVE_PROCESS_NAME) {
        bannerContainer.innerText = `AS ${cleanGroupTitle} GROUP - ${activeDateStr} - ${DASHBOARD_ACTIVE_PROCESS_NAME} ARE BEING PROCESSED`;
    } else {
        bannerContainer.innerText = `AS ${cleanGroupTitle} GROUP - ${activeDateStr} - SELECT A PROCESS BUTTON`;
    }
}

// Initialize interface locks immediately on boot sequence
document.addEventListener('DOMContentLoaded', () => {
    // 1. Force immediate structural grey lockdown on startup
    enforceProcessButtonsLock(false);
    
    // 2. Bind click tracking exclusively to the primary group buttons
    document.querySelectorAll('.group-btn').forEach(btnElement => {
        btnElement.addEventListener('click', (e) => {
            // Remove previous thick border focuses across all group blocks
            document.querySelectorAll('.group-btn').forEach(btn => {
                btn.style.border = '';
                btn.style.borderBottom = '2px solid #000';
            });
            
            const clickedBtn = e.currentTarget;
            clickedBtn.style.border = '4px solid #000000';
            
            // Register target working parameters
            DASHBOARD_ACTIVE_GROUP_CODE = clickedBtn.getAttribute('data-group');
            DASHBOARD_ACTIVE_PROCESS_NAME = null; 
            
            // Wake up the 7 processing elements row and make text bold black
            enforceProcessButtonsLock(true);
            refreshContextBannerText();
        });
    });

    // 3. Monitor individual dropdown adjustments to rewrite selection strings live
    document.querySelectorAll('.date-dropdown').forEach(dropdownElement => {
        dropdownElement.addEventListener('change', refreshContextBannerText);
    });

    // 4. Track process action clicks to format final verification tracking string
    document.querySelectorAll('.process-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            let fullTextString = e.currentTarget.innerText;
            if (fullTextString.includes('\n')) {
                DASHBOARD_ACTIVE_PROCESS_NAME = fullTextString.split('\n')[0].trim();
            } else {
                DASHBOARD_ACTIVE_PROCESS_NAME = fullTextString.replace('▼', '').trim();
            }
            
            refreshContextBannerText();
            
            const displayArea = document.getElementById('whatsappClipboardArea');
            if (displayArea) {
                displayArea.value = `Sairam!\nRunning automation scripts for matching criteria keys...\n- Focus Target: AS ${DASHBOARD_ACTIVE_GROUP_CODE} Group\n- Action Process: ${DASHBOARD_ACTIVE_PROCESS_NAME}`;
            }
        });
    });
});
