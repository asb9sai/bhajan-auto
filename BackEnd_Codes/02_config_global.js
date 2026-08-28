/**
 * ============================================================================
 * SCRIPT NO     : 02
 * SCRIPT NAME   : 02_config_global.js
 * PATH SAVED    : D:\COMMON PYTHON\HTMLBJNAUTO\BackEnd_Codes\
 * PURPOSE       : Stores central immutable settings like group metadata, short
 *                 forms, schedules, time variables, and theme tokens.
 * PLATFORMS     : Unified execution layer for Laptop and Mobile environments.
 * ============================================================================
 */

const BHAJAN_GROUPS_CONFIG = [
    {
        id: "WED",
        name: "AS Wednesday Group",
        scheduleType: "WEEKLY",
        targetDay: 3, 
        skipOnDays: [],
        startTime: "3.40 PM",
        openTime: "3.35 PM",
        purpose: "Conducts bhajan on all Wednesdays"
    },
    {
        id: "FRI",
        name: "AS Friday Group",
        scheduleType: "WEEKLY",
        targetDay: 5, 
        skipOnDays: [],
        startTime: "3.40 PM",
        openTime: "3.35 PM",
        purpose: "Conducts bhajan on all Fridays"
    },
    {
        id: "ARD",
        name: "AS Ardra Group",
        scheduleType: "STAR_DAY",
        starName: "Ardra",
        skipOnDays: [], // 🌟 FIXED: Changed from 'skipOnDays:,' to empty brackets
        startTime: "8.30 PM",
        openTime: "8.25 PM",
        purpose: "Conducts bhajan on the ARDRA STAR DAY every month if not falling on Wednesdays & Fridays"
    },
    {
        id: "MAH",
        name: "AS Mahilas Group",
        scheduleType: "FIXED_DATE",
        targetDate: 19, 
        skipOnDays: [], // 🌟 FIXED: Changed from 'skipOnDays:,' to empty brackets
        startTime: "8.30 PM",
        openTime: "8.25 PM",
        purpose: "Conducts bhajan on the 19th of every month if not falling on Wednesdays & Fridays"
    },
    {
        id: "SPL",
        name: "AS Special Bhajan Group",
        scheduleType: "SPECIAL_OCCASION",
        startTime: "1:00 PM",
        openTime: "12.55 PM",
        purpose: "Conducts bhajan on special occasions"
    },
    {
        id: "PRM",
        name: "AS Permanent Group",
        scheduleType: "PERMANENT",
        startTime: "3.40 PM", 
        openTime: "3.35 PM",
        purpose: "Permanent schedule configurations"
    }
];

// System Theme & Colors configuration to prevent hardcoded styles in logic files
const UI_STYLE_CONFIG = {
    disabledButtonClass: "muted-grey-btn",
    activeGroupClass: "highlight-blue-card",
    themeColors: {
        primary: "#003399",
        backgroundMuted: "#EAEAEA",
        headerBackground: "#FFD1DC"
    }
};

// Freeze configurations so no background script can accidentally alter them during runtime
Object.freeze(BHAJAN_GROUPS_CONFIG);
Object.freeze(UI_STYLE_CONFIG);
