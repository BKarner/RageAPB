import './commands';

import Player from '../player';

type GroupInvite = {
    player: Player,
    timestamp: number
}

export type PlayerGroupInvite = {
    inviter: Player,
    group: Group,
    timestamp: number
}

/**
 * Handles a player group.
 */
class Group {
    public static pool: Array<Group> = [];

    public readonly members: Array<Player> = [];
    public readonly invites: Array<GroupInvite> = [];

    public leader: Player;

    constructor(leader: Player) {
        this.leader = leader;

        Group.pool.push(this);
    }

    /**
     * Add the given player to the group.
     *
     * @param player The player we want to add.
     */
    add(player: Player) {
        player.group = this;

        this.members.push(player);
    }

    /**
     * Remove the given player from the group.
     *
     * @param player The player we want to remove.
     */
    remove(player: Player) {
        player.group = undefined;

        this.members.slice(this.members.indexOf(player), 1);

        // If the player that is being removed is the leader, pick a new leader.
        if (player === this.leader) {
            this._replaceLeader();
        }

        // If the number of members is 0, remove the group.
        if (this.members.length === 0) {
            this._disbandGroup();
        }
    }

    /**
     * Remove all members of the group.
     */
    disband() {
        // TODO: Remove all members.
    }

    /**
     * Send an invite to the given player.
     *
     * @param player The player we want to invite.
     * @param timestamp The unix timestamp the invite was sent.
     */
    _invite(player: Player, timestamp: number) {
        if (this.members.indexOf(player) || player.group) {
            console.log('[GROUP] Player is already in a group.');
        } else {
            this.invites.push({
                player,
                timestamp
            });
        }
    }

    /**
     * Clear up any methods and properties of the group.
     */
    _disbandGroup() {
        // TODO: Cancel all invites.
        Group.pool.slice(Group.pool.indexOf(this, 1));
    }

    /**
     * Replace the current leader with the new leader.
     *
     * @param newLeader The player we want to set as the new leader.
     */
    _replaceLeader(newLeader?: Player) {
        // If we've tried to select a leader.
        if (newLeader) {
            // If the player exists in the group, assign leadership.
            if (this.members.indexOf(newLeader) !== -1) {
                this.leader = newLeader;
            } else {
                console.log('[GROUP] Somehow trying to make someone a leader of a group they\'re not in.');
            }
        } else {
            // The new leader is the first member to join the group.
            this.leader = this.members[0];
        }
    }
}

/**
 * Try and invite a player to a group.
 *
 * @param inviter The inviting player.
 * @param _ Ignored fullText param.
 * @param invitee The invitee's search parameter.
 */
export function groupInvite(inviter: PlayerMp, _:string, invitee: number|string) {
    const players = Player.Search([inviter, invitee]);
    const [invitingPlayer, invitedPlayer] = <Array<Player>>players;

    const timestamp = 0; // TODO: Get unix timestamp.

    if (invitingPlayer && invitedPlayer && invitingPlayer.group) {
        invitedPlayer.groupInvites.push({
            inviter: invitingPlayer,
            group: invitingPlayer.group,
            timestamp
        });

        invitingPlayer.group._invite(invitedPlayer, timestamp);
    } else {
        console.log('[GROUP] groupInvite() has failed.');
    }
}

export function groupKick() {

}

export function groupLeave() {

}

export function groupPromote() {

}

export default Group;
