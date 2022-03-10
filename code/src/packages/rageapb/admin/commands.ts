// Creates a vehicle via admin command.
function createVehicle(player: PlayerMp, vehId: string) {
    mp.vehicles.new(mp.joaat(vehId), player.position)
}
mp.events.addCommand('aveh', createVehicle);



// Creates a weapon via admin command.
function createWeapon(player: PlayerMp, _: string, wepId: string, ammo: string) {
    console.log(mp.joaat("weapon_"+wepId), Number(ammo));
    player.giveWeapon(mp.joaat(wepId), Number(ammo))    
}
mp.events.addCommand('awep', createWeapon);
