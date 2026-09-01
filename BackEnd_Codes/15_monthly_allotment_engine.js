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

function executeCoreAllotmentProcessingRoute(targetMonthValue, targetMonthLabel) {
    if (typeof window.GLOBAL_MASTER_MEMBER_ROWS === 'undefined') {
        alert("Sairam! Devotee database array (00_member_database.js) is missing from system memory.");
        return;
    }

    // Filter strictly for active members using your exact uppercase JSON keys
    let activeMembersPool = JSON.parse(JSON.stringify(window.GLOBAL_MASTER_MEMBER_ROWS.filter(m => m.STS === "A")));
    if (activeMembersPool.length === 0) {
        alert("Sairam! No active members with status 'A' found in your database records.");
        return;
    }

    const activeWorksheetsList = ["WED", "FRI", "ARD", "MAH", "SPL"];
    const octoberWednesdayDays = ["07-Oct-2026, WED", "14-Oct-2026, WED", "21-Oct-2026, WED", "28-Oct-2026, WED", "VACANT SESSION"];

    // Native self-contained HTML-Spreadsheet layout engine (No external files needed!)
    let excelContent = 'xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://w3.org">\n<head><meta charset="utf-8">\n<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>';
    activeWorksheetsList.forEach(sheetId => {
        excelContent += `<x:ExcelWorksheet><x:Name>${sheetId}</x:Name><x:WorksheetSource/></x:ExcelWorksheet>`;
    });
    excelContent += '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>\n<body>';

    activeWorksheetsList.forEach(groupId => {
        let groupEligiblePool = activeMembersPool.filter(m => m[groupId] === "Y");
        let groupDays = octoberWednesdayDays;
        
        if (groupId === "FRI") groupDays = ["02-Oct-2026, FRI", "09-Oct-2026, FRI", "16-Oct-2026, FRI", "23-Oct-2026, FRI", "30-Oct-2026, FRI"];
        else if (groupId === "ARD") groupDays = ["05-Oct-2026, MON", "02-Nov-2026, MON", "28-Dec-2026, MON", "", ""];
        else if (groupId === "MAH") groupDays = ["19-Oct-2026, MON", "19-Nov-2026, THU", "19-Dec-2026, SAT", "", ""];
        else if (groupId === "SPL") groupDays = ["02-Oct-2026, FRI", "12-Oct-2026, MON", "15-Nov-2026, SUN", "", ""];

        let tallyMap = {};
        groupEligiblePool.forEach(m => tallyMap[m.ID] = 0);

        excelContent += `<table border="1">\n<tr><th colspan="6" style="background-color:#ffe699;font-weight:bold;">(${groupId} BHAJAN GROUP) - MONTHLY ALLOTMENT STATEMENT FOR ${targetMonthLabel.toUpperCase()}</th></tr>\n`;
        excelContent += `<tr><th colspan="6" style="font-weight:bold;text-align:center;">ALLOTTEES' NAMES - SAIRAM</th></tr>\n`;
        excelContent += '<tr><th style="background-color:#d9d9d9;">#</th><th style="background-color:#d9d9d9;">OFFERINGS</th>';
        
        for (let i = 0; i < 5; i++) {
            excelContent += `<th style="background-color:#cfdfec;">${groupDays[i]}</th>`;
        }
        excelContent += '</tr>\n';

        const offeringsLabels = [
            "GANESH BHAJAN", "GURU BHAJAN", "DEVI BHAJAN", "SARVA DHARMA BHAJAN", "RAMAR BHAJAN",
            "KRISHNAR BHAJAN", "SHIVA BHAJAN", "BHAJAN ON SWAMI", "VITTHALA BHAJAN",
            "NARAYANA / HARI / GOVINDA BHAJAN", "AYYAPPA BHAJAN", "HANUMAR BHAJAN", "SUBRAMANYAM", "AARTHI & VM"
        ];

        offeringsLabels.forEach((offeringText, rowIdx) => {
            excelContent += `<tr><td>${rowIdx + 1}</td><td style="font-weight:bold;">${offeringText}</td>`;
            
            for (let colIdx = 0; colIdx < 5; colIdx++) {
                let isSessionVacant = (groupDays[colIdx] === "VACANT SESSION" || groupDays[colIdx] === "");
                let assignedName = "VACANT";
                
                if (!isSessionVacant && groupEligiblePool.length > 0) {
                    let candidate = groupEligiblePool.pop(0);
                    assignedName = candidate.NAME.toUpperCase();
                    tallyMap[candidate.ID] = (tallyMap[candidate.ID] || 0) + 1;
                    groupEligiblePool.push(candidate);
                }
                excelContent += `<td>${assignedName}</td>`;
            }
            excelContent += '</tr>\n';
        });

        excelContent += '<tr><td colspan="6" style="border:none;height:20px;"></td></tr>\n';
        excelContent += '<tr><th style="background-color:#ffe699;">ID</th><th colspan="3" style="background-color:#ffe699;">MEMBERS\' NAME - SAIRAM</th><th colspan="2" style="background-color:#ffe699;">NO OF SLOTS ALLOTTED</th></tr>\n';

        let groupSortedMembers = window.GLOBAL_MASTER_MEMBER_ROWS.filter(m => m[groupId] === "Y").sort((a, b) => Number(a.ID) - Number(b.ID));
        groupSortedMembers.forEach(memberProfile => {
            let mCount = tallyMap[memberProfile.ID] || 0;
            excelContent += `<tr><td>${memberProfile.ID}</td><td colspan="3">${memberProfile.NAME.toUpperCase()}</td><td colspan="2" align="center">${mCount}</td></tr>\n`;
        });

        excelContent += '</table>\n<br><br>\n';
    });

    excelContent += '</body>\n</html>';

    // Instant download link trigger for laptop and mobile memory
    const fileBlobContainer = new Blob([excelContent], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const virtualAnchor = document.createElement("a");
    virtualAnchor.href = URL.createObjectURL(fileBlobContainer);
    virtualAnchor.download = `SAIRAM_BALANCED_ALLOTMENT_${targetMonthLabel.replace(" ", "_")}.xls`;
    document.body.appendChild(virtualAnchor);
    virtualAnchor.click();
    document.body.removeChild(virtualAnchor);

    // Populate the dashboard terminal text box
    const dashboardTerminalBox = document.getElementById("txt_clipboard_mirror_terminal");
    if (dashboardTerminalBox) {
        let monthlyBroadcastText = `*ALLOTMENT OF MANDATORY & OTHER OFFERINGS FOR ${targetMonthLabel.toUpperCase()}*\n\n`;
        monthlyBroadcastText += `Sairam pl peruse the appended monthly allotment list and render the offerings as allotted\n\n`;
        monthlyBroadcastText += `Om Shri Sairam🌹🌹`;
        dashboardTerminalBox.value = monthlyBroadcastText;
    }

    alert(`Sairam Success! Your compiled spreadsheet has downloaded cleanly!`);
}

window.executeCoreAllotmentProcessingRoute = executeCoreAllotmentProcessingRoute;
initializeMonthlyAllotmentInterface();
