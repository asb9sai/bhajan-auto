/**
 * ============================================================================
 * SCRIPT NO     : 14
 * SCRIPT NAME   : 14_process_final_list.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Activity H - Compiles assignments. Prints Part 3 general
 *                 offerings strictly in dynamic chronological posting order.
 *                 Handles dynamic Satsang, Semi-Mandatory, and Fortune Wheel
 *                 toggles automatically with continuous layout numbering.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const finalListBtn = document.getElementById("btn_final_list_process");
    if (finalListBtn) {
        finalListBtn.addEventListener("click", () => {
            generateFinalListText();
        });
    }
});

function generateFinalListText() {
    if (!CURRENTLY_SELECTED_GROUP) {
        alert("Sairam! Please select a Bhajan Group first.");
        return;
    }

    const targetGroup = BHAJAN_GROUPS_CONFIG.find(g => g.id === CURRENTLY_SELECTED_GROUP);
    const groupName = targetGroup ? targetGroup.name : CURRENTLY_SELECTED_GROUP;
    const sessionStartTime = targetGroup ? targetGroup.startTime : "3.40 PM";
    const linkOpeningTime = targetGroup ? targetGroup.openTime : "3.35 PM";

    const dateDropdown = document.getElementById(`select_date_${CURRENTLY_SELECTED_GROUP.toLowerCase()}`);
    let sessionDateLabel = "DD-MMM-YYYY, DDD";
    if (dateDropdown && dateDropdown.options[dateDropdown.selectedIndex]) {
        sessionDateLabel = dateDropdown.options[dateDropdown.selectedIndex].text;
    }

    let finalOutput = `*(${groupName.toUpperCase()}) - LIST OF OFFERINGS FOR OUR BHAJAN ON ${sessionDateLabel.toUpperCase()}*\n\n`;
    finalOutput += `Sairam we furnish below the list of offerings for our upcoming session :\n\n`;

    const fixedOfferingsBlueprint = [
        { num: 1, label: "3 OMs & BHAJAN ON GANESH", type: "M" },
        { num: 2, label: "BHAJAN ON GURU BHAGWAN", type: "M" },
        { num: 3, label: "BHAJAN ON GODDESS DEVI MAA", type: "M" },
        { num: 4, label: "SARVA DHARMA BHAJAN", type: "M" },
        { num: 5, label: "BHAJAN ON LORD RAMAR", type: "S" },
        { num: 6, label: "BHAJAN ON LORD KRISHNAR", type: "S" },
        { num: 7, label: "BHAJAN ON LORD SHIVA", type: "S" },
        { num: 8, label: "BHAJAN ON OUR DEAR SWAMI", type: "S" },
        { num: 9, label: "BHAJAN ON LORD VITTHALA", type: "S" },
        { num: 10, label: "BHAJAN ON NARAYANA / HARI / GOVINDA", type: "S" },
        { num: 11, label: "BHAJAN ON SWAMI AYYAPPAN", type: "S" },
        { num: 12, label: "BHAJAN ON LORD HANUMAR", type: "M" },
        { num: 13, label: "BHAJAN ON LORD SUBRAMANYAR", type: "M" },
        { num: 14, label: "MANGALA AARTHI & VIB MANTRA", type: "M" }
    ];

    // Read all operational control dropdown toggles directly from UI dashboard
    const satsangDropdown = document.getElementById("select_satsang_option");
    const isSatsangActive = satsangDropdown && satsangDropdown.value === "Y";

    const semiMandDropdown = document.getElementById("select_semimandatory_option");
    const isSemiMandatoryActive = semiMandDropdown ? semiMandDropdown.value === "Y" : true;

    const fortuneWheelDropdown = document.getElementById("select_fortune_wheel_option");
    const isFortuneWheelActive = fortuneWheelDropdown ? fortuneWheelDropdown.value === "Y" : true;

    let continuousRowCounter = 1;

    // --- STEP 1: RENDER INITIAL MANDATORY OFFERINGS (SLOTS 1 - 4) ---
    fixedOfferingsBlueprint.slice(0, 4).forEach(offering => {
        finalOutput += buildFixedRowOutputLine(offering.num, offering.label, continuousRowCounter);
        continuousRowCounter++;
    });

    // --- STEP 2: RENDER SEMI-MANDATORY OFFERINGS (SLOTS 5 - 11) IF ACTIVE ---
    if (!isSatsangActive && isSemiMandatoryActive) {
        fixedOfferingsBlueprint.slice(4, 11).forEach(offering => {
            finalOutput += buildFixedRowOutputLine(offering.num, offering.label, continuousRowCounter);
            continuousRowCounter++;
        });
    }

    // --- EXTRACT ACTIVE GENERAL PARTICIPANT DATA FROM SCREEN LAYOUT ---
    let activeGeneralOfferingsPool = [];
    const part3MaxRowsCount = 15;
    for (let i = 1; i <= part3MaxRowsCount; i++) {
        const genMemberLabel = document.getElementById(`lbl_part3_member_name_${i}`);
        const genAttendanceSelect = document.getElementById(`select_part3_attendance_${i}`);
        const genLyricsInput = document.getElementById(`input_part3_lyrics_${i}`);

        if (genMemberLabel && genMemberLabel.innerText.trim() !== "") {
            const memberNameText = genMemberLabel.innerText.trim().toUpperCase();
            const isMemberPresent = genAttendanceSelect ? genAttendanceSelect.value === "Y" : false;
            const generalLyricsText = genLyricsInput && genLyricsInput.value ? genLyricsInput.value.trim().toUpperCase() : "";

            if (isMemberPresent && generalLyricsText !== "") {
                activeGeneralOfferingsPool.push({ name: memberNameText, lyrics: generalLyricsText });
            }
        }
    }

    // --- STEP 3: RENDER GENERAL ENTRIES & OPTIONAL SATSANG MATRIX CODES ---
    if (isSatsangActive) {
        // Rule: Force exactly 5 slots (Numbered 5, 6, 7, 8, 9) before Satsang
        for (let slotIdx = 0; slotIdx < 5; slotIdx++) {
            if (slotIdx < activeGeneralOfferingsPool.length) {
                const item = activeGeneralOfferingsPool[slotIdx];
                finalOutput += `${continuousRowCounter}. ${item.name} SAIRAM - ${item.lyrics}\n`;
            } else {
                finalOutput += `${continuousRowCounter}. VOLUNTEER SAIRAM - OPEN SLOT\n`;
            }
            continuousRowCounter++;
        }

        // Rule: Lock down position number 10 permanently for Satsang
        finalOutput += `10. SATSANG BY EMINENT PERSONS\n`;
        continuousRowCounter = 11;

        // Rule: Output any remaining general offerings starting from index 11 onwards
        if (activeGeneralOfferingsPool.length > 5) {
            for (let slotIdx = 5; slotIdx < activeGeneralOfferingsPool.length; slotIdx++) {
                const item = activeGeneralOfferingsPool[slotIdx];
                finalOutput += `${continuousRowCounter}. ${item.name} SAIRAM - ${item.lyrics}\n`;
                continuousRowCounter++;
            }
        }
    } else {
        // Standard Execution Flow: Output all captured general entries sequentially
        activeGeneralOfferingsPool.forEach(item => {
            finalOutput += `${continuousRowCounter}. ${item.name} SAIRAM - ${item.lyrics}\n`;
            continuousRowCounter++;
        });
    }

    // --- STEP 4: INJECT SWAMI'S CHOICE (FORTUNE WHEEL) IF APPLICABLE ---
    if (!isSatsangActive && isFortuneWheelActive) {
        finalOutput += `${continuousRowCounter}. SWAMI'S CHOICE (FORTUNE WHEEL SELECTION)\n`;
        continuousRowCounter++;
    }

    // --- STEP 5: RENDER ANCHOR CLOSING MANDATORY OFFERINGS (SLOTS 12 - 14) ---
    finalOutput += buildFixedRowOutputLine(12, "BHAJAN ON LORD HANUMAR", continuousRowCounter);
    continuousRowCounter++;

    finalOutput += buildFixedRowOutputLine(13, "BHAJAN ON LORD SUBRAMANYAR", continuousRowCounter);
    continuousRowCounter++;

    finalOutput += buildFixedRowOutputLine(14, "MANGALA AARTHI & VIB MANTRA", continuousRowCounter);

    // --- STEP 6: APPEND METADATA LAYERS ---
    const googleMeetUrl = "https://google.com";
    finalOutput += `\nSession will start at ${sessionStartTime} *with GANESH BHAJAN*\n\n`;
    finalOutput += `Bhajan link is ${googleMeetUrl}. Link will open at ${linkOpeningTime.toLowerCase()}\n\n`;
    finalOutput += `Pl join Sairam.`;

    executeFinalListClipboardAction(finalOutput);
}

/**
 * Helper abstraction to safely compile data columns from UI into a formatted string line
 */
