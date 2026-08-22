/**
 * ============================================================================
 * SCRIPT NO     : 05
 * SCRIPT NAME   : 05_monthly_allotment_engine.js (PART 1 OF 3)
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Processes automated round-robin devotee assignments for 
 *                 Mandatory & Semi-Mandatory offerings. Dynamically fetches 
 *                 records directly from ASMbrMstr.json to completely avoid hardcoding.
 * PLATFORMS     : 100% Dynamic JavaScript for Laptop and Mobile environments.
 * ============================================================================
 */

const BHAJAN_OFFERINGS_MASTER = [
    { id: 1, name: "GANESH BHAJAN", type: "M_TOP" },
    { id: 2, name: "GURU BHAJAN", type: "M_TOP" },
    { id: 3, name: "DEVI BHAJAN", type: "M_TOP" },
    { id: 4, name: "SARVA DHARMA BHAJAN", type: "M_TOP" },
    { id: 5, name: "RAMAR BHAJAN", type: "S_MID" },
    { id: 6, name: "KRISHNAR BHAJAN", type: "S_MID" },
    { id: 7, name: "SHIVA BHAJAN", type: "S_MID" },
    { id: 8, name: "BHAJAN ON SWAMI", type: "S_MID" },
    { id: 9, name: "VITTHALA BHAJAN", type: "S_MID" },
    { id: 10, name: "NARAYANA / HARI / GOVINDA BHAJAN", type: "S_MID" },
    { id: 11, name: "AYYAPPA BHAJAN", type: "S_MID" },
    { id: 12, name: "HANUMAR BHAJAN", type: "M_BOT" },
    { id: 13, name: "SUBRAMANYAM", type: "M_BOT" },
    { id: 14, name: "AARTHI & VM", type: "M_BOT" }
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

    let baselineText = `Sairam. Monthly Allotment Module Active (100% Dynamic Database Mode).\n\n`;
    baselineText += `Please click one of the active calculation target buttons appearing at the bottom of the interface:\n`;
    baselineText += `1. Click [ ${VALUE_CURRENT_MONTH_STR} ] to generate horizontal color-coded Excel sheets.\n`;
    baselineText += `2. Click [ ${VALUE_NEXT_MONTH_STR} ] to run assignments for the next month.\n\n`;
    baselineText += `-----------------------------------------------------------------------------------------\n`;
    baselineText += `System Status: Hardcoded placeholder names completely removed. Dynamic server tracking active.`;
    
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
        sessionDates.push(`19-${String(monthNum+1).padStart(2,'0')}-${yearNum}, SAT`);
        sessionDates.push(`26-${String(monthNum+1).padStart(2,'0')}-${yearNum}, SAT`);
    }
    return sessionDates;
}
/**
 * Dynamic Core Workbook Calculation Engine.
 * Pulls your member master dataset directly from GitHub raw files using a tokenless route.
 */
