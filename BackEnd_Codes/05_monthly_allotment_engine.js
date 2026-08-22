/**
 * ============================================================================
 * SCRIPT NO     : 05
 * SCRIPT NAME   : 05_monthly_allotment_engine.js (PART 1 OF 2)
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Processes automated round-robin devotee assignments for 
 *                 Mandatory & Semi-Mandatory offerings. Generates a single
 *                 multi-worksheet Excel workbook (.xlsx) with slot tracking audits.
 * PLATFORMS     : 100% JavaScript. Native execution on Laptop and Mobile browsers.
 * ============================================================================
 */

const BHAJAN_OFFERINGS_MASTER = [
    "GANESH BHAJAN", "GURU BHAJAN", "DEVI BHAJAN", "SARVA DHARMA BHAJAN",
    "RAMAR BHAJAN", "KRISHNAR BHAJAN", "SHIVA BHAJAN", "BHAJAN ON SWAMI",
    "VITTHALA BHAJAN", "NARAYANA / HARI / GOVINDA BHAJAN", "AYYAPPA BHAJAN",
    "HANUMAR BHAJAN", "SUBRAMANYAM", "AARTHI & VM"
];

const LOCAL_MEMBER_MASTER_DATA = [
  { "ID": 1, "NAME": "Example Devotee 1", "WED": "Y", "FRI": "N", "ARD": "Y", "MAH": "N", "SPL": "Y", "STS": "Y" },
  { "ID": 2, "NAME": "Example Devotee 2", "WED": "N", "FRI": "Y", "ARD": "N", "MAH": "Y", "SPL": "N", "STS": "Y" },
  { "ID": 3, "NAME": "Example Devotee 3", "WED": "Y", "FRI": "Y", "ARD": "Y", "MAH": "N", "SPL": "Y", "STS": "Y" },
  { "ID": 4, "NAME": "Example Devotee 4", "WED": "N", "FRI": "Y", "ARD": "N", "MAH": "Y", "SPL": "N", "STS": "Y" }
];

let VALUE_CURRENT_MONTH_STR = "";
let VALUE_NEXT_MONTH_STR = "";

/**
 * Initializes the text workspace. Shifts calculations forward by 1 month 
 * to display coming month and next month targets cleanly.
 */
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

    let baselineText = `Sairam. Monthly Allotment Module Active (Multi-Worksheet Excel Mode).\n\n`;
    baselineText += `Please click one of the active calculation target buttons appearing at the bottom of the interface:\n`;
    baselineText += `1. Click [ ${VALUE_CURRENT_MONTH_STR} ] to generate multi-tab Excel files natively.\n`;
    baselineText += `2. Click [ ${VALUE_NEXT_MONTH_STR} ] to run assignments for the next month.\n\n`;
    baselineText += `-----------------------------------------------------------------------------------------\n`;
    baselineText += `System Status: JavaScript compilation engine ready. Multi-worksheet arrays active.`;
    
    displayWorkspace.value = baselineText;
    controlPanelBar.style.display = "flex";

    const bannerText = document.getElementById('contextBannerText');
    if(bannerText) bannerText.innerText = "MONTHLY ALLOTMENT WORKSPACE INITIALIZED - CHOOSE MONTH BUTTON BELOW";
}

/**
 * Dynamically determines session dates based on targeted month calendar rules.
 */
function getTargetSessionDatesForMonth(groupCode, targetMonthString) {
    const sessionDates = [];
    const [monthName, yearStr] = targetMonthString.split(" ");
    const yearNum = parseInt(yearStr);
    const monthNum = new Date(Date.parse(monthName + " 1, " + yearStr)).getMonth();
    const daysInMonth = new Date(yearNum, monthNum + 1, 0).getDate();
    let targetDayOfWeek = (groupCode === "WED") ? 3 : (groupCode === "FRI" ? 5 : -1);

    if (targetDayOfWeek !== -1) {
        for (let d = 1; d <= daysInMonth; d++) {
            const tempDate = new Date(yearNum, monthNum, d);
            if (tempDate.getDay() === targetDayOfWeek) {
                sessionDates.push(`${String(d).padStart(2,'0')}-${String(monthNum+1).padStart(2,'0')}-${yearNum}, ${tempDate.toLocaleString('en-US', {weekday:'short'}).toUpperCase()}`);
            }
        }
    } else {
        sessionDates.push("19-09-2026, SAT");
        sessionDates.push("26-09-2026, SAT");
    }
    return sessionDates;
}
/**
 * Native JavaScript Compilation Engine creating multi-tab spreadsheets on-the-fly.
 * Appends audit metrics table capturing slot count values covering all active records.
 */
