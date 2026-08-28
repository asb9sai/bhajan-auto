/**
 * ============================================================================
 * SCRIPT NO     : 09
 * SCRIPT NAME   : 09_process_weekly.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Activity C - Assembles the Weekly Allotment text template.
 *                 Dynamically manages Semi-Mandatory and Satsang row visibility
 *                 options cleanly with continuous layout numbering alignment.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const weeklyProcessBtn = document.getElementById("btn_weekly_allotment");
    if (weeklyProcessBtn) {
        weeklyProcessBtn.addEventListener("click", () => {
            generateWeeklyAllotmentText();
        });
    }
});

/**
 * Builds the structured text and copies it to the device clipboard.
 */
function generateWeeklyAllotmentText() {
    if (!CURRENTLY_SELECTED_GROUP) {
        alert("Sairam! Please select a Bhajan Group first.");
        return;
    }

    // 1. Fetch group context data dynamically from central config
    const targetGroup = BHAJAN_GROUPS_CONFIG.find(g => g.id === CURRENTLY_SELECTED_GROUP);
    const groupName = targetGroup ? targetGroup.name : CURRENTLY_SELECTED_GROUP;

    // 2. Fetch the target active dropdown session date
    const dateDropdown = document.getElementById(`select_date_${CURRENTLY_SELECTED_GROUP.toLowerCase()}`);
    let sessionDateLabel = "DD-MM-YYYY, DDD";
    if (dateDropdown && dateDropdown.options[dateDropdown.selectedIndex]) {
        sessionDateLabel = dateDropdown.options[dateDropdown.selectedIndex].text;
    }

    // 3. Check configuration dropdown toggles directly from dashboard screen layout
    const satsangDropdown = document.getElementById("select_satsang_option");
    const isSatsangActive = satsangDropdown && satsangDropdown.value === "Y";

    const semiMandDropdown = document.getElementById("select_semimandatory_option");
    const isSemiMandatoryActive = semiMandDropdown ? semiMandDropdown.value === "Y" : true;

    // 4. Assemble the top header blocks matching your layout scheme
    let outputText = `*(${groupName.toUpperCase()}) - WEEKLY ALLOTMENT OF OFFERINGS LIST FOR ${sessionDateLabel.toUpperCase()}*\n\n`;
    outputText += `Sairam pls note the offering allotted for this session, and render as allotted :\n\n`;
    outputText += `#   *NAMES & OFFERINGS ALLOTTED*\n`;
    outputText += `-------------------------------------------------------------\n`;

    // 5. Mapped blueprint list of your 14 standard offering rows
    const weeklyOfferingsDefinition = [
        { num: 1, label: "GANESH BHAJAN", type: "M" },
        { num: 2, label: "GURU BHAJAN", type: "M" },
        { num: 3, label: "DEVI BHAJAN", type: "M" },
        { num: 4, label: "SARVA DHARMA BHAJAN", type: "M" },
        { num: 5, label: "RAMAR BHAJAN", type: "S" },
        { num: 6, label: "KRISHNAR BHAJAN", type: "S" },
        { num: 7, label: "SHIVA BHAJAN", type: "S" },
        { num: 8, label: "BHAJAN ON SWAMI", type: "S" },
        { num: 9, label: "VITTHALA BHAJAN", type: "S" },
        { num: 10, label: "NARAYANA / HARI / GOVINDA BHAJAN", type: "S" },
        { num: 11, label: "AYYAPPA BHAJAN", type: "S" },
        { num: 12, label: "HANUMAR BHAJAN", type: "M" },
        { num: 13, label: "SUBRAMANYAM", type: "M" },
        { num: 14, label: "AARTHI & VM", type: "M" }
    ];

    let currentPrintIndex = 1;

    // Loop through each entry and check layout toggle options
    weeklyOfferingsDefinition.forEach(item => {
        // If Satsang is active, or if Semi-Mandatory switch is manually turned off, skip rows 5-11
        if ((isSatsangActive || !isSemiMandatoryActive) && item.type === "S") {
            return; 
        }

        const inputElement = document.getElementById(`input_allottee_row_${item.num}`);
        const allotteeName = inputElement && inputElement.value ? inputElement.value.trim().toUpperCase() : "(NAME)";
        
                // Matches the visual blueprint text column layout structure exactly
        outputText += `${currentPrintIndex}  *${item.label} TO ${allotteeName} SAIRAM*\n`;

        currentPrintIndex++;
    });

    // Special visual reminder line added inside weekly text if session features a Satsang
    if (isSatsangActive) {
        outputText += `\n*NOTE: SEMI-MANDATORY OFFERINGS ARE REPLACED BY SATSANG FOR THIS SESSION.*\n`;
    }

    // 6. Append closing reminder footers exactly as shown in your blueprint
    outputText += `\nKindly inform us IMMEDIATELY if you are not available for rendering the offerings allotted as above, for allotting to another member.\n\n`;
    outputText += `Om Shri Sairam 🙏 🙏`;

            // 7. Push data directly into the visual clipboard box terminal layer
    const dashboardTerminalBox = document.getElementById("txt_clipboard_mirror_terminal");
    if (dashboardTerminalBox) {
        dashboardTerminalBox.value = outputText; // Sets text inside the terminal window
    }

    // 8. Execute direct device clipboard action
    copyWeeklyTextToClipboard(outputText);
}



/**
 * Robust copy utility compatible with both Android mobile browsers and desktop systems
 */
function copyWeeklyTextToClipboard(textToCopy) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert("Sairam! Weekly Allotment text successfully copied to clipboard.");
            })
            .catch(err => {
                fallbackCopyWeeklyText(textToCopy);
            });
    } else {
        fallbackCopyWeeklyText(textToCopy);
    }
}

function fallbackCopyWeeklyText(textToCopy) {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert("Sairam! Weekly Allotment text successfully copied to clipboard.");
    } catch (err) {
        alert("Sairam! Clipboard operation failed.");
    }
    document.body.removeChild(textArea);
}
