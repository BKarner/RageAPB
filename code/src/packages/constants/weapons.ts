type GTAWeaponStats = {
    damage: {
        default: number,
        headshot: number,
        armor: number,
        limb: number
    },
    fireRate: number, // 0.001 = 1 millisecond. 1 = 1 round per second. 0.37 = 2.7 rounds per second = 162 rounds per minute.
    range: {
        meters: number,
        feet: number
    }
}
type WeaponSettings = {
    /**
     * The shorthand name we give it.
     */
    name: string,

    /**
     * The RageMP id of the weapons.
     *
     * @link https://wiki.rage.mp/index.php?title=Weapons
     */
    id: string,

    /**
     * The joaat'ed hash of the weapon.
     */
    hash: number,

    /**
     * The detailed size of magazines and the modifiers that change it
     *
     * @example - 'extended': 16, because the extended magazine holds 16 rounds.
     */
    magazineSize: {
        stock: number,
        extended?: number,
        drum?: number
    },

    /**
     * How much ammo can the player carry without resupplying.
     */
    reserveAmmo: number,

    /**
     * The stock game stats, for reference.
     *
     * @example https://gta.fandom.com/wiki/Pistol#GTA_V.2FGTA_Online_Overview
     */
    gameStats: GTAWeaponStats,

    /**
     * The percentage modifier of damage to deal. 1 by default (100%).
     */
    damageMod?: number;
};

/**
 * All the weapon details we need.
 */
export const WEAPONS: {[key: string]: WeaponSettings} = {
    // Handguns.
    'PISTOL': {
        'name': 'pistol',
        'id': 'weapon_pistol',
        'hash': 0,
        'magazineSize': {
            'stock': 12,
            'extended': 16
        },
        'gameStats': {
            'damage': {
                'default': 26,
                'limb': 13,
                'armor': 19.5,
                'headshot': 52
            },
            'fireRate': 0.37, // (162 rounds per minute).
            'range': {
                'meters': 120,
                'feet': 394,
            }
        },
        'reserveAmmo': 192 // (stock * extended)
    },

    // ARs.
    'ASSAULT_RIFLE': {
        'name': 'assault rifle',
        'id': 'weapon_assaultrifle',
        'hash': 0,
        'magazineSize': {
            'stock': 30,
            'extended': 60,
            'drum': 100
        },
        'gameStats': {
            'damage': {
                'default': 30,
                'limb': 15,
                'armor': 22.5,
                'headshot': 51
            },
            'fireRate': 0.158, // (380 rounds per minute)
            'range': {
                'meters': 120,
                'feet': 394
            }
        },
        'reserveAmmo': 1800
    }
}

// Pre-hash all of our weapons.
for (const [name, weapon] of Object.entries(WEAPONS)) {
    if (!weapon.hash) {
        weapon.hash = mp.joaat(weapon.id);
    }
}
