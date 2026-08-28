/**
 * ============================================================================
 * SCRIPT NO     : 06
 * SCRIPT NAME   : 06_schedule_calendar.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Master calendar storage database for Ardra Star Days and 
 *                 Special Occasions. Handles execution lookup matrices.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

/**
 * MASTER DATASET: Finalized Ardra Star Days (2026 - 2027)
 * Strictly mapped to verify custom schedule criteria.
 */
const ARDRA_STAR_DATES = [
    "2026-09-06", "2026-10-03", "2026-11-26", "2026-12-24",
    "2027-03-16", "2027-04-12", "2027-05-09", "2027-06-06",
    "2027-07-03", "2027-07-31", "2027-09-23", "2027-10-21", "2027-12-14"
];

/**
 * MASTER DATASET: Finalized Special Bhajan Occasions (2026 - 2027)
 * Standardized to provide text mappings for interactive listings.
 */
const SPECIAL_BHAJAN_DATES = [
    // --- 2026 Sessions ---
    { date: "2026-09-04", occasion: "KRISHNA JAYANTHI" },
    { date: "2026-09-14", occasion: "GANESH CHATHURTHI" },
    { date: "2026-10-20", occasion: "AVATAR DECLARATION DAY" },
    { date: "2026-11-08", occasion: "DEEPAWALI" },
    { date: "2026-11-19", occasion: "LADIES DAY" },
    { date: "2026-11-23", occasion: "SWAMI'S BIRTHDAY" },
    { date: "2026-12-25", occasion: "CHRISTMAS" },

    // --- 2027 Sessions ---
    { date: "2027-01-01", occasion: "ENGLISH NEW YEAR" },
    { date: "2027-01-14", occasion: "PONGAL" },
    { date: "2027-02-15", occasion: "MAHA SHIVARATRI" },
    { date: "2027-03-19", occasion: "UGADI" },
    { date: "2027-03-26", occasion: "SRI RAMA NAVAMI" },
    { date: "2027-04-02", occasion: "HANUMAR JAYANTHI" },
    { date: "2027-04-03", occasion: "HOLI" },
    { date: "2027-04-24", occasion: "SWAMI ARADHANA MAHOTHSAVAM" },
    { date: "2027-05-01", occasion: "BUDDHA PURNIMA" },
    { date: "2027-06-06", occasion: "ESWARAMMA DAY" },
    { date: "2027-07-29", occasion: "GURU PURNIMA" },
    { date: "2027-08-26", occasion: "ONAM" },
    { date: "2027-09-04", occasion: "KRISHNA JAYANTHI" },
    { date: "2027-09-14", occasion: "GANESH CHATHURTHI" },
    { date: "2027-10-20", occasion: "AVATAR DECLARATION DAY" },
    { date: "2027-11-08", occasion: "DEEPAWALI" },
    { date: "2027-11-19", occasion: "LADIES DAY" },
    { date: "2027-11-23", occasion: "SWAMI'S BIRTHDAY" },
    { date: "2027-12-25", occasion: "CHRISTMAS" }
];

/**
 * Validates whether a specific date string falls on a Wednesday (3) or Friday (5).
 * Enforces rule: Skip Mahilas (19th) and Ardra if they fall on Wednesday/Friday.
 */
function isWednesdayOrFriday(dateString) {
    const dateObj = new Date(dateString);
    const dayOfWeek = dateObj.getDay(); // 0=Sunday, 3=Wednesday, 5=Friday
    return dayOfWeek === 3 || dayOfWeek === 5;
}

/**
 * Evaluates and fetches the 19th of a given month/year for Mahilas Group.
 * Applies strict skip rules if it lands on a Wednesday or Friday.
 */
function getValidMahilasDate(targetMonth, targetYear) {
    const monthStr = String(targetMonth + 1).padStart(2, '0');
    const constructedDate = `${targetYear}-${monthStr}-19`;
    
    if (isWednesdayOrFriday(constructedDate)) {
        return null; // Flagged as skipped row due to overlap rules
    }
    return constructedDate;
}

// Freeze structures to prevent runtime memory pollution
Object.freeze(ARDRA_STAR_DATES);
Object.freeze(SPECIAL_BHAJAN_DATES);