function buildFixedRowOutputLine(blueprintRowId, fallbackLabel, activeDisplayRowNumber) {
    const singerInput = document.getElementById(`input_allottee_row_${blueprintRowId}`);
    const attendanceSelect = document.getElementById(`select_attendance_row_${blueprintRowId}`);
    const alternateSingerInput = document.getElementById(`input_alternate_row_${blueprintRowId}`);
    const lyricsInput = document.getElementById(`input_lyrics_row_${blueprintRowId}`);

    // Standard fallback strings if inputs are left untouched
    let defaultSinger = "VOLUNTEER";
    if (blueprintRowId === 14) defaultSinger = "TOGETHER";

    const singerName = singerInput && singerInput.value ? singerInput.value.trim().toUpperCase() : defaultSinger;
    const isPresent = attendanceSelect ? attendanceSelect.value === "Y" : true;
    const alternateSinger = alternateSingerInput && alternateSingerInput.value ? alternateSingerInput.value.trim().toUpperCase() : "";
    const bhajanOrLyricsTitle = lyricsInput && lyricsInput.value ? lyricsInput.value.trim().toUpperCase() : fallbackLabel;

    let finalSingerLabel = singerName;
    if (!isPresent && alternateSinger !== "") finalSingerLabel = alternateSinger;

    return `${activeDisplayRowNumber}. ${finalSingerLabel} SAIRAM - ${bhajanOrLyricsTitle}\n`;
}

function executeFinalListClipboardAction(textPayload) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textPayload).then(() => {
            alert("Sairam! Final List announcement copied cleanly.");
        });
    }
}
