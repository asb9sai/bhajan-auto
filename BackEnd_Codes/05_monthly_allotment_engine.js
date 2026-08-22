/**
 * ============================================================================
 * SCRIPT NO     : 05
 * SCRIPT NAME   : 05_monthly_allotment_engine.js (PART 1 OF 2)
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Processes automated round-robin devotee assignments for 
 *                 Mandatory & Semi-Mandatory offerings. Generates a multi-worksheet
 *                 Excel-compatible layout natively without external network libraries.
 * PLATFORMS     : 100% Self-Contained Native JavaScript for Laptop and Mobile.
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

    let baselineText = `Sairam. Monthly Allotment Module Active (Native Spreadsheet Matrix Enabled).\n\n`;
    baselineText += `Please click one of the active calculation target buttons appearing at the bottom of the interface:\n`;
    baselineText += `1. Click [ ${VALUE_CURRENT_MONTH_STR} ] to generate horizontal allotment tables natively.\n`;
    baselineText += `2. Click [ ${VALUE_NEXT_MONTH_STR} ] to run assignments for the next month.\n\n`;
    baselineText += `-----------------------------------------------------------------------------------------\n`;
    baselineText += `System Status: 100% Self-Contained mode active. External network dependencies removed.`;
    
    displayWorkspace.value = baselineText;
    controlPanelBar.style.display = "flex";

    const bannerText = document.getElementById('contextBannerText');
    if(bannerText) bannerText.innerText = "MONTHLY ALLOTMENT WORKSPACE INITIALIZED - CHOOSE MONTH BUTTON BELOW";
}

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
        sessionDates.push(`12-${String(monthNum+1).padStart(2,'0')}-${yearNum}, MON`);
        sessionDates.push(`26-${String(monthNum+1).padStart(2,'0')}-${yearNum}, TUE`);
    }
    return sessionDates;
}
/**
 * Compiles horizontal matrix layouts and active devotee slot counts using 
 * native spreadsheet streams, completely clearing library conflicts.
 */
