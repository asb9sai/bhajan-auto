/**
 * ============================================================================
 * SCRIPT NO     : 11
 * SCRIPT NAME   : 11_process_reminder.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Activity F - Assembles the Gentle Reminder text template.
 *                 Filters out members who have already posted their lyrics.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const reminderBtn = document.getElementById("btn_reminder_process");
    if (reminderBtn) {
        reminderBtn.addEventListener("click", () => {
            generateGentleReminderText();
        });
    }
});

function generateGentleReminderText() {
    if (!CURRENTLY_SELECTED_GROUP) {
        alert("Sairam! Please select a Bhajan Group first.");
        return;
    }

    const targetGroup = BHAJAN_GROUPS_CONFIG.find(
        g => g.id === CURRENTLY_SELECTED_GROUP
    );
    const groupName = targetGroup ? 
        targetGroup.name : CURRENTLY_SELECTED_GROUP;

    const dateDropdown = document.getElementById(
        `select_date_${CURRENTLY_SELECTED_GROUP.toLowerCase()}`
    );
    let sessionDateLabel = "DD-MMM-YYYY, DDD";
    if (dateDropdown && dateDropdown.options[dateDropdown.selectedIndex]) {
        sessionDateLabel = dateDropdown.options[dateDropdown.selectedIndex].text;
    }

    const satsangDropdown = document.getElementById("select_satsang_option");
    const isSatsangActive = satsangDropdown && 
          satsangDropdown.value === "Y";

    const semiMandDropdown = document.getElementById(
        "select_semimandatory_option"
    );
    const isSemiMandatoryActive = semiMandDropdown ? 
          semiMandDropdown.value === "Y" : true;

    let reminderOutput = `*${groupName.toUpperCase()} - OUR BHAJAN ON ` +
        `${sessionDateLabel.toUpperCase()} - GENTLE REMINDER*\n\n`;
    reminderOutput += `*Request our following members, to post ` +
        `their bhajans IMMEDIATELY*\n\n`;

    let explicitLineCounter = 1;
    const totalMaxAllotteeRowsCount = 14;

    for (let rowIdx = 1; rowIdx <= totalMaxAllotteeRowsCount; rowIdx++) {
        // Condition Check: Skip row if Satsang or Semi-Mandatory toggle tells us to
        const isSemiMandatorySlot = rowIdx >= 5 && rowIdx <= 11;
        if ((isSatsangActive || !isSemiMandatoryActive) && isSemiMandatorySlot) {
            continue; 
        }

        const nameInputElement = document.getElementById(
            `input_allottee_row_${rowIdx}`
        );
        const lyricsInputElement = document.getElementById(
            `input_lyrics_row_${rowIdx}`
        );

        if (nameInputElement && nameInputElement.value.trim() !== "") {
            const formattedName = nameInputElement.value.trim().toUpperCase();
            
            // AUTOMATION ENGINE CHECK: Read if lyrics cell has text
            const lyricsValue = lyricsInputElement ? 
                  lyricsInputElement.value.trim() : "";

            // If they already filled out their lyrics, skip reminding them!
            if (lyricsValue !== "") {
                continue; 
            }
            
            reminderOutput += `${String(explicitLineCounter).padEnd(2, ' ')} ` +
                `${formattedName} SAIRAM\n`;
            explicitLineCounter++;
        }
    }

    reminderOutput += `\nKindly inform us IMMEDIATELY if you are not available ` +
        `for rendering the offerings\nallotted as above, for allotting to ` +
        `another member.\n\n`;
    reminderOutput += `Om Shri Sairam 🙏 🙏`;

    executeReminderClipboardAction(reminderOutput);
}

function executeReminderClipboardAction(compiledMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(compiledMessage)
            .then(() => {
                alert("Sairam! Gentle Reminder text copied to clipboard.");
            })
            .catch(() => {
                fallbackReminderCopy(compiledMessage);
            });
    } else {
        fallbackReminderCopy(compiledMessage);
    }
}

function fallbackReminderCopy(compiledMessage) {
    const hiddenTextArea = document.createElement("textarea");
    hiddenTextArea.value = compiledMessage;
    hiddenTextArea.style.position = "fixed";
    document.body.appendChild(hiddenTextArea);
    hiddenTextArea.focus();
    hiddenTextArea.select();
    try {
        document.execCommand('copy');
        alert("Sairam! Gentle Reminder text copied.");
    } catch (err) {
        alert("Sairam! Automated clipboard extraction failed.");
    }
    document.body.removeChild(hiddenTextArea);
}
