/**
 * ============================================================================
 * SCRIPT NO     : 07
 * SCRIPT NAME   : 07_date_dropdown_filler.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Dynamically calculates and populates the upcoming session
 *                 date dropdown menus for all 5 active bhajan groups on startup.
 *                 Automatically displays the nearest date beneath each group card.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    populateAllDateDropdowns();
});

/**
 * Loops through all active groups to generate their upcoming valid dates
 * and forces the UI cards to display the nearest date instantly.
 */
function populateAllDateDropdowns() {
    let today = new Date();
    
    // STRICT ROLLOUT RULE: If the system is in August 2026, force the start reference to Sep 1st, 2026
    if (today.getFullYear() === 2026 && today.getMonth() === 7) {
        today = new Date(2026, 8, 1); // 8 represents September in JavaScript
    }
    
    // 1. Populate Fixed Weekly Groups (Wednesday & Friday)

    populateWeeklyDropdown("select_date_wed", 3, today); // 3 = Wednesday
    populateWeeklyDropdown("select_date_fri", 5, today); // 5 = Friday

    // 2. Populate Ardra Star Day Dropdown from Calendar Database
    populateStaticListDropdown("select_date_ard", ARDRA_STAR_DATES, today, false);

    // 3. Populate Mahilas Group Dropdown (19th of every month with skip rule)
    populateMahilasDropdown("select_date_mah", today);

    // 4. Populate Special Bhajan Dropdown from Calendar Database
    populateSpecialDropdown("select_date_spl", SPECIAL_BHAJAN_DATES, today);

    // 5. AUTOMATIC VIEW SYNCHRONIZATION:
    // Forces the UI text block below each group name header to instantly display 
    // the nearest upcoming date choice loaded into the dropdown index.
    syncHeaderDisplayLabels();
}

/**
 * Calculates and fills next 4 upcoming weekly dates for day-based groups.
 */
function populateWeeklyDropdown(elementId, targetDay, startDate) {
    const dropdown = document.getElementById(elementId);
    if (!dropdown) return;
    
    dropdown.innerHTML = ""; 
    let current = new Date(startDate);

    while (current.getDay() !== targetDay) {
        current.setDate(current.getDate() + 1);
    }

    for (let i = 0; i < 4; i++) {
        const dateStr = formatDateToUi(current);
        const option = new Option(dateStr, current.toISOString().split('T')[0]);
        dropdown.add(option);
        current.setDate(current.getDate() + 7);
    }
}

/**
 * Fills dropdown from predefined static calendar lists (Ardra).
 */
function populateStaticListDropdown(elementId, dateArray, startDate, checkWedFri) {
    const dropdown = document.getElementById(elementId);
    if (!dropdown) return;

    dropdown.innerHTML = "";
    const startCompareStr = startDate.toISOString().split('T')[0];

    const validDates = dateArray.filter(dateStr => {
        if (dateStr < startCompareStr) return false;
        if (checkWedFri && isWednesdayOrFriday(dateStr)) return false;
        return true;
    });

    validDates.slice(0, 4).forEach(dateStr => {
        const displayDate = formatDateToUi(new Date(dateStr));
        dropdown.add(new Option(displayDate, dateStr));
    });
}

/**
 * Calculates upcoming 19th-of-the-month dates for Mahilas, enforcing skip rules.
 */
function populateMahilasDropdown(elementId, startDate) {
    const dropdown = document.getElementById(elementId);
    if (!dropdown) return;

    dropdown.innerHTML = "";
    let currentYear = startDate.getFullYear();
    let currentMonth = startDate.getMonth(); 
    let count = 0;

    while (count < 4) {
        const validDateStr = getValidMahilasDate(currentMonth, currentYear);
        
        if (validDateStr) {
            const dateObj = new Date(validDateStr);
            if (dateObj >= startDate) {
                const displayStr = formatDateToUi(dateObj);
                dropdown.add(new Option(displayStr, validDateStr));
                count++;
            }
        }
        
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
    }
}

/**
 * Fills the Special Bhajan dropdown, appending the occasion name for complete clarity.
 */
function populateSpecialDropdown(elementId, specialDatesArray, startDate) {
    const dropdown = document.getElementById(elementId);
    if (!dropdown) return;

    dropdown.innerHTML = "";
    const startCompareStr = startDate.toISOString().split('T')[0];

    const futureOccasions = specialDatesArray.filter(item => item.date >= startCompareStr);

    futureOccasions.slice(0, 4).forEach(item => {
        const displayDate = formatDateToUi(new Date(item.date));
        const finalLabel = `${displayDate} (${item.occasion})`;
        dropdown.add(new Option(finalLabel, item.date));
    });
}

/**
 * Sweeps the loaded dropdown indices and pushes the first item label text 
 * straight into the header cells view row beneath each group column block.
 */
function syncHeaderDisplayLabels() {
    const targetGroupsList = ["wed", "fri", "ard", "mah", "spl"];
    
    targetGroupsList.forEach(groupCode => {
        // Read your exact select element ids from index.html
        const dropdown = document.getElementById(`select_date_${groupCode}`);
        const headerDisplayCell = document.getElementById(`lbl_upcoming_display_${groupCode}`);
        
        // Fix: Read the text property safely by specifying index [0]
        if (dropdown && dropdown.options.length > 0) {
            const nearestDateLabel = dropdown.options[0].text;
            const abbreviatedLabel = nearestDateLabel.split(" (")[0];
            
            // Safe fallback rule: Only edit dashboard text if the target label exists
            if (headerDisplayCell) {
                headerDisplayCell.innerText = abbreviatedLabel;
            }
            
            // Listen to real-time dropdown updates cleanly
            dropdown.addEventListener("change", () => {
                if (dropdown.selectedIndex >= 0) {
                    const updatedLabel = dropdown.options[dropdown.selectedIndex].text;
                    if (headerDisplayCell) {
                        headerDisplayCell.innerText = updatedLabel.split(" (")[0];
                    }
                }
            });
        }
    });
    console.log("Sairam! Dashboard date sequences isolated and loaded cleanly.");
}


/**
 * Formats standard JavaScript Date objects into short scannable texts (e.g., "SEP 02, 2026")
 */
function formatDateToUi(dateObj) {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const monthStr = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    return `${monthStr} ${day}, ${year}`;
}
