import Player from './index';

/**
 * When a player joins the server, add it to our players.
 */
mp.events.add('playerJoin', (player: PlayerMp) => {
    console.log(`Creating Player object for ID: ${Player.GetNewServerID()}`);
    new Player(player, Player.GetNewServerID());
});

/**
 * When a player leaves the server, free it from our list.
 */
mp.events.add('playerQuit', (player: PlayerMp) => {
    const id = Player.pool.findIndex((e) => e?.ragePlayer === player);

    // Remove our new player from the pool.
    Player.pool[id] = null;
});
