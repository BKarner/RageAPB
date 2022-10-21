/**
 * The colours of players relative to their team/status in R-G-B-A format.
 */
export const TEAM_COLORS = {
    'FRIENDLY': [0, 255, 0, 255], // Green
    'FRIENDLY_INJURED': [87, 153, 87, 255], // Weak Green

    'ENEMY'   : [255, 165, 0, 255], // Orange
    'ENEMY_INJURED': [173, 145, 94, 255], // Weak Orange.

    'HIT'     : [255, 0, 0, 255], // Damaged
    'NEUTRAL' : [255, 255, 255, 255]
}

/**
 * The colours of chat strings in an R-G-B-A format.
 */
export const CHAT_COLORS = {
    RP: {
        EMOTE: [],
        SAY_MAX_RANGE: [],
        SAY_MIN_RANGE: []
    },
    PERSONAL: {
        PM: []
    },
    MISC: {

    },
    ADMIN: {

    }
}

type RGBA = [number, number, number, number];
export function RGBAToHex(colours: RGBA): string {
    return '';
}

/**
 * Convert a HTML compatible hex/hash value to an RGBA formatted array.
 * 
 * @param colour - The stringified hex value.
 */
export function HexToRGBA(colour: string) : RGBA {
    if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(colour) && !/^#([A-Fa-f0-9]{4}){1,2}$/.test(colour)) {
        return [-1, -1, -1, -1];
    }

    return [
        parseInt(colour.substring(1, 3), 16),
        parseInt(colour.substring(3, 5), 16),
        parseInt(colour.substring(5, 7), 16),
        parseInt(colour.substring(7, 9), 16),
    ]
}
