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


// TODO: Temp respawn/kill feed.
mp.events.add('playerDeath', (player, reason, killer) => {
    const deathName = player.name;
    const killerName = killer?.name ?? 'Unknown';

    if(reason == 341774354) {
        mp.players.broadcast(`${deathName} died in a chopper!`);
        return;
    }

    setTimeout(() => {
        player.spawn(new mp.Vector3(player.position.x, player.position.y, player.position.z));
    }, 3000)

    mp.players.broadcast(`${killerName} killed ${deathName}. Reason: ${reason}`);
});
