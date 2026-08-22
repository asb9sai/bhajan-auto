/**
 * ============================================================================
 * SCRIPT NO     : 03
 * SCRIPT NAME   : 03_database_core.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Establishes secure serverless operations over GitHub, and
 *                 manages interactive active/inactive states of process buttons.
 *                 Reads data seamlessly using public repository fetching pathways.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

const GITHUB_DATABASE_CONFIG = {
    owner: 'asb9sai',                         
    repo: 'bhajan-auto',                      
    path: 'ASMbrMstr.json',                   
    token: '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' // Preserved for secure write updates
};

// Global administrative selection tracking tokens
let SELECTED_GROUP_CODE = null;
let SELECTED_PROCESS_NAME = null;

/**
 * 1. READ OPERATION (UPDATED)
 * Fetches the member master records directly from the public GitHub Pages URL.
 * This completely bypasses token blocks and resolves local browser network restrictions.
 */
async function fetchMemberMasterFromVault() {
    // Direct public web path to your data file
    const publicDataUrl = `https://githubusercontent.com{GITHUB_DATABASE_CONFIG.owner}/${GITHUB_DATABASE_CONFIG.repo}/main/${GITHUB_DATABASE_CONFIG.path}`;
    
    try {
        const networkResponse = await fetch(publicDataUrl, {
            method: 'GET',
            cache: 'no-store' // Enforces loading the absolute freshest records every time
        });

        if (!networkResponse.ok) {
            throw new Error(`Public fetch failed with HTTP status: ${networkResponse.status}`);
        }

        const membersArray = await networkResponse.json();
        
        // Return structured format matching expected application logic fields
        return { 
            members: membersArray, 
            sha: null // SHA is not required for open public read operations
        };
    } catch (databaseError) {
        console.error("[03_database_core.js] Open Read Exception:", databaseError);
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
 * Formats and renders the dynamic confirmation running text string into your DESCRIPTION box.
 */
function updateDashboardContextBanner() {
    const valueDisplayContainer = document.getElementById('contextBannerText');
    if (!valueDisplayContainer) return;
    
    if (!SELECTED_GROUP_CODE) {
        valueDisplayContainer.innerText = "Here the selected Group, Date and Button Process to be displayed";
        return;
    }

    let expansionTitleMap = { "WED": "WEDNESDAY", "FRI": "FRIDAY", "ARD": "ARDRA", "MAH": "MAHILAS", "SPL": "SPECIAL BHAJAN", "PRM": "PRM" };
    const cleanGroupTitle = expansionTitleMap[SELECTED_GROUP_CODE] || SELECTED_GROUP_CODE;
    
    const matchingDropdownElement = document.getElementById(`dropdown_${SELECTED_GROUP_CODE}`);
    let activeDateString = (matchingDropdownElement && matchingDropdownElement.value) ? matchingDropdownElement.value : "CHOSEN DATE";

    if (SELECTED_PROCESS_NAME) {
        valueDisplayContainer.innerText = `AS ${cleanGroupTitle} GROUP - ${activeDateString} - ${SELECTED_PROCESS_NAME} ARE BEING PROCESSED`;
    } else {
        valueDisplayContainer.innerText = `AS ${cleanGroupTitle} GROUP - ${activeDateString} - SELECT A PROCESS BUTTON`;
    }
}

// Binds interface listeners seamlessly on system boot sequence initialization
document.addEventListener('DOMContentLoaded', () => {
    toggleProcessButtonsState(false);
    
    document.querySelectorAll('.group-btn').forEach(buttonElement => {
        buttonElement.addEventListener('click', (eventObject) => {
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            
            document.querySelectorAll('.group-btn').forEach(btn => {
                btn.style.border = '';
                btn.style.borderBottom = '2px solid #000';
            });
            
            const clickedBtn = eventObject.currentTarget;
            clickedBtn.style.border = '4px solid #000000';
            
            SELECTED_GROUP_CODE = clickedBtn.getAttribute('data-group');
            SELECTED_PROCESS_NAME = null; 
            
            toggleProcessButtonsState(true);
            updateDashboardContextBanner();
        });
    });

    document.querySelectorAll('.date-dropdown').forEach(dropdownElement => {
        dropdownElement.addEventListener('change', () => {
            updateDashboardContextBanner();
        });
    });

    document.querySelectorAll('.process-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            let fullTextString = e.currentTarget.innerText;
            if (fullTextString.includes('\n')) {
                SELECTED_PROCESS_NAME = fullTextString.split('\n')[0].trim();
            } else if (fullTextString.includes('▼')) {
                SELECTED_PROCESS_NAME = fullTextString.replace('▼', '').trim();
            } else {
                SELECTED_PROCESS_NAME = fullTextString.trim();
            }
            
            SELECTED_PROCESS_NAME = SELECTED_PROCESS_NAME.replace('▼', '').trim();
            updateDashboardContextBanner();
            
            const displayArea = document.getElementById('whatsappClipboardArea');
            displayArea.value = `Sairam!\nRunning automation scripts for matching criteria keys...\n- Focus Target: AS ${SELECTED_GROUP_CODE} Group\n- Action Process: ${SELECTED_PROCESS_NAME}`;
        });
    });

    document.getElementById('copyTextBtn').addEventListener('click', () => {
        const txtArea = document.getElementById('whatsappClipboardArea');
        txtArea.select();
        txtArea.setSelectionRange(0, 99999); 
        navigator.clipboard.writeText(txtArea.value);
    });
});
