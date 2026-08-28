/**
 * ============================================================================
 * SCRIPT NO     : 10
 * SCRIPT NAME   : 10_process_checklist.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Activity D - Assembles the Checklist text blueprint template.
 *                 Ensures serial numbers change dynamically based on visible items.
 *                 Fully handles Satsang, Semi-Mandatory, Fortune Wheel, and 
 *                 Part 3 General Offering layers with continuous indexing.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const checklistBtn = document.getElementById("btn_checklist_process");
    if (checklistBtn) {
        checklistBtn.addEventListener("click", () => {
            generateChecklistText();
        });
    }
});

/**
 * Translates active dashboard data into a beautifully formatted dynamic checklist.
 */
function generateChecklistText() {
    if (!CURRENTLY_SELECTED_GROUP) {
        alert("Sairam! Please select a Bhajan Group first.");
        return;
    }

    // 1. Fetch group context values dynamically
    const targetGroup = BHAJAN_GROUPS_CONFIG.find(g => g.id === CURRENTLY_SELECTED_GROUP);
    const groupName = targetGroup ? targetGroup.name : CURRENTLY_SELECTED_GROUP;

    // 2. Fetch active dropdown session date text labels
    const dateDropdown = document.getElementById(`select_date_${CURRENTLY_SELECTED_GROUP.toLowerCase()}`);
    let sessionDateLabel = "DD-MMM-YYYY, DDD";
    if (dateDropdown && dateDropdown.options[dateDropdown.selectedIndex]) {
        sessionDateLabel = dateDropdown.options[dateDropdown.selectedIndex].text;
    }

    // 3. Read all operational control dropdown toggles directly from UI dashboard
    const satsangDropdown = document.getElementById("select_satsang_option");
    const isSatsangActive = satsangDropdown && satsangDropdown.value === "Y";

    const semiMandDropdown = document.getElementById("select_semimandatory_option");
    const isSemiMandatoryActive = semiMandDropdown ? semiMandDropdown.value === "Y" : true;

    const fortuneWheelDropdown = document.getElementById("select_fortune_wheel_option");
    const isFortuneWheelActive = fortuneWheelDropdown ? fortuneWheelDropdown.value === "Y" : true;

    // 4. Construct Header blocks exactly as shown in your layout matrix
    let checklistOutput = `*(${groupName.toUpperCase()}) - CHECKLIST FOR OUR BHAJAN ON ${sessionDateLabel.toUpperCase()}*\n\n`;
    checklistOutput += `Sairam pls peruse the following list and alert us immediately for any corrections :\n\n`;

    // 5. Array layout mapping out structural checklist rows definitions
    const baseOfferingsLayout = [
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

    let sequentialRowCounter = 1;

    // --- STEP A: RENDER INITIAL MANDATORY OFFERINGS (SLOTS 1 - 4) ---
    baseOfferingsLayout.slice(0, 4).forEach(item => {
        checklistOutput += buildChecklistRowLine(item.num, item.label, sequentialRowCounter);
        sequentialRowCounter++;
    });

    // --- STEP B: RENDER SEMI-MANDATORY OFFERINGS (SLOTS 5 - 11) IF ACTIVE ---
    if (!isSatsangActive && isSemiMandatoryActive) {
        baseOfferingsLayout.slice(4, 11).forEach(item => {
            checklistOutput += buildChecklistRowLine(item.num, item.label, sequentialRowCounter);
            sequentialRowCounter++;
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

    // --- STEP C: RENDER GENERAL ENTRIES & OPTIONAL SATSANG LAYOUT CHECKS ---
    if (isSatsangActive) {
        // Rule: Force exactly 5 slots (Numbered 05, 06, 07, 08, 09) before Satsang
        for (let slotIdx = 0; slotIdx < 5; slotIdx++) {
            const paddedIdx = String(sequentialRowCounter).padStart(2, '0');
            if (slotIdx < activeGeneralOfferingsPool.length) {
                const item = activeGeneralOfferingsPool[slotIdx];
                checklistOutput += `${paddedIdx}. ${item.name} SAIRAM - ${item.lyrics}\n`;
            } else {
                checklistOutput += `${paddedIdx}. VOLUNTEER SAIRAM - OPEN SLOT\n`;
            }
            sequentialRowCounter++;
        }

        // Rule: Lock down position number 10 permanently for Satsang
        checklistOutput += `10. SATSANG BY EMINENT PERSONS\n`;
        sequentialRowCounter = 11;

        // Rule: Output any remaining general offerings starting from index 11 onwards
        if (activeGeneralOfferingsPool.length > 5) {
            for (let slotIdx = 5; slotIdx < activeGeneralOfferingsPool.length; slotIdx++) {
                const paddedIdx = String(sequentialRowCounter).padStart(2, '0');
                const item = activeGeneralOfferingsPool[slotIdx];
                checklistOutput += `${paddedIdx}. ${item.name} SAIRAM - ${item.lyrics}\n`;
                sequentialRowCounter++;
            }
        }
    } else {
        // Standard Flow: Output all captured general entries sequentially
        activeGeneralOfferingsPool.forEach(item => {
            const paddedIdx = String(sequentialRowCounter).padStart(2, '0');
            checklistOutput += `${paddedIdx}. ${item.name} SAIRAM - ${item.lyrics}\n`;
            sequentialRowCounter++;
        });
    }

    // --- STEP D: INJECT SWAMI'S CHOICE (FORTUNE WHEEL) IF APPLICABLE ---
    if (!isSatsangActive && isFortuneWheelActive) {
        const paddedIdx = String(sequentialRowCounter).padStart(2, '0');
        checklistOutput += `${paddedIdx}. SWAMI'S CHOICE (FORTUNE WHEEL SELECTION)\n`;
        sequentialRowCounter++;
    }

    // --- STEP E: RENDER ANCHOR CLOSING MANDATORY OFFERINGS (SLOTS 12 - 14) ---
    checklistOutput += buildChecklistRowLine(12, "BHAJAN ON LORD HANUMAR", sequentialRowCounter);
    sequentialRowCounter++;

    checklistOutput += buildChecklistRowLine(13, "BHAJAN ON LORD SUBRAMANYAR", sequentialRowCounter);
    sequentialRowCounter++;

    checklistOutput += buildChecklistRowLine(14, "MANGALA AARTHI & VIB MANTRA", sequentialRowCounter);

    // --- 6. Append closing footers exactly as shown in your blueprint ---
    checklistOutput += `\n*We request our other members to post ur bhajans IMMEDIATELY*\n\n`;
    checklistOutput += `Kindly inform us IMMEDIATELY if you are not available for rendering the offerings allotted as above, for allotting to another member.\n\n`;
    checklistOutput += `Om Shri Sairam 🙏 🙏`;

    // 7. Fire direct system clipboard operation
    executeChecklistClipboardAction(checklistOutput);
}

/**
 * Helper utility to cleanly extract row inputs and build a padded checklist string line
 */
function buildChecklistRowLine(blueprintRowId, fallbackLabel, activeDisplayRowNumber) {
    const nameInput = document.getElementById(`input_allottee_row_${blueprintRowId}`);
    const lyricsInput = document.getElementById(`input_lyrics_row_${blueprintRowId}`);
    
    let defaultSinger = "NAME";
    if (blueprintRowId === 14) defaultSinger = "TOGETHER";
    
    const memberName = nameInput && nameInput.value ? nameInput.value.trim().toUpperCase() : defaultSinger;
    const bhajanTitle = lyricsInput && lyricsInput.value ? lyricsInput.value.trim().toUpperCase() : fallbackLabel;
    
    const paddedIndexStr = String(activeDisplayRowNumber).padStart(2, '0');
    return `${paddedIndexStr}. ${memberName} SAIRAM - ${bhajanTitle}\n`;
}

function executeChecklistClipboardAction(textData) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textData)
            .then(() => {
                alert("Sairam! Checklist text successfully copied to clipboard.");
            })
            .catch(() => {
                fallbackChecklistCopy(textData);
            });
    } else {
        fallbackChecklistCopy(textData);
    }
}

function fallbackChecklistCopy(textData) {
    const textArea = document.createElement("textarea");
    textArea.value = textData;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert("Sairam! Checklist text successfully copied to clipboard.");
    } catch (err) {
        alert("Sairam! Could not copy Checklist to clipboard automatically.");
    }
    document.body.removeChild(textArea);
}
