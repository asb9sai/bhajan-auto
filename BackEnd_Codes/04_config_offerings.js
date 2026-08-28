/**
 * ============================================================================
 * SCRIPT NO     : 04
 * SCRIPT NAME   : 04_config_offerings.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Stores central immutable offerings description matrix, codes,
 *                 and systemic default conditions common to all groups.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

const BHAJAN_OFFERINGS_CONFIG = [
    // --- CODE M: MANDATORY (Default: Y, fetched from Monthly Allotment Statement) ---
    { name: "3 OMs & BHAJAN ON GANESH", nature: "Mandatory", code: "M", defaultOption: "Y", validOptions: ["Y"] },
    { name: "BHAJAN ON GURU BHAGWAN", nature: "Mandatory", code: "M", defaultOption: "Y", validOptions: ["Y"] },
    { name: "BHAJAN ON GODDESS DEVI MAA", nature: "Mandatory", code: "M", defaultOption: "Y", validOptions: ["Y"] },
    { name: "SARVA DHARMA BHAJAN", nature: "Mandatory", code: "M", defaultOption: "Y", validOptions: ["Y"] },
    { name: "BHAJAN ON LORD HANUMAR", nature: "Mandatory", code: "M", defaultOption: "Y", validOptions: ["Y"] },
    { name: "BHAJAN ON GOD SUBRAMANYAR", nature: "Mandatory", code: "M", defaultOption: "Y", validOptions: ["Y"] },
    { name: "MANGALA AARTHI & VIB MANTRA", nature: "Mandatory", code: "M", defaultOption: "Y", validOptions: ["Y"] },

    // --- CODE S: SEMI-MANDATORY (Default: Y, automatically switches to N if Satsang is Y) ---
    { name: "BHAJAN ON LORD RAMAR", nature: "Semi-Mandatory", code: "S", defaultOption: "Y", validOptions: ["Y", "N"] },
    { name: "BHAJAN ON LORD KRISHNAR", nature: "Semi-Mandatory", code: "S", defaultOption: "Y", validOptions: ["Y", "N"] },
    { name: "BHAJAN ON LORD SHIVA", nature: "Semi-Mandatory", code: "S", defaultOption: "Y", validOptions: ["Y", "N"] },
    { name: "BHAJAN ON OUR DEAR SWAMI", nature: "Semi-Mandatory", code: "S", defaultOption: "Y", validOptions: ["Y", "N"] },
    { name: "BHAJAN ON LORD VITTHALA", nature: "Semi-Mandatory", code: "S", defaultOption: "Y", validOptions: ["Y", "N"] },
    { name: "BHAJAN ON NARAYANA / HARI / GOVINDA", nature: "Semi-Mandatory", code: "S", defaultOption: "Y", validOptions: ["Y", "N"] },
    { name: "BHAJAN ON SWAMI AYYAPPAN", nature: "Semi-Mandatory", code: "S", defaultOption: "Y", validOptions: ["Y", "N"] },

    // --- CODE S (Optional Row): SWAMI'S CHOICE ---
    { name: "SWAMI's CHOICE", nature: "Optional", code: "S", defaultOption: "Y", validOptions: ["Y", "N"] },

    // --- CODE T: SATSANG SPECIAL ENTRY (Default: N, changes to Y based on operational need) ---
    { name: "SATSANG", nature: "Optional", code: "T", defaultOption: "N", validOptions: ["Y", "N"] }
];

// Freeze configuration matrix to enforce absolute run-time security
Object.freeze(BHAJAN_OFFERINGS_CONFIG);
