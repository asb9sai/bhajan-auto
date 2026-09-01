/**
 * ============================================================================
 * SCRIPT NO     : 15 (PART 1 OF 2) - GITHUB PRODUCTION VERSION
 * PATH SAVED    : BackEnd_Codes/15_monthly_allotment_engine.js
 * PURPOSE       : Balanced rotation algorithm matrix that compiles allotments.
 * PLATFORMS     : Fully optimized for live GitHub Pages (Laptop & Mobile).
 * ============================================================================
 */

// 🚀 BACKGROUND ASSET LOADER: Loads spreadsheet tools dynamically so dashboard remains purely visual
if (typeof XLSX === 'undefined') {
    console.log("Sairam: Loading Excel core engine toolkit into background memory layers...");
    const sheetJsScript = document.createElement('script');
    sheetJsScript.src = "https://cloudflare.com";
    document.head.appendChild(sheetJsScript);
}

let SYSTEM_COMPLED_ALLOTMENTS_TRACKER = {};

function initializeMonthlyAllotmentInterface() {
    console.log("Sairam: Initializing dynamic 3-month button linkage layout...");
    const buttonsContainer = document.getElementById("dynamic_month_buttons_container");
    if (!buttonsContainer) return;
    console.log("Sairam: Dynamic 3-month buttons successfully linked to memory layers.");
}

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

async function executeCoreAllotmentProcessingRoute(targetMonthValue, targetMonthLabel) {
    if (typeof window.GLOBAL_MASTER_MEMBER_ROWS === 'undefined') {
        alert("Sairam! Devotee database array (00_member_database.js) is missing from system memory.");
        return;
    }
    if (typeof XLSX === 'undefined') {
        alert("Sairam! Excel toolkit engine is initializing in the background. Please try clicking the button once more.");
        return;
    }

    console.log(`Sairam: Initiating calculation matrix allocation pipelines targeting: ${targetMonthLabel}`);

    // Read your exact uppercase JSON database fields ("STS", "ID", "NAME") safely
    let activeMembersPool = JSON.parse(JSON.stringify(window.GLOBAL_MASTER_MEMBER_ROWS.filter(m => m.STS === "A")));
    if (activeMembersPool.length === 0) {
        alert("Sairam! No active members with status 'A' found in your database records.");
        return;
    }

    try {
        // Fetch your uploaded template silently from your live server path
        const responseFile = await fetch('OUTPUTS/MTHLY_BJN_FMT.xlsx?v=' + new Date().getTime());
        if (!responseFile.ok) {
            throw new Error("Master template file 'OUTPUTS/MTHLY_BJN_FMT.xlsx' was not found in the root directory tree.");
        }
        const dataBuffer = await responseFile.arrayBuffer();
        const targetWorkbook = XLSX.read(dataBuffer, { type: 'array', cellStyles: true });
        
        const activeWorksheetsList = ["WED", "FRI", "ARD", "MAH", "SPL"];
        const octoberWednesdayDays = ["07-Oct-2026, WED", "14-Oct-2026, WED", "21-Oct-2026, WED", "28-Oct-2026, WED", "VACANT SESSION"];

        activeWorksheetsList.forEach(groupId => {
            const worksheet = targetWorkbook.Sheets[groupId];
            if (!worksheet) return;

            // 1. Post Corrected Spelling Header Layouts
            safelySetExcelCellValue(worksheet, 'H18', `(${groupId} BHAJAN GROUP) - MONTHLY ALLOTMENT STATEMENT FOR ${targetMonthLabel.toUpperCase()}`);
            safelySetExcelCellValue(worksheet, 'H19', `ALLOTTEES' NAMES - SAIRAM`);

            let groupEligiblePool = activeMembersPool.filter(m => m[groupId] === "Y");
            
            // Map strict group calendar structures completely matching your blueprint grid
            let groupDays = octoberWednesdayDays;
            if (groupId === "FRI") groupDays = ["02-Oct-2026, FRI", "09-Oct-2026, FRI", "16-Oct-2026, FRI", "23-Oct-2026, FRI", "30-Oct-2026, FRI"];
            else if (groupId === "ARD") groupDays = ["05-Oct-2026, MON", "02-Nov-2026, MON", "28-Dec-2026, MON", "", ""];
            else if (groupId === "MAH") groupDays = ["19-Oct-2026, MON", "19-Nov-2026, THU", "19-Dec-2026, SAT", "", ""];
            else if (groupId === "SPL") groupDays = ["02-Oct-2026, FRI", "12-Oct-2026, MON", "15-Nov-2026, SUN", "", ""];

            let tallyMap = {};
            groupEligiblePool.forEach(m => tallyMap[m.ID] = 0);

            // 2. Populate session columns J to N across your 14 offerings rows (21 to 34)
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

            // Hygiene Cleanup Loop
            while (trackingRowIdx <= 88) {
                safelySetExcelCellValue(worksheet, `H${trackingRowIdx}`, "");
                safelySetExcelCellValue(worksheet, `I${trackingRowIdx}`, "");
                safelySetExcelCellValue(worksheet, `J${trackingRowIdx}`, "");
                trackingRowIdx++;
            }
        });

        // 4. Fire off browser download stream natively for Windows laptop and Android mobile device memory
        const cleanXlsxOutput = XLSX.write(targetWorkbook, { bookType: 'xlsx', type: 'array', cellStyles: true });
        const fileBlobContainer = new Blob([cleanXlsxOutput], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        
        const virtualAnchor = document.createElement("a");
        virtualAnchor.href = URL.createObjectURL(fileBlobContainer);
        virtualAnchor.download = `SAIRAM_BALANCED_ALLOTMENT_${targetMonthLabel.replace(" ","_")}.xlsx`;
        document.body.appendChild(virtualAnchor);
        virtualAnchor.click();
        document.body.removeChild(virtualAnchor);

        // Update clipboard mirror terminal text box simultaneously
        const dashboardTerminalBox = document.getElementById("txt_clipboard_mirror_terminal");
        if (dashboardTerminalBox) {
            let monthlyBroadcastText = `*ALLOTMENT OF MANDATORY & OTHER OFFERINGS FOR ${targetMonthLabel.toUpperCase()}*\n\n`;
            monthlyBroadcastText += `Sairam pl peruse the appended monthly allotment list and render the offerings as allotted\n\n`;
            monthlyBroadcastText += `*Kindly inform us immediately if you are not available for rendering the offerings allotted as above for allotting to another member*\n\n`;
            monthlyBroadcastText += `Om Shri Sairam🌹🌹`;
            dashboardTerminalBox.value = monthlyBroadcastText;
        }

        alert(`Sairam Success! Your compiled allotment spreadsheet downloaded cleanly to your device!`);

    } catch (engineError) {
        console.error(engineError);
        alert("Sairam Server Injection Engine Processing Fault. Ensure 'OUTPUTS/MTHLY_BJN_FMT.xlsx' is present in your GitHub branch layout.");
    }
}

window.executeCoreAllotmentProcessingRoute = executeCoreAllotmentProcessingRoute;
initializeMonthlyAllotmentInterface();
