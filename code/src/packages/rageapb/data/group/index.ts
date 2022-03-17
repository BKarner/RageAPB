import './commands';
import {GroupInvite} from './types';

import Player from '../player';

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
            this.replaceLeader();
        }

        // If the number of members is 1, remove the group.
        if (this.members.length === 1) {
            this.disband();
        }
    }

    /**
     * Replace the current leader with the new leader.
     *
     * @param newLeader The player we want to set as the new leader.
     */
    replaceLeader(newLeader?: Player) {
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

    /**
     * Remove all members of the group and cancel all invites.
     */
    disband() {
        this.members.forEach(( member: Player ) => {
            this.remove(member);
        });
    }

    /**
     * Cancel a group's player invite.
     *
     * @param player The player who we previously invited.
     */
    cancelInvite(player: Player) {
        const invite = this.invites.findIndex((e) => e.player === player);

        if (invite !== -1) {
            this.invites.slice(invite, 1);

            const playerInvite = player.groupInvites.findIndex((p) => p.group === this);
            player.groupInvites.slice(playerInvite, 1);
        }
    }

    /**
     * Send an invite to the given player.
     *
     * @param player The player we want to invite.
     * @param timestamp The unix timestamp the invite was sent.
     */
    invite(player: Player, timestamp: number) {
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
        this.invites.forEach((invite: GroupInvite ) => {
            this.cancelInvite(invite.player);
        });

        Group.pool.slice(Group.pool.indexOf(this, 1));
    }
}

export default Group;
export {GroupInvite, PlayerGroupInvite} from './types';
