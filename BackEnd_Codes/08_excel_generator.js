/**
 * ============================================================================
 * SCRIPT NO     : 08
 * SCRIPT NAME   : 08_excel_generator.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Activity A - Generates a unified multi-tab Excel workbook with 
 *                 color-coded row structures and an automated Member Allotment Tally.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const monthlyAllotmentBtn = document.getElementById("btn_monthly_allotment");
    if (monthlyAllotmentBtn) {
        monthlyAllotmentBtn.addEventListener("click", () => {
            generateMonthlyAllotmentWorkbook();
        });
    }
});

/**
 * Main orchestration function to assemble sheets, summary tables, and trigger download.
 */
function generateMonthlyAllotmentWorkbook() {
    if (typeof XLSX === 'undefined') {
        alert("Sairam! Excel utility library (SheetJS) is missing. Please ensure it is linked in your HTML file.");
        return;
    }

    // Verify presence of member records before compiling the tally block
    if (typeof BHAJAN_MEMBERS_DATA === 'undefined') {
        alert("Sairam! Member data array (00_members_database.js) could not be located in memory.");
        return;
    }

    const currentYear = new Date().getFullYear();
    const currentMonthLabel = getCurrentMonthLongForm();
    const workbook = XLSX.utils.book_new();

    // 1. Structural offering row blueprint
    const offeringsRowsDefinition = [
        { num: 1, name: "GANESH BHAJAN" },
        { num: 2, name: "GURU BHAJAN" },
        { num: 3, name: "DEVI BHAJAN" },
        { num: 4, name: "SARVA DHARMA BHAJAN" },
        { num: 5, name: "RAMAR BHAJAN" },
        { num: 6, name: "KRISHNAR BHAJAN" },
        { num: 7, name: "SHIVA BHAJAN" },
        { num: 8, name: "BHAJAN ON SWAMI" },
        { num: 9, name: "VITTHALA BHAJAN" },
        { num: 10, name: "NARAYANA / HARI / GOVINDA BHAJAN" },
        { num: 11, name: "AYYAPPA BHAJAN" },
        { num: 12, name: "HANUMAR BHAJAN" },
        { num: 13, name: "SUBRAMANYAM" },
        { num: 14, name: "AARTHI & VM" }
    ];

    // 2. Iterate through each group to build its independent spreadsheet tab
    BHAJAN_GROUPS_CONFIG.forEach(group => {
        const sheetData = [];

        // Header Rows Creation
        const mainTitle = `(${group.name}) - MONTHLY ALLOTMENT OF MANDATORY, SEMI-MANDATORY & OPTIONAL OFFERINGS STATEMENT FOR ${currentMonthLabel}, ${currentYear}`;
        sheetData.push([mainTitle]);
        sheetData.push(["ALLOOTTEES' NAMES - SAIRAM"]);

        const columnsHeader = ["#", "OFFERINGS"];
        const computedDates = extractUpcomingDatesForGroup(group.id);
        computedDates.forEach(dStr => {
            columnsHeader.push(formatToExcelDateHeader(dStr));
        });
        sheetData.push(columnsHeader);

        // Populate the 14 offering matrix lines
        offeringsRowsDefinition.forEach(offering => {
            const dataRow = [offering.num, offering.name];
            computedDates.forEach(() => dataRow.push("")); 
            sheetData.push(dataRow);
        });

        // --- ADD MEMBER ALLOTMENT TALLY SUMMARY BELOW MAIN STATEMENT ---
        // Leave 3 blank buffering rows for clean visual spacing
        sheetData.push([]);
        sheetData.push([]);
        sheetData.push([`MEMBER ALLOTMENT SUMMARY TALLY FOR ${group.id} GROUP`]);
        
        // Add requested sub-headers matching your design choice exactly
        sheetData.push(["Id No", "NAME OF THE MEMBER", "NO"]);

        // Dynamically inject the 77 active devotees from your database script file
        const activeMembers = BHAJAN_MEMBERS_DATA.filter(member => member.status === "A" || member.STS === "A");
        
        activeMembers.forEach(member => {
            // "NO" column cell remains blank ready for simple physical calculation inputs
            sheetData.push([member.id || member.idNo || "", member.name || "", ""]);
        });

        // Convert the final array matrix into an exportable SheetJS worksheet instance
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

        // Setup clear cell merge matrices for titles
        const maxColsCount = columnsHeader.length;
        worksheet['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: maxColsCount - 1 } }, // Merges Main Header block
            { s: { r: 1, c: 0 }, e: { r: 1, c: maxColsCount - 1 } }  // Merges Sub-Header block
        ];

        XLSX.utils.book_append_sheet(workbook, worksheet, group.id);
    });

    // 3. Trigger safe binary excel download
    const fileName = `Bhajan_Monthly_Allotment_${currentMonthLabel}_${currentYear}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    console.log(`Sairam: Multi-tab Allotment sheet with active member summary generated as ${fileName}`);
}

/**
 * Extracts calculated dynamic sequence dates string values from dropdown elements
 */
function extractUpcomingDatesForGroup(groupId) {
    const dates = [];
    const selectElement = document.getElementById(`select_date_${groupId.toLowerCase()}`);
    if (selectElement) {
        for (let i = 0; i < selectElement.options.length; i++) {
            dates.push(selectElement.options[i].value);
        }
    }
    return dates.slice(0, 5);
}

/**
 * Formats data values cleanly into requested "DD-MM-YYYY, DDD" layout structure string
 */
function formatToExcelDateHeader(dateIsoString) {
    if (!dateIsoString) return "DATE & DAY (DD-MM-YYYY, DDD)";
    const d = new Date(dateIsoString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const daysArray = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return `${day}-${month}-${year}, ${daysArray[d.getDay()]}`;
}

/**
 * Utility helper to fetch active month name strings in clean upper-case format
 */
function getCurrentMonthLongForm() {
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    return months[new Date().getMonth()];
}
