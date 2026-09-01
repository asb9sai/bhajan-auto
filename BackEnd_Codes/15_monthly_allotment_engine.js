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

/**
 * Verifies and hooks interface containers to engine structures safely
 */
function initializeMonthlyAllotmentInterface() {
    console.log("Sairam: Initializing dynamic 3-month button linkage layout...");
    const buttonsContainer = document.getElementById("dynamic_month_buttons_container");
    if (!buttonsContainer) {
        console.log("Sairam Warning: Container element 'dynamic_month_buttons_container' not found yet.");
        return;
    }
    console.log("Sairam: Dynamic 3-month buttons successfully linked to memory layers.");
}

/**
 * Orchestrates verification checkpoints and processes member distributions systematically
 */
function executeCoreAllotmentProcessingRoute(targetMonthValue, targetMonthLabel) {
    if (typeof window.GLOBAL_MASTER_MEMBER_ROWS === 'undefined') {
        alert("Sairam! Devotee database array (00_member_database.js) is missing from system memory.");
        return;
    }

    if (SYSTEM_COMPLED_ALLOTMENTS_TRACKER[targetMonthValue]) {
        alert(`Sairam! Monthly allotments for ${targetMonthLabel} are already locked and finalized.`);
        return;
    }

    console.log(`Sairam: Initiating calculation matrix allocation pipelines targeting: ${targetMonthLabel}`);

    let activeMembersPool = JSON.parse(JSON.stringify(window.GLOBAL_MASTER_MEMBER_ROWS.filter(m => m.STS === "A")));
    
    if (activeMembersPool.length === 0) {
        alert("Sairam! No active members with status 'A' found in your database records.");
        return;
    }

    let globalTallySummaryMap = {};
    window.GLOBAL_MASTER_MEMBER_ROWS.forEach(member => {
        globalTallySummaryMap[member.id] = { id: member.id, name: member.name, allocatedCount: 0 };
    });

    const targetOfferingsKeys = [
        { id: 1, key: "GAN", label: "GANESH BHAJAN", style: "PeachRow" },
        { id: 2, key: "GUR", label: "GURU BHAJAN", style: "PeachRow" },
        { id: 3, key: "DVI", label: "DEVI BHAJAN", style: "PeachRow" },
        { id: 4, key: "SDH", label: "SARVA DHARMA BHAJAN", style: "PeachRow" },
        { id: 5, key: "RAM", label: "RAMAR BHAJAN", style: "CyanRow" },
        { id: 6, key: "KRI", label: "KRISHNAR BHAJAN", style: "CyanRow" },
        { id: 7, key: "SHI", label: "SHIVA BHAJAN", style: "CyanRow" },
        { id: 8, key: "SWA", label: "BHAJAN ON SWAMI", style: "CyanRow" },
        { id: 9, key: "VIT", label: "VITTHALA BHAJAN", style: "CyanRow" },
        { id: 10, key: "NAR", label: "NARAYANA / HARI / GOVINDA BHAJAN", style: "CyanRow" },
        { id: 11, key: "AYY", label: "AYYAPPA BHAJAN", style: "CyanRow" },
        { id: 12, key: "HAN", label: "HANUMAR BHAJAN", style: "YellowRow" },
        { id: 13, key: "SUB", label: "SUBRAMANYAM", style: "YellowRow" },
        { id: 14, key: "ART", label: "AARTHI & VM", style: "YellowRow" }
    ];

    let groupCalculatedDataOutput = { WED: [], FRI: [], ARD: [], MAH: [], SPL: [] };

    BHAJAN_GROUPS_CONFIG.forEach(group => {
        if (group.id === "PRM") return;

        let computedDatesMatrix = [];
        const activeGroupSelectDropdown = document.getElementById(`select_date_${group.id.toLowerCase()}`);
        
        if (activeGroupSelectDropdown && activeGroupSelectDropdown.options.length > 0) {
            for (let dateIdx = 0; dateIdx < activeGroupSelectDropdown.options.length; dateIdx++) {
                computedDatesMatrix.push(activeGroupSelectDropdown.options[dateIdx].text.replace(" ▾", "").trim());
            }
        } else {
            const [clickedYear, clickedMonthNumber] = targetMonthValue.split("-").map(Number);
            const uppercaseMonthsDictionary = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            if (group.id === "ARD") {
                if (clickedMonthNumber === 9) computedDatesMatrix = [`06-Sep-${clickedYear}`, `03-Oct-${clickedYear}`, `26-Nov-${clickedYear}`];
                else computedDatesMatrix = [`05-Oct-${clickedYear}`, `02-Nov-${clickedYear}`, `28-Dec-${clickedYear}`];
            } else if (group.id === "MAH") {
                for (let mOffset = 0; mOffset < 3; mOffset++) {
                    let calcDateObj = new Date(clickedYear, (clickedMonthNumber - 1) + mOffset, 19);
                    const dayStr = String(calcDateObj.getDate()).padStart(2, '0');
                    const monStr = uppercaseMonthsDictionary[calcDateObj.getMonth()];
                    computedDatesMatrix.push(`${dayStr}-${monStr}-${calcDateObj.getFullYear()}`);
                }
            } else if (group.id === "SPL") {
                if (clickedMonthNumber === 9) computedDatesMatrix = [`04-Sep-${clickedYear}`, `14-Sep-${clickedYear}`, `20-Oct-${clickedYear}`];
                else computedDatesMatrix = [`02-Oct-${clickedYear}`, `12-Oct-${clickedYear}`, `15-Nov-${clickedYear}`];
            } else {
                const targetDayOfWeek = (group.id === "WED") ? 3 : 5;
                let runningDayTracker = new Date(clickedYear, clickedMonthNumber - 1, 1);
                while (runningDayTracker.getDay() !== targetDayOfWeek) { runningDayTracker.setDate(runningDayTracker.getDate() + 1); }
                for (let i = 0; i < 3; i++) {
                    const cleanDayPadding = String(runningDayTracker.getDate()).padStart(2, '0');
                    const cleanMonLabel = uppercaseMonthsDictionary[runningDayTracker.getMonth()];
                    computedDatesMatrix.push(`${cleanDayPadding}-${cleanMonLabel}-${runningDayTracker.getFullYear()}`);
                    runningDayTracker.setDate(runningDayTracker.getDate() + 7);
                }
            }
        }

        computedDatesMatrix.forEach((specificSessionDate, dateIdx) => {
            let detailedRowRecord = { DATE: specificSessionDate, GROUP: group.id };

            targetOfferingsKeys.forEach(offering => {
                const eligibleCandidate = activeMembersPool.find(member => {
                    if (member[group.id.toUpperCase()] !== "Y") return false;
                    
                    const memberOptInPreference = member[offering.key] || "N";
                    if (memberOptInPreference.toUpperCase() !== "Y") return false;
                    
                    const isAlreadySingingToday = Object.values(detailedRowRecord).includes(member.name);
                    return !isAlreadySingingToday;
                });

                if (eligibleCandidate) {
                    const rawDevoteeName = eligibleCandidate.name || eligibleCandidate.id || "SAIRAM DEVOTEE";
                    detailedRowRecord[offering.label] = rawDevoteeName.toUpperCase();
                    
                    if (globalTallySummaryMap[eligibleCandidate.id]) {
                        globalTallySummaryMap[eligibleCandidate.id].allocatedCount += 1;
                    }

                    const memberIndex = activeMembersPool.indexOf(eligibleCandidate);
                    activeMembersPool.splice(memberIndex, 1);
                    activeMembersPool.push(eligibleCandidate);

                    if (typeof CURRENTLY_SELECTED_GROUP !== 'undefined' && CURRENTLY_SELECTED_GROUP === group.id && dateIdx === 0) {
                        const targetUiCellInput = document.getElementById(`input_allottee_row_${offering.id}`);
                        if (targetUiCellInput) { targetUiCellInput.value = rawDevoteeName.toUpperCase(); }
                    }
                } else {
                    detailedRowRecord[offering.label] = "VACANT";
                }
            });
            groupCalculatedDataOutput[group.id].push(detailedRowRecord);
        });
    });

    SYSTEM_COMPLED_ALLOTMENTS_TRACKER[targetMonthValue] = true;

    const dashboardTerminalBox = document.getElementById("txt_clipboard_mirror_terminal");
    if (dashboardTerminalBox) {
        let monthlyBroadcastText = `*ALLOTMENT OF MANDATORY & OTHER OFFERINGS FOR ${targetMonthLabel.toUpperCase()}*\n\n`;
        monthlyBroadcastText += `Sairam pl peruse the appended monthly allotment list and render the offerings as allotted\n\n`;
        monthlyBroadcastText += `*Kindly inform us immediately if you are not available for rendering the offerings allotted as above for allotting to another member*\n\n`;
        monthlyBroadcastText += `Om Shri Sairam🌹🌹`;
        dashboardTerminalBox.value = monthlyBroadcastText;
    }

    window.LATEST_COMPUTED_MONTHLY_ALLOTMENT_DATA = groupCalculatedDataOutput;
    window.LATEST_COMPUTED_TALLY_SUMMARY_MAP = globalTallySummaryMap;

    generateMonthlyAllotmentWorkbook();
}
/**
 * 🌟 SAFELY SETS EXCEL CELL VALUES IN SHEETJS NATIVELY
 * Checks if a cell object exists; if not, creates a standard layout cell 
 * to safely avoid structure faults while completely preserving background styles!
 */
