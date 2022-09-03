import './downed';
import {log} from '../../_debug/logger';

/**
 * Measure the outgoing damage for entities.
 */
mp.events.add('outgoingDamage', (source: EntityMp, target: EntityMp, sourcePlayer: PlayerMp, weapon: number, boneIndex: number, damage: number) => {
    if (target.type === 'player') {
        log(`${sourcePlayer} dealt ${damage} damage to an entity. (Wep: ${weapon}, Bone: ${boneIndex})`);
    } else {
        const targetPlayer = target as PlayerMp;
        log(`${sourcePlayer} dealt ${damage} damage to ${targetPlayer.name} . (Wep: ${weapon}, Bone: ${boneIndex})`);
    }
})

/**
 * Measure the incoming damage for entities.
 */
mp.events.add('incomingDamage', (source: EntityMp, sourcePlayer: PlayerMp, target: EntityMp, weapon: number, boneIndex: number, damage: number) => {
    log(`${sourcePlayer} dealt ${damage} damage to ${mp.players.local.name} . (Wep: ${weapon}, Bone: ${boneIndex})`);
});
