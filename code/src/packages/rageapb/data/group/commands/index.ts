import './defs';

import Player from '../../player';

import {PlayerGroupInvite} from '../types';

// TODO: Completely revisit this.

/**
 * Accept an invite sent to the player.
 *
 * TODO: Needs output reformatting + security.
 * TODO: Needs testing.
 * @param player The player accepting the invite.
 * @param _ Ignored fullText param.
 * @param invite The invite to accept.
 */
export function acceptInvite(player: PlayerMp, _:string, invite: number|string) {
    // TODO: Accepting an invite.

    // TODO: If a group in PlayerGroupInvite doesn't exist, check if the player who invited it has formed a new group and is leader join that one.
    // TODO: If the player who invited joined a different group where they are not leader, cancel the invite.
}

/**
 * Decline an invite sent to the player.
 *
 * TODO: Needs output reformatting + security.
 * TODO: Needs testing.
 * @param player The player declining the invite.
 * @param _ Ignored fullText param.
 * @param invite The invite to decline.
 */
export function declineInvite(player: PlayerMp, _:string, invite: number|string) {
    // TODO: Declining an invite.
}

/**
 * Cancel a group invitation.
 *
 * TODO: Needs output reformatting + security.
 * TODO: Needs testing.
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
 * TODO: Needs output reformatting + security.
 * TODO: Needs testing.
 * @param inviter The inviting player.
 * @param _ Ignored fullText param.
 * @param invitee The invitee's search parameter.
 */
export function invite(inviter: PlayerMp, _:string, invitee: number|string) {
    const [invitingPlayer, invitedPlayer] = <Array<Player>>Player.Search([inviter, invitee]);
    const timestamp = 0; // TODO: Get unix timestamp.

    if (!invitedPlayer) {
        inviter.outputChatBox('Could not find that player.');
        return;
    }

    // The player is in a group, do nothing.
    if (invitedPlayer.group) {
        inviter.outputChatBox('Player is already in a group.');
        return;
    }

    // Send the player the group invite.
    invitedPlayer.groupInvites.push({
        inviter: invitingPlayer,
        timestamp
    });

    // Output our sent messages.
    inviter.outputChatBox(`You have invited ${invitedPlayer.ragePlayer.name} to join your group.`);
    invitedPlayer.ragePlayer.outputChatBox(`${inviter.name} has invited you to join their group.`);
}

/**
 * Check the player's invites and print them out on screen.
 *
 * TODO: Needs output reformatting + security.
 * TODO: Needs testing.
 * @param player The player checking their invites.
 */
export function invites(player: PlayerMp) {
    const checkingPlayer = <Player>Player.Search(player);

    if (checkingPlayer) {
        player.outputChatBox('GROUP INVITES --- ')
        checkingPlayer.groupInvites.forEach((invite: PlayerGroupInvite, index: number) => {
            const {inviter} = invite;

            player.outputChatBox(`${inviter.name}\'s group (ID: ${index})`);
        });
    } else {
        console.log('[GROUP] invites() has failed.');
    }
}

/**
 * Kick a player from the group.
 *
 * TODO: Needs output reformatting + security.
 * TODO: Needs testing.
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
 * TODO: Needs output reformatting + security.
 * TODO: Needs testing.
 * @param player The player that wants to leave their group.
 */
export function leave(player: PlayerMp) {
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

/**
 * Print out the members that are in the player's group.
 *
 * TODO: Needs output reformatting + security.
 * TODO: Needs testing.
 * @param player The player that wants to check their groups' members.
 */
export function members(player: PlayerMp) {
    const checkingPlayer = <Player>Player.Search(player);

    if (checkingPlayer) {
        const group = checkingPlayer.group;
        if (!group) {
            player.outputChatBox(`You are not in a group.`);
            return;
        }

        player.outputChatBox('GROUP MEMBERS --- ');
        group.members.forEach((member: Player) => {
            const {name, serverID} = member;
            player.outputChatBox(`${(group.leader === member) ? '[LEADER] ' : ''}${name} (ID: ${serverID})`);
        });
    } else {
        console.log('[GROUP] members() has failed.');
    }
}

/**
 * Promote a group member to the group leader.
 *
 * TODO: Needs output reformatting + security.
 * TODO: Needs testing.
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
