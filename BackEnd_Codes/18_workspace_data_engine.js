/**
 * ============================================================================
 * SCRIPT NO     : 18
 * SCRIPT NAME   : 18_workspace_data_engine.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Manages live dashboard workspace rows, tracking attendance 
 *                 toggles, alternate overrides, and manual lyrics text edits.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initializeWorkspaceRowListeners();
});

/**
 * Attaches real-time change monitors to all dashboard rows for live edits
 */
function initializeWorkspaceRowListeners() {
    const totalWorkspaceRowsCount = 14;

    for (let rowId = 1; rowId <= totalWorkspaceRowsCount; rowId++) {
        const attendanceSelect = document.getElementById(`select_attendance_row_${rowId}`);
        const alternateInput = document.getElementById(`input_alternate_row_${rowId}`);
        const singerInput = document.getElementById(`input_allottee_row_${rowId}`);
        const lyricsInput = document.getElementById(`input_lyrics_row_${rowId}`);

        if (attendanceSelect) {
            attendanceSelect.value = "Y";
            attendanceSelect.addEventListener("change", (event) => {
                evaluateRowAttendanceTrigger(rowId, event.target.value, alternateInput, singerInput);
            });
        }

        // Setup real-time listener to capture manual typing/editing in Part 1 & Part 2 lyric cells
        if (lyricsInput) {
            lyricsInput.addEventListener("input", (e) => {
                console.log(`Sairam: Manual lyric change captured for Row ${rowId}`);
                // Enforces automatic upper-case formatting cleanly as you type
                forceCellToUppercase(e.target);
            });
        }

        setupAutoCapitalizeListener(`input_allottee_row_${rowId}`);
        setupAutoCapitalizeListener(`input_alternate_row_${rowId}`);
    }

    // Attach manual edit listener tracks to all 15 dynamic Part 3 general rows
    const part3MaxRows = 15;
    for (let i = 1; i <= part3MaxRows; i++) {
        const part3LyricsInput = document.getElementById(`input_part3_lyrics_${i}`);
        if (part3LyricsInput) {
            part3LyricsInput.addEventListener("input", (e) => {
                console.log(`Sairam: Manual lyric change captured for Part 3 Row ${i}`);
                forceCellToUppercase(e.target);
            });
        }
    }
}

/**
 * Handles toggling row styles based on attendance checkpoints
 */
function evaluateRowAttendanceTrigger(rowId, attendanceCode, alternateInput, singerInput) {
    if (attendanceCode === "N") {
        if (alternateInput) {
            alternateInput.disabled = false;
            alternateInput.placeholder = "ENTER ALTERNATE SINGER";
            alternateInput.style.backgroundColor = "#FFF9E6"; 
            alternateInput.focus();
        }
        if (singerInput) {
            singerInput.style.textDecoration = "line-through";
            singerInput.style.color = "#888888";
        }
    } else {
        if (alternateInput) {
            alternateInput.value = "";
            alternateInput.disabled = true;
            alternateInput.placeholder = "N/A - PRESENT";
            alternateInput.style.backgroundColor = "";
        }
        if (singerInput) {
            singerInput.style.textDecoration = "";
            singerInput.style.color = "#000000";
        }
    }
}

/**
 * Helper utility ensuring clean cursor positioning when converting typed text to uppercase
 */
function forceCellToUppercase(targetInputElement) {
    const startCursor = targetInputElement.selectionStart;
    const endCursor = targetInputElement.selectionEnd;
    targetInputElement.value = targetInputElement.value.toUpperCase();
    targetInputElement.setSelectionRange(startCursor, endCursor);
}

function setupAutoCapitalizeListener(elementId) {
    const inputField = document.getElementById(elementId);
    if (inputField) {
        inputField.addEventListener("input", (e) => {
            forceCellToUppercase(e.target);
        });
    }
}
