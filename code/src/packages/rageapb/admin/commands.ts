// Creates a vehicle via admin command.
function createVehicle(player: PlayerMp, vehId: string) {
    if (vehId.trim().length > 0) {
        player.outputChatBox('Spawning vehicle!')
        mp.vehicles.new(mp.joaat(vehId), player.position)
    }
    else
        player.outputChatBox(`Command syntax:/aveh [vehicle_name]`);
}
mp.events.addCommand('aveh', createVehicle);



// Creates a weapon via admin command.
function createWeapon(player: PlayerMp, _: string, wepId: string, ammo: string) {
    if (wepId.trim().length > 0) {
        player.giveWeapon(mp.joaat("weapon_"+wepId), Number(ammo))
        player.outputChatBox('Spawning weapon!')
    }
    else
        player.outputChatBox(`Command syntax: /awep [weapon_name] [ammo_amount]`);
}
mp.events.addCommand('awep', createWeapon);


// Teleport to location via admin command.
function teleportToLocation(player: PlayerMp, _: string, x: string, y: string, z: string) {
    if (!isNaN(parseFloat(x)) && !isNaN(parseFloat(y)) && !isNaN(parseFloat(z)))
        player.position = new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z));
    else
        player.outputChatBox(`Command syntax: /tp [x] [y] [z]`);
}
mp.events.addCommand('tpto', teleportToLocation);


