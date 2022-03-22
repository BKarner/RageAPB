import Player from './index';

import * as rpc from 'rage-rpc';
import * as LOGGER from '../../_debug/logger';
import Team from '../team';
import {invoke} from '../../natives';

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

// TODO: refactor this lmao.
let damagedPlayersThisTick: number[] = [];
let damagedPlayersPreviousTick: number[] = [];
let damagedPlayersLastTick: number[] = [];

mp.events.add('outgoingDamage', (source, target: EntityMp, player, weapon, bone, damage) => {
    if (target.type === 'player') {
        damagedPlayersThisTick.push(target.id);
    }
});

/**
 * Add our custom name-tags.
 */
mp.events.add('render', () => {
    // TODO: Refactor this.
    const maxDistance = 50;
    const width = 0.03;
    const height = 0.0065;
    const border = 0.001;
    const color = [255,255,255,255];

    const graphics = mp.game.graphics;
    const screenRes = graphics.getScreenResolution(0, 0);

    const streamedPlayers = mp.players.streamed;
    streamedPlayers.forEach((player) => {
        if (player === mp.players.local) {
            return;
        }

        const originPos = player.position;
        const playerPos = mp.players.local.position;
        const distance = originPos.subtract(playerPos).length();

        const isTarget = mp.game.player.isFreeAimingAtEntity(player.handle) || mp.game.player.isTargettingEntity(player.handle);
        const cantSeeTarget = mp.raycasting.testPointToPoint(playerPos, originPos, [player, mp.players.local], 17);

        if (cantSeeTarget && !isTarget) {
            return;
        }

        if (distance <= maxDistance || isTarget) {
            let scale = (distance / maxDistance);
            let newColor = color;

            // Change our colour to match team.
            const p = Player.pool.find((p) => p.ragePlayer === player);
            if (p && p.team !== 0) {
                if (p.team === Player.local.team) {
                    newColor = [0, 255, 0, 255];
                } else if (p && p.team === Team.pool[Player.local.team].enemyTeam) {
                    newColor = [255, 165, 0, 255];
                }
            }

            // Change our alpha based on distance, if we're not targeting the player.
            if (!isTarget) {
                const alpha = Math.min(1, Math.max(0, 1 - scale));
                newColor[3] = 255 * alpha;
            }

            let newZ = originPos.z + 1.2;
            let offset = (scale * ((screenRes.y / screenRes.x)));

            // If our offset is -, we need to multiply it so it doesn't cover the body long distance.
            if (offset >= 0.55) {
                offset *= 2;
            }

            newZ += Math.abs(offset);

            graphics.setDrawOrigin(originPos.x - 0.01, originPos.y, newZ, 0);
            if (damagedPlayersThisTick.indexOf(player.id) !== -1 || damagedPlayersPreviousTick.indexOf(player.id) !== -1 || damagedPlayersLastTick.indexOf(player.id) !== -1) {
                newColor = [255, 0, 0, 255];
            }
            graphics.drawText(player.name, [0, 0], {
                font: 4,
                color: newColor as RGBA,
                scale: [0.4, 0.4],
                outline: true
            });

            // TODO: Add this hash to native / extend graphics.
            invoke('0xFF0B610F6BE0D7AF', []);
        }
    });

    damagedPlayersLastTick = damagedPlayersPreviousTick;
    damagedPlayersPreviousTick = damagedPlayersThisTick;
    damagedPlayersThisTick = [];
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
