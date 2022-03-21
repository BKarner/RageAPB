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
 * Add our custom name-tags.
 */
mp.events.add('render', (nametags) => {
    // TODO: Refactor this.
    const maxDistance = 1000;
    const width = 0.03;
    const height = 0.0065;
    const border = 0.001;
    const color = [255,255,255,255];

    const graphics = mp.game.graphics;
    const screenRes = graphics.getScreenResolution(0, 0);

    nametags.forEach((nametag: any) => {
        mp.gui.chat.push(JSON.stringify(nametag));

        let [player, x, y, distance] = nametag;

        if(distance <= maxDistance) {
            // TODO: Fix x/y positioning.
            let scale = (distance / maxDistance);
            y -= scale * (0.005 * (screenRes.y / screenRes.x));

            let size = Math.min(1, Math.max(0, 1 - scale));
            let newColor = color;

            // TODO: Change color based on team.
            newColor[3] = 255 * size;

            // TODO: Raytrace, only draw if heads can see eachother.
            graphics.drawText(player.name.replace('_', ' '), [x, y], {
                font: 4,
                // @ts-ignore
                color: newColor,
                scale: [0.4, 0.4],
                outline: true
            });
        }
    })
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
