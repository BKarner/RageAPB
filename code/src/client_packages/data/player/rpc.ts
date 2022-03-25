import * as rpc from 'rage-rpc';

import Player from './index';

import * as LOGGER from '../../_debug/logger';

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
