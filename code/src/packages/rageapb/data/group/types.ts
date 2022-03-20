import Player from '../player';
import Group from './index';

export type GroupInvite = {
    player: Player,
    timestamp: number
}

export type PlayerGroupInvite = {
    inviter: Player,
    group?: Group,
    timestamp: number
}

export type PlayerGroupInviteSent = {
    invitee: Player,
    group?: Group,
    timestamp: number
}
