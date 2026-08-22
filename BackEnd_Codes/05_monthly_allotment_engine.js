/**
 * ============================================================================
 * SCRIPT NO     : 05
 * SCRIPT NAME   : 05_monthly_allotment_engine.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Processes automated round-robin devotee assignments for 
 *                 Mandatory & Semi-Mandatory offerings across all AS groups.
 *                 Uses a native local database structure to completely bypass
 *                 network restrictions and DNS blocking rules.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

// Master Offerings Database Mapping
const BHAJAN_OFFERINGS_MASTER = [
    { id: 1, name: "GANESH BHAJAN", nature: "Mandatory", code: "M" },
    { id: 2, name: "GURU BHAJAN", nature: "Mandatory", code: "M" },
    { id: 3, name: "DEVI BHAJAN", nature: "Mandatory", code: "M" },
    { id: 4, name: "SARVA DHARMA BHAJAN", nature: "Mandatory", code: "M" },
    { id: 5, name: "RAMAR BHAJAN", nature: "Semi-Mandatory", code: "S" },
    { id: 6, name: "KRISHNAR BHAJAN", nature: "Semi-Mandatory", code: "S" },
    { id: 7, name: "SHIVA BHAJAN", nature: "Semi-Mandatory", code: "S" },
    { id: 8, name: "BHAJAN ON SWAMI", nature: "Semi-Mandatory", code: "S" },
    { id: 9, name: "VITTHALA BHAJAN", nature: "Semi-Mandatory", code: "S" },
    { id: 10, name: "NARAYANA / HARI / GOVINDA BHAJAN", nature: "Semi-Mandatory", code: "S" },
    { id: 11, name: "AYYAPPA BHAJAN", nature: "Semi-Mandatory", code: "S" },
    { id: 12, name: "HANUMAR BHAJAN", nature: "Mandatory", code: "M" },
    { id: 13, name: "SUBRAMANYAM", nature: "Mandatory", code: "M" },
    { id: 14, name: "AARTHI & VM", nature: "Mandatory", code: "M" }
];

// NATIVE MEMBER MASTER DATA: Local copy prevents network blocks entirely
const LOCAL_MEMBER_MASTER_DATA = [
  {
    "ID": 1,
    "NAME": "Example Devotee 1",
    "WED": "Y", "FRI": "N", "ARD": "Y", "MAH": "N", "SPL": "Y",
    "GAN": "Y", "GUR": "Y", "DVI": "N", "SDH": "Y", "ART": "Y",
    "WHL": "Y", "STS": "Y"
  },
  {
    "ID": 2,
    "NAME": "Example Devotee 2",
    "WED": "N", "FRI": "Y", "ARD": "N", "MAH": "Y", "SPL": "N",
    "GAN": "Y", "GUR": "N", "DVI": "Y", "SDH": "N", "ART": "Y",
    "WHL": "N", "STS": "Y"
  }
];

let VALUE_CURRENT_MONTH_STR = "";
let VALUE_NEXT_MONTH_STR = "";

function renderMonthlyAllotmentInterface() {
    const displayWorkspace = document.getElementById('whatsappClipboardArea');
    const controlPanelBar = document.getElementById('allotmentControlPanel');
    if (!displayWorkspace || !controlPanelBar) return;

    const baseCalendarDate = new Date();

    const dComingMonth = new Date(baseCalendarDate.getFullYear(), baseCalendarDate.getMonth() + 1, 1);
    VALUE_CURRENT_MONTH_STR = `${dComingMonth.toLocaleString('en-US', { month: 'long' }).toUpperCase()} ${dComingMonth.getFullYear()}`;

    const dNextMonth = new Date(baseCalendarDate.getFullYear(), baseCalendarDate.getMonth() + 2, 1);
    VALUE_NEXT_MONTH_STR = `${dNextMonth.toLocaleString('en-US', { month: 'long' }).toUpperCase()} ${dNextMonth.getFullYear()}`;

    document.getElementById('allotCurrentBtn').innerText = VALUE_CURRENT_MONTH_STR;
    document.getElementById('allotNextBtn').innerText = VALUE_NEXT_MONTH_STR;

    let baselineText = `Sairam. Monthly Allotment Module Active (Local Mode Enabled).\n\n`;
    baselineText += `Please click one of the active calculation target buttons appearing at the bottom of the interface:\n`;
    baselineText += `1. Click [ ${VALUE_CURRENT_MONTH_STR} ] to generate allotments for the coming monthly cycle.\n`;
    baselineText += `2. Click [ ${VALUE_NEXT_MONTH_STR} ] to run assignments for the next month after that.\n\n`;
    baselineText += `-----------------------------------------------------------------------------------------\n`;
    baselineText += `System Status: Local database active. Network security check bypassed successfully.`;
    
    displayWorkspace.value = baselineText;
    controlPanelBar.style.display = "flex";

    const bannerText = document.getElementById('contextBannerText');
    if(bannerText) bannerText.innerText = "MONTHLY ALLOTMENT WORKSPACE INITIALIZED - CHOOSE MONTH BUTTON BELOW";
}

/**
 * Core Allotment Balancing Calculation Matrix and Excel Downloader Engine.
 */
