"use strict";
function setArmour(player) {
    player.armour = 100;
}
mp.events.addCommand('armour', setArmour);
