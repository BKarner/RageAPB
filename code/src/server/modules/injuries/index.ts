import './downed';

/**
 * Have an event for when the player takes damage.
 */
mp.events.add('playerDamage', (player: PlayerMp, hpLoss: number, armorLoss: number) => {
    console.log(`${player.name} has taken damage: -${hpLoss} health and -${armorLoss} armor`);
});
