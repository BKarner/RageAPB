import Player from './index';
import Team from '../team';

// Pull in our game graphics and override them.
import {GameGraphicsMpEx} from '../../overrides/graphics';
const GRAPHICS = mp.game.graphics as GameGraphicsMpEx;

type DamagedPlayers = {
    entity: number,
    ticksRemaining: number
}

const TICKS_TO_DISPLAY = 3;
const MAX_DISTANCE = 50;
const DAMAGED_PLAYERS: DamagedPlayers[] = [];

const TEAM_COLORS = {
    // R - G - B - A
    'FRIENDLY': [0, 255, 0, 255], // Green
    'ENEMY'   : [255, 165, 0, 255], // Orange,
    'HIT'     : [255, 0, 0, 255], // Damaged
    'NEUTRAL' : [255, 255, 255, 255]
}


/**
 * When a player takes damage, check to see if it was this player that has taken damage so that we can do some form of hit marker.
 */
mp.events.add('outgoingDamage', (source, target: EntityMp) => {
    if (target.type === 'player') {
        DAMAGED_PLAYERS.push({
            entity: target.id,
            ticksRemaining: TICKS_TO_DISPLAY
        });
    }
});

/**
 * Get the team colour relative to the local player's team.
 *
 * @param player The player we're checking for.
 */
function getTeamColor(player: PlayerMp) {
    const playerObj = Player.pool.find((p) => p.ragePlayer === player);
    if (!playerObj || playerObj.team === 0) { return TEAM_COLORS.NEUTRAL; }

    if (playerObj.team === Player.local.team) {
        return TEAM_COLORS.FRIENDLY;
    }

    const {enemyTeam} = Team.pool[Player.local.team];
    if (playerObj.team === enemyTeam) {
        return TEAM_COLORS.ENEMY;
    }

    return TEAM_COLORS.NEUTRAL;
}

/**
 * Calculate the new Z position for the graphic display.
 *
 * @param originPos The original position to display from.
 * @param scale The current scale from the camera that the player is.
 */
function calculateNewZ(originPos: Vector3Mp, scale: number) {
    const { graphics } = mp.game;
    const screenRes = graphics.getScreenResolution(0, 0);

    let newZ = originPos.z + 1.2;
    let offset = (scale * ((screenRes.y / screenRes.x)));

    // If our offset is enough, we need to multiply it so it doesn't cover the body long distance.
    if (offset >= 0.55) {
        offset *= 2;
    }

    newZ += Math.abs(offset);
    return newZ;
}

/**
 * Add our custom name-tags.
 */
mp.events.add('render', () => {
    const streamedPlayers = mp.players.streamed;
    streamedPlayers.forEach((player) => {
        if (player === mp.players.local) {
            return;
        }

        const originPos = player.position;
        const playerPos = mp.players.local.position;

        const isTarget = mp.game.player.isFreeAimingAtEntity(player.handle) || mp.game.player.isTargettingEntity(player.handle);
        const cantSeeTarget = mp.raycasting.testPointToPoint(playerPos, originPos, [player, mp.players.local], 17);

        if (cantSeeTarget && !isTarget) {
            return;
        }

        // Calculate our distance from the player by subtracting player B's location vector from player A's location vector and checking the length.
        const distance = originPos.subtract(playerPos).length();
        if (distance <= MAX_DISTANCE || isTarget) {
            let scale = (distance / MAX_DISTANCE);

            // Change our colour to match team.
            let newColor = getTeamColor(player)

            // Change our alpha based on distance, if we're not targeting the player.
            if (!isTarget) {
                const alpha = Math.min(1, Math.max(0, 1 - scale));
                newColor[3] = 255 * alpha;
            }

            // Set the draw origin to just above the player's head.
            GRAPHICS.setDrawOrigin(originPos.x - 0.01, originPos.y, calculateNewZ(originPos, scale), 0);

            // Check to see if we've damaged the player that's streamed. Then change their name-tag to red if we have done.
            const damagedResult = DAMAGED_PLAYERS.find((e) => e.entity === player.id)
            if (damagedResult) {
                newColor = TEAM_COLORS.HIT;
                damagedResult.ticksRemaining--;
            }

            // Draw the graphic above their head.
            GRAPHICS.drawText(player.name, [0, 0], {
                font: 4,
                color: newColor as RGBA,
                scale: [0.4, 0.4],
                outline: true
            });

            // Clear our draw origin.
            GRAPHICS.clearDrawOrigin();
        }
    });
});
