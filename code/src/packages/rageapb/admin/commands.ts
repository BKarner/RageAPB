function createVehicle(player: PlayerMp, vehId: string) {
    console.log(mp.joaat(vehId));
    
    mp.vehicles.new(mp.joaat(vehId), player.position)

}

mp.events.addCommand('vspawn', createVehicle);