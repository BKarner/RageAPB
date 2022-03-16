import './defs';

import Player from '../../player';

export function acceptInvite() {
    // TODO: Accepting an invite.
}

export function declineInvite() {
    // TODO: Declining an invite.
}

/**
 * Cancel a group invitation.
 *
 * @param inviter The inviting player.
 * @param _ Ignored fullText param.
 * @param invitee The invitee's search parameter.
 */
export function cancelInvite(inviter: PlayerMp, _:string, invitee: number|string) {
    const [invitingPlayer, invitedPlayer] = <Array<Player>>Player.Search([inviter, invitee]);


    if (invitingPlayer && invitedPlayer) {
        const {group} = invitingPlayer;
        if (!group) {
            return;
        }

        group.cancelInvite(invitedPlayer);
    } else {
        console.log('[GROUP] cancelInvite() has failed.');
    }
}

/**
 * Try and invite a player to a group.
 *
 * @param inviter The inviting player.
 * @param _ Ignored fullText param.
 * @param invitee The invitee's search parameter.
 */
export function invite(inviter: PlayerMp, _:string, invitee: number|string) {
    const [invitingPlayer, invitedPlayer] = <Array<Player>>Player.Search([inviter, invitee]);
    const timestamp = 0; // TODO: Get unix timestamp.

    if (invitingPlayer && invitedPlayer) {
        // The player is not in a group, do nothing.
        const {group} = invitingPlayer;
        if (!group) {
            return;
        }

        invitedPlayer.groupInvites.push({
            inviter: invitingPlayer,
            group,
            timestamp
        });

        group.invite(invitedPlayer, timestamp);
    } else {
        console.log('[GROUP] invite() has failed.');
    }
}

export function invites() {
    // TODO: Invites.
}

/**
 * Kick a player from the group.
 *
 * @param kicker The person attempting to kick the player.
 * @param _ The ignored fulltext param.
 * @param kickee The player being kicked.
 */
export function kick(kicker: PlayerMp, _:string, kickee: number|string) {
    const [kickingPlayer, kickedPlayer] = <Array<Player>>Player.Search([kicker, kickee]);

    if (kickedPlayer && kickingPlayer) {
        const group = kickingPlayer.group;
        if (!group || group.leader !== kickingPlayer) {
            return;
        }

        group.remove(kickedPlayer);
    } else {
        console.log('[GROUP] kick() has failed.');
    }
}

/**
 * Allow the player to leave their group, if they're in one.
 *
 * @param player The player that wants to leave their group.
 * @param _ Ignored fullText param.
 */
export function leave(player: PlayerMp, _:string) {
    const leavingPlayer = <Player>Player.Search(player);

    if (leavingPlayer) {
        const group = leavingPlayer.group;
        if (!group) {
            return;
        }

        group.remove(leavingPlayer);
    } else {
        console.log('[GROUP] leave() has failed.');
    }
}

export function members() {
    // TODO: Members
}

/**
 * Promote a group member to the group leader.
 *
 * @param promoter The person who is trying to promote.
 * @param _ Ignored fullText param.
 * @param promotee The person being promoted.
 */
export function promote(promoter: PlayerMp, _:string, promotee: number|string) {
    const [promotingPlayer, promotedPlayer] = <Array<Player>>Player.Search([promoter, promotee]);

    if (promotingPlayer && promotedPlayer) {
        const group = promotingPlayer.group;
        if (!group) {
            return;
        }

        group.replaceLeader(promotedPlayer);
    } else {
        console.log('[GROUP] promote() has failed.');
    }
}
