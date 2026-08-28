/**
 * ============================================================================
 * SCRIPT NO     : 13
 * SCRIPT NAME   : 13_process_lyrics.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Activity E - Consolidates all submitted bhajan names, lyrics, 
 *                 and attendance flags into a unified group broadcast text.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    const pasteLyricsBtn = document.getElementById("btn_lyrics_process");
    if (pasteLyricsBtn) {
        pasteLyricsBtn.addEventListener("click", () => {
            generateBhajansLyricsText();
        });
    }
});

/**
 * Sweeps all 3 parts of the layout screen to build a clean structured lyrics summary text block.
 */
function generateBhajansLyricsText() {
    if (!CURRENTLY_SELECTED_GROUP) {
        alert("Sairam! Please select a Bhajan Group first.");
        return;
    }

    // 1. Fetch current dynamic date label from the active dropdown menu row
    const dateDropdown = document.getElementById(`select_date_${CURRENTLY_SELECTED_GROUP.toLowerCase()}`);
    let sessionFullDateLabel = "DD-MMM-YYYY, DDD";
    if (dateDropdown && dateDropdown.options[dateDropdown.selectedIndex]) {
        sessionFullDateLabel = dateDropdown.options[dateDropdown.selectedIndex].text;
    }

    // 2. Assemble the main master title block using clean bold text parameters
    let lyricsOutput = `*🕉️ BHAJANS LYRICS PROGRAM DETAILS - SAIRAM 🕉️*\n`;
    lyricsOutput += `*DATE & SESSION:* ${sessionFullDateLabel.toUpperCase()}\n`;
    lyricsOutput += `-------------------------------------------------------------\n\n`;

    let overallItemCounter = 1;

    // --- PROCESS PART 1 & PART 2: FIXED ALLOTMENTS (Rows 1 to 14) ---
    const structuralOfferingsList = [
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

    // Check if Satsang override option is currently active (Y) to skip processing Part 2 cells
    const satsangDropdown = document.getElementById("select_satsang_option");
    const isSatsangActive = satsangDropdown && satsangDropdown.value === "Y";

    structuralOfferingsList.forEach(offering => {
        if (isSatsangActive && offering.type === "S") {
            return; // Completely bypasses semi-mandatory rows from the text print
        }

        // Extract values from your UI interface grid rows
        const singerInput = document.getElementById(`input_allottee_row_${offering.num}`);
        const attendanceSelect = document.getElementById(`select_attendance_row_${offering.num}`);
        const alternateSingerInput = document.getElementById(`input_alternate_row_${offering.num}`);
        const lyricsInput = document.getElementById(`input_lyrics_row_${offering.num}`);

        const singerName = singerInput && singerInput.value ? singerInput.value.trim().toUpperCase() : "";
        const isPresent = attendanceSelect ? attendanceSelect.value === "Y" : true;
        const alternateSinger = alternateSingerInput && alternateSingerInput.value ? alternateSingerInput.value.trim().toUpperCase() : "";
        const embeddedLyrics = lyricsInput && lyricsInput.value ? lyricsInput.value.trim() : "";

        // Determine final display singer name based on active attendance tracking
        let finalSinger = singerName || "VOLUNTEER";
        if (!isPresent && alternateSinger !== "") {
            finalSinger = `${alternateSinger} (ALTERNATE FOR ${singerName})`;
        }

        // Format template block structure for each entry holding valid text
        const paddedIndex = String(overallItemCounter).padStart(2, '0');
        lyricsOutput += `${paddedIndex}. *${offering.label}*\n`;
        lyricsOutput += `    *SINGER:* ${finalSinger} SAIRAM\n`;
        
        if (embeddedLyrics !== "") {
            lyricsOutput += `    *LYRICS:*\n${embeddedLyrics}\n`;
        } else {
            lyricsOutput += `    *LYRICS:* (To be posted / sung live)\n`;
        }
        lyricsOutput += `-------------------------------------------------------------\n`;
        
        overallItemCounter++;
    });

    // --- PROCESS PART 3: OTHER GENERAL OFFERINGS (Dynamic Rows) ---
    // Loops dynamically through all general member table rows on your UI screen panel design
    const generalMembersRowsCount = 15; // Matches the 15 design slots displayed in your screenshot image
    
    for (let i = 1; i <= generalMembersRowsCount; i++) {
        const genMemberNameLabel = document.getElementById(`lbl_part3_member_name_${i}`);
        const genAttendanceSelect = document.getElementById(`select_part3_attendance_${i}`);
        const genLyricsInput = document.getElementById(`input_part3_lyrics_${i}`);

        if (genMemberNameLabel && genMemberNameLabel.innerText.trim() !== "") {
            const memberNameText = genMemberNameLabel.innerText.trim().toUpperCase();
            const isMemberPresent = genAttendanceSelect ? genAttendanceSelect.value === "Y" : false;
            const generalLyricsText = genLyricsInput && genLyricsInput.value ? genLyricsInput.value.trim() : "";

            // Only append the general member to the lyrics compilation text stream if they are confirmed present
            if (isMemberPresent && generalLyricsText !== "") {
                const paddedIndex = String(overallItemCounter).padStart(2, '0');
                lyricsOutput += `${paddedIndex}. *GENERAL BHAJAN OFFERING*\n`;
                lyricsOutput += `    *SINGER:* ${memberNameText} SAIRAM\n`;
                lyricsOutput += `    *LYRICS:*\n${generalLyricsText}\n`;
                lyricsOutput += `-------------------------------------------------------------\n`;
                
                overallItemCounter++;
            }
        }
    }

    // 3. Append standard clean closing token footer
    lyricsOutput += `\nOm Shri Sairam 🙏 🙏 🙏`;

    // 4. Fire direct safe system clipboard action
    executeLyricsClipboardAction(lyricsOutput);
}

/**
 * Robust clipboard transfer utility supporting computer and mobile browser execution layers
 */
function executeLyricsClipboardAction(textPayload) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textPayload)
            .then(() => {
                alert("Sairam! Bhajans Lyrics text summary successfully copied to clipboard.");
            })
            .catch(() => {
                fallbackLyricsCopy(textPayload);
            });
    } else {
        fallbackLyricsCopy(textPayload);
    }
}

function fallbackLyricsCopy(textPayload) {
    const backupArea = document.createElement("textarea");
    backupArea.value = textPayload;
    backupArea.style.position = "fixed";
    document.body.appendChild(backupArea);
    backupArea.focus();
    backupArea.select();
    try {
        document.execCommand('copy');
        alert("Sairam! Bhajans Lyrics text summary successfully copied to clipboard.");
    } catch (err) {
        alert("Sairam! Direct automated clipboard backup action failed.");
    }
    document.body.removeChild(backupArea);
}