function safelySetExcelCellValue(worksheet, cellCoordinateAddress, valueToInject) {
    if (!worksheet) return;
    
    if (!worksheet[cellCoordinateAddress]) {
        worksheet[cellCoordinateAddress] = { t: 's', v: '' };
    }
    
    if (typeof valueToInject === 'number') {
        worksheet[cellCoordinateAddress].t = 'n';
        worksheet[cellCoordinateAddress].v = valueToInject;
    } else {
        worksheet[cellCoordinateAddress].t = 's';
        worksheet[cellCoordinateAddress].v = String(valueToInject);
    }
}

/**
 * 🚀 GITHUB PRODUCTION DATA INJECTION FLOW
 * Automatically reads your template file silently via native web protocols,
 * completely bypassing local CORS security filters with zero manual file prompts!
 */
async function generateMonthlyAllotmentWorkbook() {
    if (!window.LATEST_COMPUTED_MONTHLY_ALLOTMENT_DATA || !window.LATEST_COMPUTED_TALLY_SUMMARY_MAP) {
        alert("Sairam! No calculated allotment matrix data found in dashboard memory.");
        return;
    }

    const fileTargetMonthElement = document.getElementById("select_allotment_target_month");
    const activeMonthLabelStr = fileTargetMonthElement ? fileTargetMonthElement.options[fileTargetMonthElement.selectedIndex].text.replace(" ▾", "").trim().toUpperCase() : "SEPTEMBER 2026";
    const [clickedYear, clickedMonthNumber] = (fileTargetMonthElement ? fileTargetMonthElement.value : "2026-09").split("-");

    console.log("Sairam: Fetching master 'OUTPUTS/MTHLY_BJN_FMT.xlsx' format template from web server repository path...");

    try {
        // 🌟 NATIVE WEB PROTOCOL FETCH: Reads the template silently from your live server repository path
                // 🌟 NATIVE WEB PROTOCOL FETCH WITH LIVE CACHE BREAKER
        const responseFile = await fetch('OUTPUTS/MTHLY_BJN_FMT.xlsx?v=' + new Date().getTime());
        if (!responseFile.ok) {

            throw new Error("Master template file 'OUTPUTS/MTHLY_BJN_FMT.xlsx' was not found in the root directory tree.");
        }
        const dataBuffer = await responseFile.arrayBuffer();
        const targetWorkbook = XLSX.read(dataBuffer, { type: 'array', cellStyles: true });
        
        const activeWorksheetsList = ["WED", "FRI", "ARD", "MAH", "SPL"];
        const weekdayNamesDictionary = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

        // Step 1: Iterate through each of the 5 group worksheets tabs systematically
        activeWorksheetsList.forEach(groupId => {
            const worksheet = targetWorkbook.Sheets[groupId];
            if (!worksheet) return;

            const calculatedSessionsData = window.LATEST_COMPUTED_MONTHLY_ALLOTMENT_DATA[groupId] || [];

            // 1. MAIN TOP HEADER MAP: Inject title layout text safely into H18
            const fullTitleString = `(${groupId} BHAJAN GROUP) - MONTHLY ALLOTMENT OF MANDATORY, SEMI-MANDATORY & OPTIONAL OFFERINGS STATEMENT FOR ${activeMonthLabelStr}, ${clickedYear}`;
            safelySetExcelCellValue(worksheet, `H18`, fullTitleString);

            // 2. CALENDAR GRID MATRIX MAP: Iterate calendar data across Columns J to N
            calculatedSessionsData.forEach((sessionRecord, columnIdx) => {
                if (columnIdx > 4) return; // Hard safeguard ceiling parameter to max 5 columns
                const columnLetter = String.fromCharCode(74 + columnIdx); 

                const rawDateParts = sessionRecord.DATE.split("-"); // Splits "02-Sep-2026" cleanly
                const cleanDayPadding = rawDateParts[0];
                const cleanMonLabel = rawDateParts[1].toUpperCase();
                const cleanYearLabel = rawDateParts[2];
                
                const javascriptDateObj = new Date(Number(cleanYearLabel), fileTargetMonthElement ? fileTargetMonthElement.selectedIndex : 8, Number(cleanDayPadding));
                const dayOfWeekString = weekdayNamesDictionary[javascriptDateObj.getDay()] || "WED";
                const finalFormattedDateString = `${cleanDayPadding}-${cleanMonLabel}-${cleanYearLabel}, ${dayOfWeekString}`;
                
                // Drop clean date tracking headers directly into Row 20 cells
                safelySetExcelCellValue(worksheet, `${columnLetter}20`, finalFormattedDateString);

                // Safe coordinate data mapping across your 14 target offerings rows
                const offeringRowGridMap = [
                    { row: 21, label: "GANESH BHAJAN" },
                    { row: 22, label: "GURU BHAJAN" },
                    { row: 23, label: "DEVI BHAJAN" },
                    { row: 24, label: "SARVA DHARMA BHAJAN" },
                    { row: 25, label: "RAMAR BHAJAN" },
                    { row: 26, label: "KRISHNAR BHAJAN" },
                    { row: 27, label: "SHIVA BHAJAN" },
                    { row: 28, label: "BHAJAN ON SWAMI" },
                    { row: 29, label: "VITTHALA BHAJAN" },
                    { row: 30, label: "NARAYANA / HARI / GOVINDA BHAJAN" },
                    { row: 31, label: "AYYAPPA BHAJAN" },
                    { row: 32, label: "HANUMAR BHAJAN" },
                    { row: 33, label: "SUBRAMANYAM" },
                    { row: 34, label: "AARTHI & VM" }
                ];

                offeringRowGridMap.forEach(item => {
                    const assignedDevotee = sessionRecord[item.label] || "VACANT";
                    safelySetExcelCellValue(worksheet, `${columnLetter}${item.row}`, assignedDevotee.toUpperCase());
                });
            });

            // 3. AUTOMATED ACTIVE MEMBER EXTRACTION: Filters out only members currently opted into this specific group
            let groupSpecificMembersPool = [];
            if (typeof window.GLOBAL_MASTER_MEMBER_ROWS !== 'undefined') {
                groupSpecificMembersPool = window.GLOBAL_MASTER_MEMBER_ROWS.filter(member => 
                    member.STS === "A" && member[groupId.toUpperCase()] === "Y"
                );
            }

            // Sort members numerically by their primary master database identification index values
            groupSpecificMembersPool.sort((a, b) => Number(a.id) - Number(b.id));

            // 4. RUNNING ALLOTMENT TALLY POSTING LOOP: Safely map names down coordinates rows 39 through 88
            let trackingRowIdx = 39;
            const absoluteRowCeilingLimit = 88;

            for (let i = 0; i < groupSpecificMembersPool.length; i++) {
                if (trackingRowIdx > absoluteRowCeilingLimit) break; 

                const activeMemberProfile = groupSpecificMembersPool[i];
                const activeMemberCalculatedData = window.LATEST_COMPUTED_TALLY_SUMMARY_MAP[activeMemberProfile.id];
                const calculatedCountValue = activeMemberCalculatedData ? activeMemberCalculatedData.allocatedCount : 0;

                // AUTOMATIC FIELD OVERWRITE: Fetch ID, clean name, and calculated totals cleanly from master logs
                safelySetExcelCellValue(worksheet, `H${trackingRowIdx}`, Number(activeMemberProfile.id));
                safelySetExcelCellValue(worksheet, `I${trackingRowIdx}`, activeMemberProfile.name.toUpperCase());
                safelySetExcelCellValue(worksheet, `J${trackingRowIdx}`, calculatedCountValue);

                trackingRowIdx++;
            }

            // 5. HYGIENE CLEANUP LOOP: Wipe out any old left-over template entries down to line 88 if member count shrank
            while (trackingRowIdx <= absoluteRowCeilingLimit) {
                safelySetExcelCellValue(worksheet, `H${trackingRowIdx}`, "");
                safelySetExcelCellValue(worksheet, `I${trackingRowIdx}`, "");
                safelySetExcelCellValue(worksheet, `J${trackingRowIdx}`, "");
                trackingRowIdx++;
            }
        });

        // Step 3: Package modified template file and fire off browser download stream natively
        const cleanXlsxOutput = XLSX.write(targetWorkbook, { bookType: 'xlsx', type: 'array', cellStyles: true });
        const fileBlobContainer = new Blob([cleanXlsxOutput], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        
        const virtualAnchor = document.createElement("a");
        virtualAnchor.href = URL.createObjectURL(fileBlobContainer);
        virtualAnchor.download = `SAIRAM_BALANCED_ALLOTMENT_${activeMonthLabelStr.replace(" ","_")}.xlsx`;
        document.body.appendChild(virtualAnchor);
        virtualAnchor.click();
        document.body.removeChild(virtualAnchor);

        console.log("Sairam: Modern Excel 2021 blueprint workbook compiled and downloaded cleanly.");

    } catch (engineError) {
        console.error("Sairam Server Injection Engine Processing Fault Trace:", engineError);
        alert("Sairam! Could not update your workbook data rows. Ensure 'OUTPUTS/MTHLY_BJN_FMT.xlsx' is stored in the correct directory branch.");
    }
}

// Global script execution pathways registry binding entries
window.executeCoreAllotmentProcessingRoute = executeCoreAllotmentProcessingRoute;
initializeMonthlyAllotmentInterface();
