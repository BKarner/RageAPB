import {WEAPONS} from '../constants/weapons';

/**
 * When a player spawns, ensure they have a pistol and full ammo.
 */
mp.events.add('playerSpawn', (player: PlayerMp) => {
    player.giveWeapon(WEAPONS.PISTOL.hash, WEAPONS.PISTOL.reserveAmmo);
});
