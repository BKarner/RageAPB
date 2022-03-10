import Player from './index';

import * as rpc from 'rage-rpc';
import * as LOGGER from '../../_debug/logger';

/**
 * When a player joins, create a player class for it.
 */
mp.events.add('playerJoin', (player: PlayerMp) => {
    new Player(player, false);
});

/**
 * When THE client joins, create a player class for it.
 */
mp.events.add('playerReady', (player: PlayerMp) => {
    new Player(mp.players.local, true);

    // Createa a player for each other player on the server.
    mp.players.forEach((ragePlayer: PlayerMp) => {
        new Player(ragePlayer, false);
    });
});

/**
 * Destroy the quitting player's object.
 */
mp.events.add('playerQuit', (player: PlayerMp) => {
    const id = Player.pool.findIndex((e) => e.ragePlayer === player);

    // Remove our new player from the pool.
    Player.pool.splice(id, 1);
});

/**
 * Register our server event.
 */
rpc.on('ServerSetTeam', ([playerID, team]) => {
    const ragePlayer = mp.players.atRemoteId(playerID);
    const player = Player.pool.find((entity: Player) => entity.ragePlayer === ragePlayer);

    if (player) {
        mp.gui.chat.push(`SETTING PLAYER: ${ragePlayer.id} TEAM TO: ${team}`);
        player.team = team;
    } else {
        LOGGER.error(`Tried so assign player: ${playerID} to team ${team} but player does not exist on client.`);
    }
});
