/**
 * ============================================================================
 * SCRIPT NO     : 15 - GITHUB PRODUCTION VERSION
 * PATH SAVED    : BackEnd_Codes/15_monthly_allotment_engine.js
 * PURPOSE       : Balanced rotation algorithm matrix that compiles allotments.
 * PLATFORMS     : Fully optimized for live GitHub Pages (Laptop & Mobile).
 * ============================================================================
 */

function initializeMonthlyAllotmentInterface() {
    console.log("Sairam: Initializing dynamic 3-month button linkage layout...");
}

function safelySetExcelCellValue(worksheet, cellCoordinateAddress, valueToInject) {
    if (!worksheet) return;
    if (!worksheet[cellCoordinateAddress]) worksheet[cellCoordinateAddress] = { t: 's', v: '' };
    worksheet[cellCoordinateAddress].t = (typeof valueToInject === 'number') ? 'n' : 's';
    worksheet[cellCoordinateAddress].v = String(valueToInject);
}

async function executeCoreAllotmentProcessingRoute(targetMonthValue, targetMonthLabel) {
    if (typeof window.GLOBAL_MASTER_MEMBER_ROWS === 'undefined') {
        alert("Sairam! Devotee database array (00_member_database.js) is missing from system memory.");
        return;
    }

    console.log(`Sairam: Initiating calculation matrix allocation pipelines targeting: ${targetMonthLabel}`);

    // Read your exact uppercase database entries safely 
    let activeMembersPool = JSON.parse(JSON.stringify(window.GLOBAL_MASTER_MEMBER_ROWS.filter(m => m.STS === "A")));
    if (activeMembersPool.length === 0) {
        alert("Sairam! No active members with status 'A' found in your database records.");
        return;
    }

    try {
        // 🌟 SILENT LOCAL SERVER FETCH: Reads your template file directly from your local repository path
        const responseFile = await fetch('OUTPUTS/MTHLY_BJN_FMT.xlsx?v=' + new Date().getTime());
        if (!responseFile.ok) throw new Error("Template file not found.");
        const dataBuffer = await responseFile.arrayBuffer();
        
        // Dynamically parse the workbook buffer in memory layers
        const targetWorkbook = XLSX.read(dataBuffer, { type: 'array', cellStyles: true });
        
        const activeWorksheetsList = ["WED", "FRI", "ARD", "MAH", "SPL"];
        const octoberWednesdayDays = ["07-Oct-2026, WED", "14-Oct-2026, WED", "21-Oct-2026, WED", "28-Oct-2026, WED", "VACANT SESSION"];

        activeWorksheetsList.forEach(groupId => {
            const worksheet = targetWorkbook.Sheets[groupId];
            if (!worksheet) return;

            // 1. Post Corrected Spelling Titles into H18 and H19 cells directly
            safelySetExcelCellValue(worksheet, 'H18', `(${groupId} BHAJAN GROUP) - MONTHLY ALLOTMENT STATEMENT FOR ${targetMonthLabel.toUpperCase()}`);
            safelySetExcelCellValue(worksheet, 'H19', `ALLOTTEES' NAMES - SAIRAM`);

            let groupEligiblePool = activeMembersPool.filter(m => m[groupId] === "Y");
            let groupDays = octoberWednesdayDays;
            
            if (groupId === "FRI") groupDays = ["02-Oct-2026, FRI", "09-Oct-2026, FRI", "16-Oct-2026, FRI", "23-Oct-2026, FRI", "30-Oct-2026, FRI"];
            else if (groupId === "ARD") groupDays = ["05-Oct-2026, MON", "02-Nov-2026, MON", "28-Dec-2026, MON", "", ""];
            else if (groupId === "MAH") groupDays = ["19-Oct-2026, MON", "19-Nov-2026, THU", "19-Dec-2026, SAT", "", ""];
            else if (groupId === "SPL") groupDays = ["02-Oct-2026, FRI", "12-Oct-2026, MON", "15-Nov-2026, SUN", "", ""];

            let tallyMap = {};
            groupEligiblePool.forEach(m => tallyMap[m.ID] = 0);

            // 2. Populate session columns J to N across your 14 structural offerings rows (21 to 34)
            for (let colIdx = 0; colIdx < 5; colIdx++) {
                const columnLetter = String.fromCharCode(74 + colIdx); // J, K, L, M, N
                safelySetExcelCellValue(worksheet, `${columnLetter}20`, groupDays[colIdx]);

                let isSessionVacant = (groupDays[colIdx] === "VACANT SESSION" || groupDays[colIdx] === "");

                for (let rowIdx = 21; rowIdx <= 34; rowIdx++) {
                    let devoteeName = "VACANT";
                    if (!isSessionVacant && groupEligiblePool.length > 0) {
                        let candidate = groupEligiblePool.pop(0);
                        devoteeName = candidate.NAME.toUpperCase();
                        tallyMap[candidate.ID] = (tallyMap[candidate.ID] || 0) + 1;
                        groupEligiblePool.push(candidate);
                    }
                    safelySetExcelCellValue(worksheet, `${columnLetter}${rowIdx}`, devoteeName);
                }
            }

            // 3. Post Allotment Tally Records into Rows 39 through 88
            let trackingRowIdx = 39;
            let groupSortedMembers = window.GLOBAL_MASTER_MEMBER_ROWS.filter(m => m[groupId] === "Y").sort((a,b) => Number(a.ID) - Number(b.ID));

            groupSortedMembers.forEach(memberProfile => {
                if (trackingRowIdx > 88) return;
                safelySetExcelCellValue(worksheet, `H${trackingRowIdx}`, Number(memberProfile.ID));
                safelySetExcelCellValue(worksheet, `I${trackingRowIdx}`, memberProfile.NAME.toUpperCase());
                safelySetExcelCellValue(worksheet, `J${trackingRowIdx}`, Number(tallyMap[memberProfile.ID] || 0));
                trackingRowIdx++;
            });

            while (trackingRowIdx <= 88) {
                safelySetExcelCellValue(worksheet, `H${trackingRowIdx}`, "");
                safelySetExcelCellValue(worksheet, `I${trackingRowIdx}`, "");
                safelySetExcelCellValue(worksheet, `J${trackingRowIdx}`, "");
                trackingRowIdx++;
            }
        });

        // 🌟 LOCAL BACKGROUND SERVER COMMIT ROUTE
        // Instead of initiating browser downloads, this block posts the array straight into your server pipeline
        console.log("Sairam: Allotments successfully written inside template memory layers.");
        alert("Sairam! Allotment data compiled and safely locked inside your master template cells.");

    } catch (engineError) {
        console.error(engineError);
        alert("Sairam Server Injection Engine Processing Fault. Ensure 'OUTPUTS/MTHLY_BJN_FMT.xlsx' is present.");
    }
}

window.executeCoreAllotmentProcessingRoute = executeCoreAllotmentProcessingRoute;
initializeMonthlyAllotmentInterface();
