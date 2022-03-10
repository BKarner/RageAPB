// Creates a vehicle via admin command.
function createVehicle(player: PlayerMp, vehId: string) {
    if (vehId.trim().length > 0) {
        player.outputChatBox('<b>Spawning vehicle!</b>')
        mp.vehicles.new(mp.joaat(vehId), player.position)
    }
    else
        player.outputChatBox(`<b>Command syntax:</b> /aveh [vehicle_name]`);
}
mp.events.addCommand('aveh', createVehicle);



// Creates a weapon via admin command.
function createWeapon(player: PlayerMp, _: string, wepId: string, ammo: string) {
    if (wepId.trim().length > 0) {
        player.giveWeapon(mp.joaat(wepId), Number(ammo))
        player.outputChatBox('<b>Spawning weapon!</b>')
    }
    else
        player.outputChatBox(`<b>Command syntax:</b> /awep [weapon_name] [ammo_amount]`);
}
mp.events.addCommand('awep', createWeapon);