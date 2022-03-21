import Player from './index';

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
