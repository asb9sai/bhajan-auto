/**
 * ============================================================================
 * SCRIPT NO     : 03
 * SCRIPT NAME   : 03_database_core.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Establishes secure serverless operations over GitHub, and
 *                 manages interactive active/inactive states of process buttons.
 *                 Isolates top navigation button pathways to prevent system locks.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

const GITHUB_DATABASE_CONFIG = {
    owner: 'asb9sai',                         
    repo: 'bhajan-auto',                      
    path: 'ASMbrMstr.json',                   
    token: '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'                // Keep your active secure ghp_ token here
};

// Global administrative selection tracking tokens
let SELECTED_GROUP_CODE = null;
let SELECTED_PROCESS_NAME = null;

async function fetchMemberMasterFromVault() {
    const targetUrl = `https://github.com{GITHUB_DATABASE_CONFIG.owner}/${GITHUB_DATABASE_CONFIG.repo}/contents/${GITHUB_DATABASE_CONFIG.path}`;
    try {
        const networkResponse = await fetch(targetUrl, {
            method: 'GET',
            headers: { 
                'Authorization': `token ${GITHUB_DATABASE_CONFIG.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!networkResponse.ok) throw new Error(`Status: ${networkResponse.status}`);
        const rawData = await networkResponse.json();
        const decodedString = decodeURIComponent(escape(atob(rawData.content)));
        return { members: JSON.parse(decodedString), sha: rawData.sha };
    } catch (databaseError) {
        console.error("[03_database_core.js] Read Exception:", databaseError);
        return null;
    }
}

async function saveMemberMasterToVault(updatedMembersArray, currentSha) {
    const targetUrl = `https://github.com{GITHUB_DATABASE_CONFIG.owner}/${GITHUB_DATABASE_CONFIG.repo}/contents/${GITHUB_DATABASE_CONFIG.path}`;
    try {
        const JSONStringData = JSON.stringify(updatedMembersArray, null, 2);
        const encodedContentBase64 = btoa(unescape(encodeURIComponent(JSONStringData)));
        const networkResponse = await fetch(targetUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_DATABASE_CONFIG.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                message: "Admin Automation System: Commit Sequence Update [03_database_core]",
                content: encodedContentBase64,
                sha: currentSha
            })
        });
        return networkResponse.ok;
    } catch (databaseError) {
        console.error("[03_database_core.js] Write Exception:", databaseError);
        return false;
    }
}

/**
 * State Controller Function: Manages active/inactive behavior of process buttons.
 * Adjusts opacity transparency metrics and triggers system lockout properties cleanly.
 * 
 * @param {boolean} shouldEnable - True to awaken elements, False to grey them out.
 */
function toggleProcessButtonsState(shouldEnable) {
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

/**
 * Formats and renders the dynamic confirmation running text string into your 
 * DESCRIPTION box to ensure clear double-confirmation layout parameters.
 */
function updateDashboardContextBanner() {
    const valueDisplayContainer = document.getElementById('contextBannerText');
    if (!valueDisplayContainer) return;
    
    if (!SELECTED_GROUP_CODE) {
        valueDisplayContainer.innerText = "Here the selected Group, Date and Button Process to be displayed";
        return;
    }

    // Determine the full expanded group title string name
    let expansionTitleMap = { "WED": "WEDNESDAY", "FRI": "FRIDAY", "ARD": "ARDRA", "MAH": "MAHILAS", "SPL": "SPECIAL BHAJAN", "PRM": "PRM" };
    const cleanGroupTitle = expansionTitleMap[SELECTED_GROUP_CODE] || SELECTED_GROUP_CODE;
    
    // Extract current selection from the corresponding group dropdown element channel
    const matchingDropdownElement = document.getElementById(`dropdown_${SELECTED_GROUP_CODE}`);
    let activeDateString = (matchingDropdownElement && matchingDropdownElement.value) ? matchingDropdownElement.value : "CHOSEN DATE";

    // Render configuration tracking text
    if (SELECTED_PROCESS_NAME) {
        valueDisplayContainer.innerText = `AS ${cleanGroupTitle} GROUP - ${activeDateString} - ${SELECTED_PROCESS_NAME} ARE BEING PROCESSED`;
    } else {
        valueDisplayContainer.innerText = `AS ${cleanGroupTitle} GROUP - ${activeDateString} - SELECT A PROCESS BUTTON`;
    }
}

// Binds interface listeners seamlessly on system boot sequence initialization
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize process actions panel to locked grey default layout properties
    toggleProcessButtonsState(false);
    
    // 2. Setup interactive group box button operational click loops
    document.querySelectorAll('.group-btn').forEach(buttonElement => {
        buttonElement.addEventListener('click', (eventObject) => {
            // Clear any old highlights from navigation buttons first
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            
            // Remove previous thick border focuses across all item blocks
            document.querySelectorAll('.group-btn').forEach(btn => {
                btn.style.border = '';
                btn.style.borderBottom = '2px solid #000';
            });
            
            const clickedBtn = eventObject.currentTarget;
            clickedBtn.style.border = '4px solid #000000';
            
            // Register target working parameters
            SELECTED_GROUP_CODE = clickedBtn.getAttribute('data-group');
            SELECTED_PROCESS_NAME = null; // Clear old process selection text focus
            
            // Wake up processing elements row and make text bold black 
            toggleProcessButtonsState(true);
            
            updateDashboardContextBanner();
        });
    });

    // 3. Monitor individual dropdown adjustments to rewrite selection strings live
    document.querySelectorAll('.date-dropdown').forEach(dropdownElement => {
        dropdownElement.addEventListener('change', () => {
            updateDashboardContextBanner();
        });
    });

    // 4. Track process action clicks to format final verification tracking string
    document.querySelectorAll('.process-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Isolate process name safely stripping nested subtitle layout text blocks
            let fullTextString = e.currentTarget.innerText;
            if (fullTextString.includes('\n')) {
                SELECTED_PROCESS_NAME = fullTextString.split('\n')[0].trim();
            } else if (fullTextString.includes('▼')) {
                SELECTED_PROCESS_NAME = fullTextString.replace('▼', '').trim();
            } else {
                SELECTED_PROCESS_NAME = fullTextString.trim();
            }
            
            // Remove arrow indicators if present inside text string tokens
            SELECTED_PROCESS_NAME = SELECTED_PROCESS_NAME.replace('▼', '').trim();
            
            updateDashboardContextBanner();
            
            // Update workspace status inside clipboard data view container
            const displayArea = document.getElementById('whatsappClipboardArea');
            displayArea.value = `Sairam!\nRunning automation scripts for matching criteria keys...\n- Focus Target: AS ${SELECTED_GROUP_CODE} Group\n- Action Process: ${SELECTED_PROCESS_NAME}`;
        });
    });

    // 5. Secure clipboard copying operations routines
    document.getElementById('copyTextBtn').addEventListener('click', () => {
        const txtArea = document.getElementById('whatsappClipboardArea');
        txtArea.select();
        txtArea.setSelectionRange(0, 99999); 
        navigator.clipboard.writeText(txtArea.value);
    });
});