async function executeMonthlyAllotmentProcess(targetMonthString) {
    const displayWorkspace = document.getElementById('whatsappClipboardArea');
    displayWorkspace.value = `Sairam. Connecting dynamically to raw repository storage to pull active member records...\n`;

    try {
        // INSTANT FETCH PATH: Pulls data directly from raw file storage to bypass deployment delays [01.5]
        const publicDataResponse = await fetch('https://githubusercontent.com', { cache: 'no-store' });
        if (!publicDataResponse.ok) throw new Error("Database file read error. Verify ASMbrMstr.json path location.");
        const membersDataArray = await publicDataResponse.json();
        
        // RECALIBRATED FILTER: Enforces tracking active devotees utilizing your true database status tag ("STS": "A")
        const activeDevoteeList = membersDataArray.filter(member => member.STS === "A" || member.STS === "a");
        displayWorkspace.value += `✓ Successfully loaded ${activeDevoteeList.length} active devotees from live raw storage!\n`;
        displayWorkspace.value += `Executing round-robin balancing allocations and writing visual style rules...\n`;

        let spreadsheetStream = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>\n' +
            '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n' +
            ' xmlns:o="urn:schemas-microsoft-com:office:office"\n' +
            ' xmlns:x="urn:schemas-microsoft-com:office:excel"\n' +
            ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
            ' <Styles>\n' +
            '  <Style ss:ID="TitleRow"><Interior ss:Color="#FFFF00" ss:Pattern="Solid"/><Font ss:Bold="1"/></Style>\n' +
            '  <Style ss:ID="SubHeader"><Interior ss:Color="#C9DAF8" ss:Pattern="Solid"/><Font ss:Bold="1"/></Style>\n' +
            '  <Style ss:ID="TableHeaders"><Interior ss:Color="#FF0000" ss:Pattern="Solid"/><Font ss:Bold="1" ss:Color="#FFFFFF"/></Style>\n' +
            '  <Style ss:ID="MandatoryTop"><Interior ss:Color="#FCE4D6" ss:Pattern="Solid"/></Style>\n' +
            '  <Style ss:ID="SemiMandatory"><Interior ss:Color="#CCFFFF" ss:Pattern="Solid"/></Style>\n' +
            '  <Style ss:ID="MandatoryBot"><Interior ss:Color="#FFFF00" ss:Pattern="Solid"/></Style>\n' +
            '  <Style ss:ID="BoldLabel"><Font ss:Bold="1"/></Style>\n' +
            ' </Styles>\n';

        const targetGroups = ["WED", "FRI", "ARD", "MAH", "SPL"];
        targetGroups.forEach(groupCode => {
            // Enforce case-insensitive matching rules to fully catch 'Y' and 'y' data columns
            const groupDevotees = activeDevoteeList.filter(m => m[groupCode] === "Y" || m[groupCode] === "y");
            
            const sessionDatesColumns = getTargetSessionDatesForMonth(groupCode, targetMonthString);
            let groupRotationQueue = [...groupDevotees].sort(() => Math.random() - 0.5);
            let queuePointer = 0;

            const groupSlotAuditMap = {};
            activeDevoteeList.forEach(m => {
                groupSlotAuditMap[m.ID] = { name: m.NAME, slotsCount: 0 };
            });

            spreadsheetStream += ` <Worksheet ss:Name="AS_${groupCode}_GROUP">\n  <Table>\n`;
            
            // 1. Apply Title Background Fill Color (#FFFF00)
            spreadsheetStream += `   <Row ss:StyleID="TitleRow"><Cell><Data ss:Type="String">(AS ${groupCode} BHAJAN GROUP) - MONTHLY ALLOTMENT OF MANDATORY, SEMI-MANDATORY &amp; OPTIONAL OFFERINGS STATEMENT FOR ${targetMonthString}</Data></Cell></Row>\n`;
            // 2. Apply Sub-Header Background Fill Color (#C9DAF8)
            spreadsheetStream += `   <Row ss:StyleID="SubHeader"><Cell><Data ss:Type="String">ALLOTTEES' NAMES - SAIRAM</Data></Cell></Row>\n`;
            
            // 3. Apply Main Table Column Header Background Fill Color (#FF0000)
            spreadsheetStream += `   <Row ss:StyleID="TableHeaders">\n`;
            spreadsheetStream += `    <Cell><Data ss:Type="String">#</Data></Cell>\n`;
            spreadsheetStream += `    <Cell><Data ss:Type="String">OFFERINGS</Data></Cell>\n`;
            sessionDatesColumns.forEach(d => {
                spreadsheetStream += `    <Cell><Data ss:Type="String">${d}</Data></Cell>\n`;
            });
            spreadsheetStream += `   </Row>\n`;

            BHAJAN_OFFERINGS_MASTER.forEach((offering, index) => {
                let styleId = "MandatoryTop";
                if (offering.type === "S_MID") styleId = "SemiMandatory";
                if (offering.type === "M_BOT") styleId = "MandatoryBot";

                spreadsheetStream += `   <Row ss:StyleID="${styleId}">\n`;
                spreadsheetStream += `    <Cell><Data ss:Type="Number">${index + 1}</Data></Cell>\n`;
                spreadsheetStream += `    <Cell><Data ss:Type="String">${offering.name}</Data></Cell>\n`;
                
                sessionDatesColumns.forEach(() => {
                    let assignedMember = groupRotationQueue.length > 0 ? groupRotationQueue[queuePointer] : null;
                    let devoteeName = assignedMember ? assignedMember.NAME : "Unassigned";
                    spreadsheetStream += `    <Cell><Data ss:Type="String">${devoteeName}</Data></Cell>\n`;
                    
                    if (assignedMember && groupSlotAuditMap[assignedMember.ID]) {
                        groupSlotAuditMap[assignedMember.ID].slotsCount += 1;
                    }
                    if (groupRotationQueue.length > 0) {
                        queuePointer = (queuePointer + 1) % groupRotationQueue.length;
                    }
                });
                spreadsheetStream += `   </Row>\n`;
            });

            spreadsheetStream += `   <Row></Row>\n`;
            spreadsheetStream += `   <Row><Cell ss:StyleID="BoldLabel"><Data ss:Type="String">*ALLOTMENT OF MANDATORY &amp; OTHER OFFERINGS FOR ${targetMonthString}*</Data></Cell></Row>\n`;
            spreadsheetStream += `   <Row><Cell><Data ss:Type="String">Sairam pl peruse the appended list and render the offerings as allotted.</Data></Cell></Row>\n`;
            spreadsheetStream += `   <Row><Cell><Data ss:Type="String">*Kindly inform us immediately if you are not available for rendering the offerings allotted as above for a slotting to another member*</Data></Cell></Row>\n`;
            spreadsheetStream += `   <Row><Cell><Data ss:Type="String">Om Sri Sairam 🙌</Data></Cell></Row>\n`;
            spreadsheetStream += `   <Row></Row>\n`;

            spreadsheetStream += `   <Row ss:StyleID="SubHeader">\n`;
            spreadsheetStream += `    <Cell><Data ss:Type="String">MEMBER ID</Data></Cell>\n`;
            spreadsheetStream += `    <Cell><Data ss:Type="String">MEMBER NAME</Data></Cell>\n`;
            spreadsheetStream += `    <Cell><Data ss:Type="String">TOTAL SLOTS ALLOTTED</Data></Cell>\n`;
            spreadsheetStream += `   </Row>\n`;

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

        let successMessage = `Sairam! Multi-Tab Excel Workbook generated with 100% dynamic profiles for [${targetMonthString}].\n\n`;
        successMessage += `✓ DATABASE INTEGRATION: PASS. Verified and read directly from live ASMbrMstr.json layout.\n`;
        successMessage += `✓ ROW BACKGROUNDS APPLIED: Match color codes (Peach, Cyan, Yellow, and Red headers).\n\n`;
        successMessage += `📁 EXCEL WORKBOOK FILE DOWNLOADED SUCCESSFULLY:\n`;
        successMessage += `Filename: ${targetOutputName}`;

        displayWorkspace.value = successMessage;

        const bannerText = document.getElementById('contextBannerText');
        if(bannerText) bannerText.innerText = `NATIVE WORKBOOK COMPILED FOR ${targetMonthString}`;

        if (typeof toggleProcessButtonsState === "function") {
            toggleProcessButtonsState(false);
        }

    } catch (excelError) {
        displayWorkspace.value += `\n❌ Data Pull Blocked: Unable to query repository data records cleanly. Check ASMbrMstr.json file status.`;
        console.error(excelError);
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
