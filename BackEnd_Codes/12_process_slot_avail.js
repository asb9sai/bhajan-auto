/**
 * ============================================================================
 * SCRIPT NO     : 12
 * SCRIPT NAME   : 12_process_slot_avail.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Activity G - Sweeps the dashboard for unassigned slots or
 *                 absentee slots. RESTRICTED STRICTLY to Mandatory rows.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const slotAvailBtn = document.getElementById(
        "btn_slot_avail_process"
    );
    if (slotAvailBtn) {
        slotAvailBtn.addEventListener("click", () => {
            generateSlotAvailableText();
        });
    }
});

function generateSlotAvailableText() {
    if (!CURRENTLY_SELECTED_GROUP) {
        alert("Sairam! Please select a Bhajan Group first.");
        return;
    }

    const dateDropdown = document.getElementById(
        `select_date_${CURRENTLY_SELECTED_GROUP.toLowerCase()}`
    );
    let sessionFullDateLabel = "DD-MMM, DDD";
    if (dateDropdown && dateDropdown.options[dateDropdown.selectedIndex]) {
        sessionFullDateLabel = dateDropdown.options[dateDropdown.selectedIndex].text;
    }

    // Format the date label structure safely by removing the year element
    let shortDateLabel = sessionFullDateLabel.replace(/,\s*\d{4}/, ""); 

    let slotOutput = `*🕉️ SLOT/S AVAILABLE SAIRAM 🕉️*\n`;
    slotOutput += `****************************************\n\n`;
    slotOutput += `Loving Sairam to all. Sairam the following ` +
        `mandatory offering/s is / are available :\n\n`;
    slotOutput += `DATE          OFFERING/S NAME(S)\n`;
    slotOutput += `---------     -----------------------------------\n`;

    const mandatoryOfferingsMatrix = [
        { num: 1, label: "3 OMs & BHAJAN ON GANESH" },
        { num: 2, label: "BHAJAN ON GURU BHAGWAN" },
        { num: 3, label: "BHAJAN ON GODDESS DEVI MAA" },
        { num: 4, label: "SARVA DHARMA BHAJAN" },
        { num: 12, label: "BHAJAN ON LORD HANUMAR" },
        { num: 13, label: "BHAJAN ON LORD SUBRAMANYAR" },
        { num: 14, label: "MANGALA AARTHI & VIB MANTRA" }
    ];

    let foundVacanciesCount = 0;

    mandatoryOfferingsMatrix.forEach(item => {
        const nameInputElement = document.getElementById(
            `input_allottee_row_${item.num}`
        );
        const attendanceSelect = document.getElementById(
            `select_attendance_row_${item.num}`
        );
        
        const rawNameVal = nameInputElement ? 
              nameInputElement.value.trim().toUpperCase() : "";
        const isPresentCode = attendanceSelect ? 
              attendanceSelect.value === "Y" : true;

        // AUTOMATION UPDATE: A slot is vacant if blank, placeholder, OR attendance is N
        const isCellBlank = (rawNameVal === "" || rawNameVal.includes("(NAME)"));
        const isMemberAbsent = (!isPresentCode);

        if (isCellBlank || isMemberAbsent) {
            const paddedDateCol = shortDateLabel.toUpperCase().padEnd(13, ' ');
            slotOutput += `${paddedDateCol} ${item.label}\n`;
            foundVacanciesCount++;
        }
    });

    if (foundVacanciesCount === 0) {
        alert("Sairam! No vacant MANDATORY slots detected on your panel.");
        return;
    }

    slotOutput += `\n*Pl volunteer Sairam*\n\n`;
    slotOutput += `Om Shri Sairam 🙏 🙏 🙏`;

    executeSlotClipboardAction(slotOutput);
}

function executeSlotClipboardAction(textPayload) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textPayload)
            .then(() => {
                alert("Sairam! Slot Available text successfully copied.");
            })
            .catch(() => {
                fallbackSlotCopy(textPayload);
            });
    } else {
        fallbackSlotCopy(textPayload);
    }
}

function fallbackSlotCopy(textPayload) {
    const backupTextArea = document.createElement("textarea");
    backupTextArea.value = textPayload;
    backupTextArea.style.position = "fixed";
    document.body.appendChild(backupTextArea);
    backupTextArea.focus();
    backupTextArea.select();
    try {
        document.execCommand('copy');
        alert("Sairam! Slot Available text successfully copied.");
    } catch (err) {
        alert("Sairam! Clipboard write action encountered a failure.");
    }
    document.body.removeChild(backupTextArea);
}
