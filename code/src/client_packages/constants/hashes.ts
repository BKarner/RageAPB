import {TEXTURES} from './textures';

type DeathReason = {
    description: string,
    icon: string
}

/**
 * The reasons one could die, the description and image associated with such.
 */
export const DEATH_REASONS: {[key: string]: DeathReason} = {
    "453432689": {description: 'Pistol', icon: TEXTURES.WEAPONS.pistol},
}