async function executeMonthlyAllotmentProcess(targetMonthString) {
    const displayWorkspace = document.getElementById('whatsappClipboardArea');
    displayWorkspace.value = `Sairam. Accessing native data sheets and processing round-robin allocations...\n`;

    const activeDevoteeList = LOCAL_MEMBER_MASTER_DATA.filter(member => member.STS === "Y");
    const targetGroups = ["WED", "FRI", "ARD", "MAH", "SPL"];

    // Initialize an Excel-readable XML workbook data stream
    let spreadsheetStream = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>\n' +
        '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n' +
        ' xmlns:o="urn:schemas-microsoft-com:office:office"\n' +
        ' xmlns:x="urn:schemas-microsoft-com:office:excel"\n' +
        ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
        ' <Styles><Style ss:ID="BoldText"><Font ss:Bold="1"/></Style></Styles>\n';

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

        // Open a separate Worksheet tab for each individual group
        spreadsheetStream += ` <Worksheet ss:Name="AS_${groupCode}_GROUP">\n  <Table>\n`;
        
        // 1. Group Banner Rows
        spreadsheetStream += `   <Row><Cell ss:StyleID="BoldText"><Data ss:Type="String">(AS ${groupCode} BHAJAN GROUP) - MONTHLY ALLOTMENT FOR ${targetMonthString}</Data></Cell></Row>\n`;
        spreadsheetStream += `   <Row><Cell ss:StyleID="BoldText"><Data ss:Type="String">ALLOTTEES Names - SAIRAM</Data></Cell></Row>\n`;
        spreadsheetStream += `   <Row>\n`;
        
        // 2. Main Matrix Column Headers
        spreadsheetStream += `    <Cell ss:StyleID="BoldText"><Data ss:Type="String">#</Data></Cell>\n`;
        spreadsheetStream += `    <Cell ss:StyleID="BoldText"><Data ss:Type="String">OFFERINGS</Data></Cell>\n`;
        sessionDatesColumns.forEach(d => {
            spreadsheetStream += `    <Cell ss:StyleID="BoldText"><Data ss:Type="String">DATE &amp; DAY (${d})</Data></Cell>\n`;
        });
        spreadsheetStream += `   </Row>\n`;

        // 3. Populate Offerings Matrix Rows horizontally
        BHAJAN_OFFERINGS_MASTER.forEach((offeringName, index) => {
            spreadsheetStream += `   <Row>\n`;
            spreadsheetStream += `    <Cell><Data ss:Type="Number">${index + 1}</Data></Cell>\n`;
            spreadsheetStream += `    <Cell><Data ss:Type="String">${offeringName}</Data></Cell>\n`;
            
            sessionDatesColumns.forEach(() => {
                let assignedMember = groupRotationQueue[queuePointer];
                let devoteeName = assignedMember ? assignedMember.NAME : "Unassigned";
                spreadsheetStream += `    <Cell><Data ss:Type="String">${devoteeName}</Data></Cell>\n`;
                
                if (assignedMember && groupSlotAuditMap[assignedMember.ID]) {
                    groupSlotAuditMap[assignedMember.ID].slotsCount += 1;
                }
                queuePointer = (queuePointer + 1) % groupRotationQueue.length;
            });
            spreadsheetStream += `   </Row>\n`;
        });

        // 4. Blueprint Disclaimer Rows
        spreadsheetStream += `   <Row></Row>\n`;
        spreadsheetStream += `   <Row><Cell ss:StyleID="BoldText"><Data ss:Type="String">*ALLOTMENT OF MANDATORY &amp; OTHER OFFERINGS FOR ${targetMonthString}*</Data></Cell></Row>\n`;
        spreadsheetStream += `   <Row><Cell><Data ss:Type="String">Sairam pl peruse the appended list and render the offerings as allotted.</Data></Cell></Row>\n`;
        spreadsheetStream += `   <Row><Cell><Data ss:Type="String">*Kindly inform us immediately if you are not available for rendering the offerings allotted as above*</Data></Cell></Row>\n`;
        spreadsheetStream += `   <Row><Cell><Data ss:Type="String">Om Sri Sairam 🙌</Data></Cell></Row>\n`;
        spreadsheetStream += `   <Row></Row>\n`;

        // 5. Audit Summary Header
        spreadsheetStream += `   <Row>\n`;
        spreadsheetStream += `    <Cell ss:StyleID="BoldText"><Data ss:Type="String">MEMBER ID</Data></Cell>\n`;
        spreadsheetStream += `    <Cell ss:StyleID="BoldText"><Data ss:Type="String">MEMBER NAME</Data></Cell>\n`;
        spreadsheetStream += `    <Cell ss:StyleID="BoldText"><Data ss:Type="String">TOTAL SLOTS ALLOTTED</Data></Cell>\n`;
        spreadsheetStream += `   </Row>\n`;

        // 6. Append Slot Counts covering all active members
        Object.keys(groupSlotAuditMap).forEach(memberId => {
            const auditInfo = groupSlotAuditMap[memberId];
            spreadsheetStream += `   <Row>\n`;
            spreadsheetStream += `    <Cell><Data ss:Type="Number">${memberId}</Data></Cell>\n`;
            spreadsheetStream += `    <Cell><Data ss:Type="String">${auditInfo.name}</Data></Cell>\n`;
            spreadsheetStream += `    <Cell><Data ss:Type="Number">${auditInfo.slotsCount}</Data></Cell>\n`;
            spreadsheetStream += `   </Row>\n`;
        });

        spreadsheetStream += `  </Table>\n </Worksheet>\n`;
    });

    spreadsheetStream += '</Workbook>\n';

    // Native Local browser Download Trigger pushing true multi-worksheet file streams
    try {
        const targetOutputName = `MULTI_TAB_ALLOTMENT_${targetMonthString.replace(/ /g, "_")}.xls`;
        const dataBlobElement = new Blob([spreadsheetStream], { type: 'application/vnd.ms-excel' });
        const temporaryLinkAnchor = document.createElement("a");
        
        const ObjectUrlReference = URL.createObjectURL(dataBlobElement);
        temporaryLinkAnchor.setAttribute("href", ObjectUrlReference);
        temporaryLinkAnchor.setAttribute("download", targetOutputName);
        temporaryLinkAnchor.style.visibility = 'hidden';
        
        document.body.appendChild(temporaryLinkAnchor);
        temporaryLinkAnchor.click();
        document.body.removeChild(temporaryLinkAnchor);

        let successMessage = `Sairam! Native Horizontal Excel Allotment Workbook compiled perfectly for [${targetMonthString}].\n\n`;
        successMessage += `✓ SEPARATE WORKSHEETS CREATED: WED, FRI, ARD, MAH, SPL tabs generated natively.\n`;
        successMessage += `✓ SLOT TRACKING AUDIT GENERATED: Total allotments table appended cleanly covering all active members.\n\n`;
        successMessage += `📁 EXCEL WORKBOOK FILE DOWNLOADED SUCCESSFULLY:\n`;
        successMessage += `Filename: ${targetOutputName}\n\n`;
        successMessage += `Please check your downloads folder, and move this file directly to your path at:\n`;
        successMessage += `D:\\COMMON PYTHON\\HTMLBJNAUTO\\OUTPUTS\\`;

        displayWorkspace.value = successMessage;

        const bannerText = document.getElementById('contextBannerText');
        if(bannerText) bannerText.innerText = `NATIVE WORKBOOK COMPILED FOR ${targetMonthString}`;

    } catch (excelError) {
        console.error(excelError);
        displayWorkspace.value += `\n❌ Native Compilation Interrupted: ${excelError.message}`;
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
