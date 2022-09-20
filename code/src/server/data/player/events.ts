import Player from './index';
import {DEATH_REASONS} from '@shared/constants/hashes';

/**
 * When a player joins the server, add it to our players.
 */
mp.events.add('playerJoin', (player: PlayerMp) => {
    const id = Player.GetNewServerID();
    console.log(`Creating Player object for ID: ${id}`);

    new Player(player, id);
});

/**
 * When a player leaves the server, free it from our list.
 */
mp.events.add('playerQuit', (player: PlayerMp) => {
    const id = Player.pool.findIndex((e) => e?.ragePlayer === player);
    console.log(`Releasing Player object for ID: ${id}`);

    // Remove our new player from the pool.
    Player.pool[id] = null;
});


// TODO: Temp respawn.
mp.events.add('playerDeath', (player, reason, killer) => {
    const {description} = DEATH_REASONS[reason];
    const killerName = killer?.name ?? 'Unknown';
    const playerName = player?.name ?? 'Unknown';

    mp.players.broadcast((`${killerName} killed ${playerName}. Reason: ${description}`));

    setTimeout(() => {
        player.spawn(new mp.Vector3(player.position.x, player.position.y, player.position.z));
    }, 3000);
});

