/**
 * ============================================================================
 * SCRIPT NO     : 15 (PART 1 OF 2) - GITHUB PRODUCTION VERSION
 * PATH SAVED    : BackEnd_Codes/15_monthly_allotment_engine.js
 * PURPOSE       : Balanced rotation algorithm matrix that compiles allotments.
 * PLATFORMS     : Fully optimized for live GitHub Pages (Laptop & Mobile).
 * ============================================================================
 */

// 🚀 NATIVE MOBILE-COMPATIBLE SPREADSHEET ENGINE
// Fully self-contained layout generator that requires no external file loads!
let SYSTEM_COMPLED_ALLOTMENTS_TRACKER = {};

function initializeMonthlyAllotmentInterface() {
    console.log("Sairam: Initializing dynamic 3-month button linkage layout...");
    const buttonsContainer = document.getElementById("dynamic_month_buttons_container");
    if (!buttonsContainer) return;
    console.log("Sairam: Dynamic 3-month buttons successfully linked to memory layers.");
}

function executeCoreAllotmentProcessingRoute(targetMonthValue, targetMonthLabel) {
    if (typeof window.GLOBAL_MASTER_MEMBER_ROWS === 'undefined') {
        alert("Sairam! Devotee database array (00_member_database.js) is missing from system memory.");
        return;
    }

    console.log(`Sairam: Initiating calculation matrix allocation pipelines targeting: ${targetMonthLabel}`);

    // Read your exact uppercase JSON database fields ("STS", "ID", "NAME") safely
    let activeMembersPool = JSON.parse(JSON.stringify(window.GLOBAL_MASTER_MEMBER_ROWS.filter(m => m.STS === "A")));
    if (activeMembersPool.length === 0) {
        alert("Sairam! No active members with status 'A' found in your database records.");
        return;
    }

    const activeWorksheetsList = ["WED", "FRI", "ARD", "MAH", "SPL"];
    const octoberWednesdayDays = ["07-Oct-2026, WED", "14-Oct-2026, WED", "21-Oct-2026, WED", "28-Oct-2026, WED", "VACANT SESSION"];

    // 🌟 HTML-SPREADHEET FORMAT ENGINES: Generates an XML structure that all phones and laptops open in Excel natively
    let spreadsheetDataContent = 'xmlns:x="urn:schemas-microsoft-com:office:excel" ';
    spreadsheetDataContent += 'xmlns="http://w3.org">\n<head><meta charset="utf-8">\n<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>';
    
    activeWorksheetsList.forEach(sheetId => {
        spreadsheetDataContent += `<x:ExcelWorksheet><x:Name>${sheetId}</x:Name><x:WorksheetSource/></x:ExcelWorksheet>`;
    });
    spreadsheetDataContent += '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>\n<body>';

    activeWorksheetsList.forEach(groupId => {
        let groupEligiblePool = activeMembersPool.filter(m => m[groupId] === "Y");
        let groupDays = octoberWednesdayDays;
        
        if (groupId === "FRI") groupDays = ["02-Oct-2026, FRI", "09-Oct-2026, FRI", "16-Oct-2026, FRI", "23-Oct-2026, FRI", "30-Oct-2026, FRI"];
        else if (groupId === "ARD") groupDays = ["05-Oct-2026, MON", "02-Nov-2026, MON", "28-Dec-2026, MON", "", ""];
        else if (groupId === "MAH") groupDays = ["19-Oct-2026, MON", "19-Nov-2026, THU", "19-Dec-2026, SAT", "", ""];
        else if (groupId === "SPL") groupDays = ["02-Oct-2026, FRI", "12-Oct-2026, MON", "15-Nov-2026, SUN", "", ""];

        let tallyMap = {};
        groupEligiblePool.forEach(m => tallyMap[m.ID] = 0);

        spreadsheetDataContent += `<table border="1">\n<tr><th colspan="6" style="background-color:#ffe699;font-weight:bold;">(${groupId} BHAJAN GROUP) - MONTHLY ALLOTMENT STATEMENT FOR ${targetMonthLabel.toUpperCase()}</th></tr>\n`;
        spreadsheetDataContent += `<tr><th colspan="6" style="font-weight:bold;text-align:center;">ALLOTTEES' NAMES - SAIRAM</th></tr>\n`;
        spreadsheetDataContent += '<tr><th style="background-color:#d9d9d9;">#</th><th style="background-color:#d9d9d9;">OFFERINGS</th>';
        
        for (let i = 0; i < 5; i++) {
            spreadsheetDataContent += `<th style="background-color:#cfdfec;">${groupDays[i]}</th>`;
        }
        spreadsheetDataContent += '</tr>\n';

        const offeringsLabels = [
            "GANESH BHAJAN", "GURU BHAJAN", "DEVI BHAJAN", "SARVA DHARMA BHAJAN", "RAMAR BHAJAN",
            "KRISHNAR BHAJAN", "SHIVA BHAJAN", "BHAJAN ON SWAMI", "VITTHALA BHAJAN",
            "NARAYANA / HARI / GOVINDA BHAJAN", "AYYAPPA BHAJAN", "HANUMAR BHAJAN", "SUBRAMANYAM", "AARTHI & VM"
        ];

        offeringsLabels.forEach((offeringText, rowIdx) => {
            spreadsheetDataContent += `<tr><td>${rowIdx + 1}</td><td style="font-weight:bold;">${offeringText}</td>`;
            
            for (let colIdx = 0; colIdx < 5; colIdx++) {
                let isSessionVacant = (groupDays[colIdx] === "VACANT SESSION" || groupDays[colIdx] === "");
                let assignedName = "VACANT";
                
                if (!isSessionVacant && groupEligiblePool.length > 0) {
                    let candidate = groupEligiblePool.pop(0);
                    assignedName = candidate.NAME.toUpperCase();
                    tallyMap[candidate.ID] = (tallyMap[candidate.ID] || 0) + 1;
                    groupEligiblePool.push(candidate);
                }
                spreadsheetDataContent += `<td>${assignedName}</td>`;
            }
            spreadsheetDataContent += '</tr>\n';
        });

        // Add spacing before Allotment Details registry section rows
        spreadsheetDataContent += '<tr><td colspan="6" style="border:none;height:20px;"></td></tr>\n';
        spreadsheetDataContent += '<tr><th style="background-color:#ffe699;">ID</th><th colspan="3" style="background-color:#ffe699;">MEMBERS\' NAME - SAIRAM</th><th colspan="2" style="background-color:#ffe699;">NO OF SLOTS ALLOTTED</th></tr>\n';

        let groupSortedMembers = window.GLOBAL_MASTER_MEMBER_ROWS.filter(m => m[groupId] === "Y").sort((a, b) => Number(a.ID) - Number(b.ID));
        groupSortedMembers.forEach(memberProfile => {
            let mCount = tallyMap[memberProfile.ID] || 0;
            spreadsheetDataContent += `<tr><td>${memberProfile.ID}</td><td colspan="3">${memberProfile.NAME.toUpperCase()}</td><td colspan="2" align="center">${mCount}</td></tr>\n`;
        });

        spreadsheetDataContent += '</table>\n<br><br>\n';
    });

    spreadsheetDataContent += '</body>\n</html>';

    // 🚀 STABLE CROSS-PLATFORM DOWNLOAD STREAM TRIGGER (FOR WINDOWS LAPTOP & ANDROID PHONES)
    const fileBlobContainer = new Blob([spreadsheetDataContent], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const virtualAnchor = document.createElement("a");
    virtualAnchor.href = URL.createObjectURL(fileBlobContainer);
    virtualAnchor.download = `SAIRAM_BALANCED_ALLOTMENT_${targetMonthLabel.replace(" ", "_")}.xls`;
    document.body.appendChild(virtualAnchor);
    virtualAnchor.click();
    document.body.removeChild(virtualAnchor);

    // Update clipboard mirror terminal text box simultaneously
    const dashboardTerminalBox = document.getElementById("txt_clipboard_mirror_terminal");
    if (dashboardTerminalBox) {
        let monthlyBroadcastText = `*ALLOTMENT OF MANDATORY & OTHER OFFERINGS FOR ${targetMonthLabel.toUpperCase()}*\n\n`;
        monthlyBroadcastText += `Sairam pl peruse the appended monthly allotment list and render the offerings as allotted\n\n`;
        monthlyBroadcastText += `Om Shri Sairam🌹🌹`;
        dashboardTerminalBox.value = monthlyBroadcastText;
    }

    alert(`Sairam Success! Your compiled allotment spreadsheet downloaded cleanly to your device!`);
}

window.executeCoreAllotmentProcessingRoute = executeCoreAllotmentProcessingRoute;
initializeMonthlyAllotmentInterface();
