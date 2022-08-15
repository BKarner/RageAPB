import Player from './index';

import {DEATH_REASONS} from '../../../@shared/constants/hashes';

/**
 * When a player joins, create a player class for it.
 */
mp.events.add('playerJoin', (player: PlayerMp) => {
    new Player(player, false);
});

/**
 * When THE client joins, create a player class for it.
 */
mp.events.add('playerReady', () => {
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
 * Make a kill-feed.
 *
 * // TODO: Move this over to a CEF or drawtext interface? Probably drawtext/sprite.
 */
mp.events.add('playerDeath', (player: PlayerMp, reason: number, killer: PlayerMp) => {
    const {description} = DEATH_REASONS[reason];
    const killerName = killer?.name ?? 'Unknown';
    const playerName = player?.name ?? 'Unknown';

    mp.gui.chat.push(`${killerName} killed ${playerName}. Reason: ${description}`);
});
