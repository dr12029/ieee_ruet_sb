// Gallery Data - Organized by Year and Event
// TODO: Replace with API call when backend is ready
// API endpoint will be: /api/gallery

/**
 * Helper function to generate image paths dynamically
 * @param {string} year - Year folder
 * @param {string} event - Event folder  
 * @param {number} count - Number of images
 * @returns {string[]} Array of image paths
 */
function generateImagePaths(year, event, count) {
    return Array.from({ length: count }, (_, i) => `/gallery/${year}/${event}/${i + 1}.jpg`);
}

/**
 * Gallery data structure:
 * {
 *   year: {
 *     eventSlug: {
 *       name: "Event Display Name",
 *       images: ["/gallery/year/eventSlug/image1.jpg", ...]
 *     }
 *   }
 * }
 */

export const galleryData = {
    2025: {
        agm: {
            name: "Annual General Meeting 2025",
            images: generateImagePaths("2025", "agm", 4),
        },
        expedition: {
            name: "Technical Expedition 2025",
            images: generateImagePaths("2025", "expedition", 12),
        },
        "school-visit": {
            name: "School Visit Program 2025",
            images: generateImagePaths("2025", "school-visit", 12),
        },
        "tech-trajectory": {
            name: "Tech Trajectory 2025",
            images: generateImagePaths("2025", "tech-trajectory", 8),
        },
        "yp-talk": {
            name: "Young Professionals Talk 2025",
            images: generateImagePaths("2025", "yp-talk", 2),
        },
    },
    2024: {
        ap_anniversary: {
            name: "AP Anniversary Celebration 2024",
            images: generateImagePaths("2024", "ap_anniversary", 5),
        },
        ieee_day: {
            name: "IEEE Day Celebration 2024",
            images: generateImagePaths("2024", "ieee_day", 5),
        },
        inception: {
            name: "Inception Program 2024",
            images: generateImagePaths("2024", "inception", 4),
        },
    },
    2023: {
        campus_to_industry: {
            name: "Campus to Industry 2023",
            images: generateImagePaths("2023", "campus_to_industry", 5),
        },
        EEEDAY2023: {
            name: "EEE Day 2023",
            images: generateImagePaths("2023", "EEEDAY2023", 8),
        },
        hopes_horizons: {
            name: "Hopes & Horizons 2023",
            images: generateImagePaths("2023", "hopes_horizons", 4),
        },
        ieee_day: {
            name: "IEEE Day 2023",
            images: generateImagePaths("2023", "ieee_day", 5),
        },
        reunited_refreshed: {
            name: "Reunited & Refreshed 2023",
            images: generateImagePaths("2023", "reunited_refreshed", 3),
        },
        sqa_2023: {
            name: "SQA 2023",
            images: generateImagePaths("2023", "sqa_2023", 8),
        },
        tajamae_iftaar: {
            name: "Tajamae Iftaar 2023",
            images: generateImagePaths("2023", "tajamae_iftaar", 1),
        },
    },
    2022: {
        agm_2022: {
            name: "AGM 2022",
            images: generateImagePaths("2022", "agm_2022", 9),
        },
        baghabari_tour: {
            name: "Baghabari Tour 2022",
            images: generateImagePaths("2022", "baghabari_tour", 6),
        },
        flood_help: {
            name: "Flood Help 2022",
            images: generateImagePaths("2022", "flood_help", 9),
        },
        higherstudies: {
            name: "Higher Studies Session 2022",
            images: generateImagePaths("2022", "higherstudies", 6),
        },
        ias_power_2022: {
            name: "IAS Power 2022",
            images: generateImagePaths("2022", "ias_power_2022", 4),
        },
        iftaar: {
            name: "Iftaar 2022",
            images: generateImagePaths("2022", "iftaar", 4),
        },
        ikcr: {
            name: "IKCR 2022",
            images: generateImagePaths("2022", "ikcr", 3),
        },
        induction2022: {
            name: "Induction 2022",
            images: generateImagePaths("2022", "induction2022", 8),
        },
        pes2_2022: {
            name: "PES 2 2022",
            images: generateImagePaths("2022", "pes2_2022", 12),
        },
        pes_2022: {
            name: "PES 2022",
            images: generateImagePaths("2022", "pes_2022", 12),
        },
        robotics: {
            name: "Robotics 2022",
            images: generateImagePaths("2022", "robotics", 4),
        },
        robotronics_2: {
            name: "Robotronics 2 2022",
            images: generateImagePaths("2022", "robotronics_2", 9),
        },
    },
    2021: {
        inspira_2021: {
            name: "Inspira 2021",
            images: generateImagePaths("2021", "inspira_2021", 9),
        },
        ras_iot: {
            name: "RAS IoT 2021",
            images: generateImagePaths("2021", "ras_iot", 4),
        },
        reception_programme: {
            name: "Reception Programme 2021",
            images: generateImagePaths("2021", "reception_programme", 12),
        },
    },
    2020: {
        humor: {
            name: "Humor 2020",
            images: generateImagePaths("2020", "humor", 3),
        },
        industrial_tour: {
            name: "Industrial Tour 2020",
            images: generateImagePaths("2020", "industrial_tour", 2),
        },
        matlab: {
            name: "MATLAB Workshop 2020",
            images: generateImagePaths("2020", "matlab", 3),
        },
        techshield_2020: {
            name: "Tech Shield 2020",
            images: generateImagePaths("2020", "techshield_2020", 3),
        },
        thesis_wie: {
            name: "Thesis WIE 2020",
            images: generateImagePaths("2020", "thesis_wie", 4),
        },
        vehicle: {
            name: "Vehicle Event 2020",
            images: generateImagePaths("2020", "vehicle", 4),
        },
    },
    2019: {
        agm_2019: {
            name: "AGM 2019",
            images: generateImagePaths("2019", "agm_2019", 3),
        },
        ai_japan: {
            name: "AI Japan 2019",
            images: generateImagePaths("2019", "ai_japan", 3),
        },
        ieee_day_2019: {
            name: "IEEE Day 2019",
            images: generateImagePaths("2019", "ieee_day_2019", 3),
        },
        plasmonic: {
            name: "Plasmonic Sensors 2019",
            images: generateImagePaths("2019", "plasmonic", 3),
        },
        power_electronics: {
            name: "Power Electronics 2019",
            images: generateImagePaths("2019", "power_electronics", 3),
        },
        thesis_paper_taz: {
            name: "Thesis Paper Presentation 2019",
            images: generateImagePaths("2019", "thesis_paper_taz", 3),
        },
    },
    2018: {
        ultimate: {
            name: "Ultimate Event 2018",
            images: generateImagePaths("2018", "ultimate", 16),
        },
    },
    2017: {
        endnote: {
            name: "EndNote Workshop 2017",
            images: generateImagePaths("2017", "endnote", 4),
        },
        extreme: {
            name: "IEEEXtreme 2017",
            images: generateImagePaths("2017", "extreme", 3),
        },
        ielts: {
            name: "IELTS Preparation 2017",
            images: generateImagePaths("2017", "ielts", 3),
        },
        latex_pcb: {
            name: "LaTeX & PCB Workshop 2017",
            images: generateImagePaths("2017", "latex_pcb", 3),
        },
        mobile_app_development: {
            name: "Mobile App Development 2017",
            images: generateImagePaths("2017", "mobile_app_development", 3),
        },
        refresh: {
            name: "Refresh 2017",
            images: generateImagePaths("2017", "refresh", 3),
        },
    },
    2016: {
        agm_16: {
            name: "AGM 2016",
            images: generateImagePaths("2016", "agm_16", 3),
        },
        app_dev: {
            name: "App Development 2016",
            images: generateImagePaths("2016", "app_dev", 4),
        },
        ieee_day_16: {
            name: "IEEE Day 2016",
            images: generateImagePaths("2016", "ieee_day_16", 4),
        },
        line_follower_maze_solver: {
            name: "Line Follower & Maze Solver 2016",
            images: generateImagePaths("2016", "line_follower_maze_solver", 4),
        },
        presentation: {
            name: "Presentation Skills 2016",
            images: generateImagePaths("2016", "presentation", 4),
        },
        "robo-droid": {
            name: "Robo-Droid 2016",
            images: generateImagePaths("2016", "robo-droid", 8),
        },
        seminar_matlab: {
            name: "MATLAB Seminar 2016",
            images: generateImagePaths("2016", "seminar_matlab", 4),
        },
    },
    2015: {
        day_15: {
            name: "IEEE Day 2015",
            images: generateImagePaths("2015", "day_15", 4),
        },
        green_brain: {
            name: "Green Brain 2015",
            images: generateImagePaths("2015", "green_brain", 4),
        },
        technical_paper: {
            name: "Technical Paper Presentation 2015",
            images: generateImagePaths("2015", "technical_paper", 4),
        },
    },
};

/**
 * Get all available years in descending order
 * @returns {string[]} Array of years
 */
export function getGalleryYears() {
    return Object.keys(galleryData).sort((a, b) => b - a);
}

/**
 * Get events for a specific year
 * @param {string} year - The year to get events for
 * @returns {Object} Object with event slugs as keys
 */
export function getYearEvents(year) {
    return galleryData[year] || {};
}

/**
 * Get event names for dropdown
 * @param {string} year - The year to get events for
 * @returns {Array} Array of {slug, name} objects
 */
export function getEventOptions(year) {
    const events = getYearEvents(year);
    return Object.keys(events).map(slug => ({
        slug,
        name: events[slug].name,
    }));
}

/**
 * Get images for a specific event
 * @param {string} year - The year
 * @param {string} eventSlug - The event slug
 * @returns {string[]} Array of image paths
 */
export function getEventImages(year, eventSlug) {
    return galleryData[year]?.[eventSlug]?.images || [];
}

/**
 * Get event name
 * @param {string} year - The year
 * @param {string} eventSlug - The event slug
 * @returns {string} Event name
 */
export function getEventName(year, eventSlug) {
    return galleryData[year]?.[eventSlug]?.name || "";
}