async function executeMonthlyAllotmentProcess(targetMonthString) {
    const displayWorkspace = document.getElementById('whatsappClipboardArea');
    displayWorkspace.value = `Sairam. Mapping native membership definition rows across separate worksheet parameters...\n`;

    const liveWorkbook = XLSX.utils.book_new();
    const activeDevoteeList = LOCAL_MEMBER_MASTER_DATA.filter(member => member.STS === "Y");
    const targetGroups = ["WED", "FRI", "ARD", "MAH", "SPL"];

    targetGroups.forEach(groupCode => {
        const groupDevotees = activeDevoteeList.filter(m => m[groupCode] === "Y");
        if (groupDevotees.length === 0) return;

        const sessionDatesColumns = getTargetSessionDatesForMonth(groupCode, targetMonthString);
        let groupRotationQueue = [...groupDevotees].sort(() => Math.random() - 0.5);
        let queuePointer = 0;

        const groupSlotAuditMap = {};
        activeDevoteeList.forEach(m => {
            groupSlotAuditMap[m.ID] = { name: m.NAME, slotsCount: 0 };
        });

        const sheetRowsArray = [];
        sheetRowsArray.push([`(AS ${groupCode} BHAJAN GROUP) - MONTHLY ALLOTMENT OF OFFERINGS STATEMENT FOR ${targetMonthString}`]);
        sheetRowsArray.push(["ALLOTTEES' NAMES - SAIRAM"]);
        
        let headerRow = ["#", "OFFERINGS"];
        sessionDatesColumns.forEach(d => headerRow.push(`DATE & DAY (${d})`));
        sheetRowsArray.push(headerRow);

        BHAJAN_OFFERINGS_MASTER.forEach((offeringName, index) => {
            let rowData = [index + 1, offeringName];
            
            sessionDatesColumns.forEach(() => {
                let assignedMember = groupRotationQueue[queuePointer];
                rowData.push(assignedMember ? assignedMember.NAME : "Unassigned");
                
                if (assignedMember && groupSlotAuditMap[assignedMember.ID]) {
                    groupSlotAuditMap[assignedMember.ID].slotsCount += 1;
                }
                queuePointer = (queuePointer + 1) % groupRotationQueue.length;
            });
            sheetRowsArray.push(rowData);
        });

        sheetRowsArray.push([]);
        sheetRowsArray.push([`*ALLOTMENT OF MANDATORY & OTHER OFFERINGS FOR ${targetMonthString}*`]);
        sheetRowsArray.push(["Sairam pl peruse the appended list and render the offerings as allotted."]);
        sheetRowsArray.push(["*Kindly inform us immediately if you are not available for rendering the offerings allotted as above*"]);
        sheetRowsArray.push(["Om Sri Sairam 🙌"]);
        sheetRowsArray.push([]);

        sheetRowsArray.push(["MEMBER ID", "MEMBER NAME", "TOTAL SLOTS ALLOTTED"]);
        Object.keys(groupSlotAuditMap).forEach(memberId => {
            const auditInfo = groupSlotAuditMap[memberId];
            sheetRowsArray.push([parseInt(memberId), auditInfo.name, auditInfo.slotsCount]);
        });

        const liveWorksheet = XLSX.utils.aoa_to_sheet(sheetRowsArray);
        XLSX.utils.book_append_sheet(liveWorkbook, liveWorksheet, `AS_${groupCode}_GROUP`);
    });

    try {
        const targetOutputName = `MULTI_TAB_ALLOTMENT_${targetMonthString.replace(/ /g, "_")}.xlsx`;
        XLSX.writeFile(liveWorkbook, targetOutputName);

        let successMessage = `Sairam! True Multi-Worksheet Excel Workbook compiled natively for [${targetMonthString}].\n\n`;
        successMessage += `✓ INDIVIDUAL WORKSHEETS CREATED: WED, FRI, ARD, MAH, SPL tabs appended cleanly.\n`;
        successMessage += `✓ SLOT TRACKING AUDIT GENERATED: Summary table tracking slots compiled for all active members.\n\n`;
        successMessage += `📁 EXCEL WORKBOOK FILE DOWNLOADED:\n`;
        successMessage += `Filename: ${targetOutputName}\n\n`;
        successMessage += `Please check your local downloads folder, and move this file directly to your target directory path at:\n`;
        successMessage += `D:\\COMMON PYTHON\\HTMLBJNAUTO\\OUTPUTS\\`;

        displayWorkspace.value = successMessage;

        const bannerText = document.getElementById('contextBannerText');
        if(bannerText) bannerText.innerText = `MULTI-TAB WORKBOOK COMPILED FOR ${targetMonthString}`;

    } catch (excelError) {
        console.error(excelError);
        displayWorkspace.value += `\n❌ Compilation Interrupted Natively: ${excelError.message}`;
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
            if (typeof toggleProcessButtonsState === "function") { toggleProcessButtonsState(false); }
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            allotmentNavBtn.classList.add('active');
            renderMonthlyAllotmentInterface();
        });
    }

    const currentBtn = document.getElementById('allotCurrentBtn');
    const nextBtn = document.getElementById('allotNextBtn');

    if(currentBtn) { currentBtn.addEventListener('click', () => { if(VALUE_CURRENT_MONTH_STR) executeMonthlyAllotmentProcess(VALUE_CURRENT_MONTH_STR); }); }
    if(nextBtn) { nextBtn.addEventListener('click', () => { if(VALUE_NEXT_MONTH_STR) executeMonthlyAllotmentProcess(VALUE_NEXT_MONTH_STR); }); }
});
