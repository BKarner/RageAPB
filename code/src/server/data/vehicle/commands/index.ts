import * as rpc from 'rage-rpc';

import './defs';

import {PLAYER_RPC} from '@shared/constants/rpc';

/**
 * Examine the closest vehicle to the given player.
 *
 * @param player The player issuing the command.
 */
export async function examine(player: PlayerMp) {
    await rpc.callClient(player, PLAYER_RPC.EXAMINE_VEHICLE);
}
