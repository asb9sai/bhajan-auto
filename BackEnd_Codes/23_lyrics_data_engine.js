/**
 * ============================================================================
 * SCRIPT NO     : 23
 * SCRIPT NAME   : 23_lyrics_data_engine.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Activity E - Baseline engine. Parses WhatsApp text, mapping
 *                 Part 3 general offerings strictly by order of posting time.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

// Central states tracking registries preserved in live session runtime memory
let LYRICS_SUBMISSION_REGISTRY = {};
let CHRONOLOGICAL_PART3_ARRAY = []; // Strict chronological queue for general offerings

document.addEventListener("DOMContentLoaded", () => {
    setupLyricsEngineListener();
});

function setupLyricsEngineListener() {
    const pasteLyricsBtn = document.getElementById("btn_lyrics_process");
    if (pasteLyricsBtn) {
        pasteLyricsBtn.addEventListener("click", () => {
            processIncomingPastedLyrics();
        });
    }
}

/**
 * Parses raw text from your paste field box, extracting timelines and inputs
 */
function processIncomingPastedLyrics() {
    const rawPasteArea = document.getElementById("txt_raw_lyrics_paste_box");
    if (!rawPasteArea || rawPasteArea.value.trim() === "") {
        alert("Sairam! Please paste the text block from WhatsApp into the entry area first.");
        return;
    }

    const rawTextLines = rawPasteArea.value.split("\n");
    console.log(`Sairam: Parsing ${rawTextLines.length} lines of text data...`);

    // Reset session registries before running our fresh evaluation sweep
    LYRICS_SUBMISSION_REGISTRY = {};
    CHRONOLOGICAL_PART3_ARRAY = []; 

    // 1. Initialize active devotee structures to false states
    if (typeof BHAJAN_MEMBERS_DATA !== 'undefined') {
        BHAJAN_MEMBERS_DATA.forEach(member => {
            const currentSts = member.sts || member.STS || "A";
            if (currentSts.toUpperCase() === "A") {
                LYRICS_SUBMISSION_REGISTRY[member.name.toUpperCase()] = {
                    hasPosted: false,
                    lyricsSnippet: ""
                };
            }
        });
    }

    // 2. Identify the 14 structural offering keywords to isolate Part 1 & Part 2 from Part 3
    const coreOfferingKeywords = [
        "GANESH", "GURU", "DEVI", "SARVA DHARMA", "SARVADHARMA", "RAMAR", 
        "KRISHNAR", "SHIVA", "SWAMI", "VITTHALA", "NARAYANA", "AYYAPPAN", 
        "HANUMAR", "SUBRAMANYAR", "AARTHI", "MANGALA"
    ];

    // 3. Scan line-by-line (Top-to-Bottom preserves chronological WhatsApp posting time)
    rawTextLines.forEach(line => {
        const uppercaseLine = line.toUpperCase().trim();
        if (uppercaseLine === "") return;
        
        // Find if any active member name matches this line entry string block
        Object.keys(LYRICS_SUBMISSION_REGISTRY).forEach(memberName => {
            if (uppercaseLine.includes(memberName)) {
                // Check if this line is an official Part 1 or Part 2 structural allotment
                const isCoreOffering = coreOfferingKeywords.some(keyword => uppercaseLine.includes(keyword));

                if (isCoreOffering) {
                    // Update core rows data tracks
                    LYRICS_SUBMISSION_REGISTRY[memberName].hasPosted = true;
                    LYRICS_SUBMISSION_REGISTRY[memberName].lyricsSnippet += line + "\n";
                } else {
                    // CRITICAL CHRONOLOGICAL MATRIX RULE: It is an other general offering!
                    // Push immediately to our sequence queue array to lock down posting time order
                    CHRONOLOGICAL_PART3_ARRAY.push({
                        name: memberName,
                        text: line.trim()
                    });
                }
            }
        });
    });

    // 4. Populate Part 3 rows dynamically on your screen dashboard matching this order sequence
    populatePart3ScreenRowsFromChronology();

    alert(`Sairam! Lyrics parsed successfully.\n\nCaptured general offerings in their exact chronological order of posting time.\nChecklist and final summary text layers are updated!`);
}

/**
 * Injects the chronologically sorted general offerings straight into your 15 dashboard layout cells
 */
function populatePart3ScreenRowsFromChronology() {
    const part3MaxRowsCount = 15;
    
    // Clear out screen row containers before loading fresh dataset alignments
    for (let i = 1; i <= part3MaxRowsCount; i++) {
        const lbl = document.getElementById(`lbl_part3_member_name_${i}`);
        const txt = document.getElementById(`input_part3_lyrics_${i}`);
        const att = document.getElementById(`select_part3_attendance_${i}`);
        
        if (lbl) lbl.innerText = "";
        if (txt) txt.value = "";
        if (att) att.value = "N";
    }

    // Populate using our sequence list index arrays
    CHRONOLOGICAL_PART3_ARRAY.slice(0, part3MaxRowsCount).forEach((item, index) => {
        const rowId = index + 1;
        const labelElement = document.getElementById(`lbl_part3_member_name_${rowId}`);
        const lyricsInputElement = document.getElementById(`input_part3_lyrics_${rowId}`);
        const attendanceDropdown = document.getElementById(`select_part3_attendance_${rowId}`);

        if (labelElement && lyricsInputElement) {
            labelElement.innerText = item.name;
            lyricsInputElement.value = item.text;
            if (attendanceDropdown) attendanceDropdown.value = "Y"; // Default auto-present for submitters
        }
    });
}