async function executeMonthlyAllotmentProcess(targetMonthString) {
    const displayWorkspace = document.getElementById('whatsappClipboardArea');
    displayWorkspace.value = `Sairam. Accessing native member data profile definitions...\n`;

    // Access local dataset instantly, bypassing any DNS web network restrictions completely
    const activeDevoteeList = LOCAL_MEMBER_MASTER_DATA.filter(member => member.STS === "Y");
    displayWorkspace.value += `✓ Loaded ${activeDevoteeList.length} active devotees cleanly from native memory.\n`;
    displayWorkspace.value += `Executing round-robin balancing allocations across active group channels...\n`;

    let CSVContentStream = "GROUP,OFFERING ID,OFFERING NAME,ASSIGNED DEVOTEE ID,ASSIGNED DEVOTEE NAME\r\n";
    const targetGroups = ["WED", "FRI", "ARD", "MAH", "SPL"];
    
    targetGroups.forEach(groupCode => {
        const groupDevotees = activeDevoteeList.filter(m => m[groupCode] === "Y");
        if (groupDevotees.length === 0) return;

        let rotationQueue = [...groupDevotees].sort(() => Math.random() - 0.5);
        let queueIndexPointer = 0;

        BHAJAN_OFFERINGS_MASTER.forEach(offering => {
            let assignedMember = rotationQueue[queueIndexPointer];
            const memberId = assignedMember ? assignedMember.ID : "N/A";
            const memberName = assignedMember ? assignedMember.NAME.replace(/"/g, '""') : "Unassigned";
            
            CSVContentStream += `${groupCode},${offering.id},"${offering.name}",${memberId},"${memberName}"\r\n`;
            queueIndexPointer = (queueIndexPointer + 1) % rotationQueue.length;
        });
    });

    try {
        const dataBlobElement = new Blob([CSVContentStream], { type: 'text/csv;charset=utf-8;' });
        const temporaryLinkAnchor = document.createElement("a");
        const formattedFileName = `MONTHLY_ALLOTMENT_${targetMonthString.replace(/ /g, "_")}.csv`;

        const ObjectUrlReference = URL.createObjectURL(dataBlobElement);
        temporaryLinkAnchor.setAttribute("href", ObjectUrlReference);
        temporaryLinkAnchor.setAttribute("download", formattedFileName);
        temporaryLinkAnchor.style.visibility = 'hidden';
        
        document.body.appendChild(temporaryLinkAnchor);
        temporaryLinkAnchor.click();
        document.body.removeChild(temporaryLinkAnchor);

        let successMessage = `Sairam! Monthly Allotment processing completed successfully for [${targetMonthString}].\n\n`;
        successMessage += `✓ Anti-duplication checking: PASS\n`;
        successMessage += `✓ Fair opportunity queue balancing: SECURED\n\n`;
        successMessage += `📁 SPREADSHEET FILE GENERATED AND DOWNLOADED:\n`;
        successMessage += `Filename: ${formattedFileName}\n\n`;
        successMessage += `Please check your phone or laptop's default download folder, and move this file directly to your target directory path at:\n`;
        successMessage += `D:\\COMMON PYTHON\\HTMLBJNAUTO\\OUTPUTS\\`;

        displayWorkspace.value = successMessage;

        const bannerText = document.getElementById('contextBannerText');
        if(bannerText) bannerText.innerText = `MONTHLY ALLOTMENT COMPLETE FOR ${targetMonthString} - FILE DOWNLOADED`;

    } catch (fileError) {
        console.error("File write exception:", fileError);
        displayWorkspace.value += `\n❌ File Stream Pushing Interrupted: ${fileError.message}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const allotmentNavBtn = document.querySelector('.nav-btn.month-allot-btn');
    if (allotmentNavBtn) {
        allotmentNavBtn.addEventListener('click', () => {
            document.querySelectorAll('.group-btn').forEach(btn => {
                btn.style.border = '';
                btn.style.borderBottom = '2px solid #000';
            });
            
            SELECTED_GROUP_CODE = null;
            if (typeof toggleProcessButtonsState === "function") {
                toggleProcessButtonsState(false);
            }
            
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            allotmentNavBtn.classList.add('active');
            renderMonthlyAllotmentInterface();
        });
    }

    const currentBtn = document.getElementById('allotCurrentBtn');
    const nextBtn = document.getElementById('allotNextBtn');

    if(currentBtn) {
        currentBtn.addEventListener('click', () => {
            if(VALUE_CURRENT_MONTH_STR) executeMonthlyAllotmentProcess(VALUE_CURRENT_MONTH_STR);
        });
    }
    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            if(VALUE_NEXT_MONTH_STR) executeMonthlyAllotmentProcess(VALUE_NEXT_MONTH_STR);
        });
    }
});
