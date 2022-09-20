import Player from './index';

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
