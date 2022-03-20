import './defs';

import Group from '../index';
import Player from '../../player';

import {PlayerGroupInvite} from '../types';

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

    if (invitingPlayer && invitedPlayer) {
        // The player is not in a group, do nothing.
        if (invitedPlayer.group) {
            inviter.outputChatBox('Player is already in a group.');

            return;
        }

        // TODO: Do this better, only create the group if an invite is accepted.
        let group = invitingPlayer.group;
        if (!group) {
            invitingPlayer.group = new Group(invitingPlayer);
            group = invitingPlayer.group;
        }

        invitedPlayer.groupInvites.push({
            inviter: invitingPlayer,
            group,
            timestamp
        });

        inviter.outputChatBox(`You have invited ${invitedPlayer.ragePlayer.name} to join your group.`);
        invitedPlayer.ragePlayer.outputChatBox(`${inviter.name} has invited you to join their group.`);

        group.invite(invitedPlayer, timestamp);
    } else {
        console.log('[GROUP] invite() has failed.');
        if (!invitingPlayer) {
            console.log('[GROUP] no inviting player');
        }

        if (!invitedPlayer) {
            console.log('[GROUP] no invited player');
        }
    }
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
            const {inviter, group} = invite;

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
