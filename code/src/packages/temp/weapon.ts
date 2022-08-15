import {WEAPONS} from '../constants/weapons';

/**
 * Forcefully spawn the player.
 */
mp.events.add('playerJoin', (player: PlayerMp) => {
    player.spawn(new mp.Vector3(0,0,70));
});

/**
 * When a player spawns, ensure they have a pistol and full ammo.
 */
mp.events.add('playerSpawn', (player: PlayerMp) => {
    player.giveWeapon(WEAPONS.PISTOL.hash, WEAPONS.PISTOL.reserveAmmo);
});
