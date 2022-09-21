import * as rpc from 'rage-rpc';

import {show} from '../../ui';

import {VEHICLES} from '@shared/constants/vehicles';
import {PLAYER_RPC} from '@shared/constants/rpc';

import {log} from '../../_debug/logger';

/**
 * Register our server event.
 */
rpc.register(PLAYER_RPC.EXAMINE_VEHICLE, () => {
    const player = mp.players.local;
    log('EXAMINING VEHICLE');

    const vehicle = mp.game.vehicle.getClosestVehicle(player.position.x, player.position.y, player.position.z, 30, 0, 0);
    const vehicleAct = mp.vehicles.at(vehicle);
    if (!vehicleAct) {
        return;
    }

    log('FOUND VEHICLE');

    const model = mp.game.vehicle.getDisplayNameFromVehicleModel(vehicleAct.model);
    const tempProperties = VEHICLES[model];

    show('VEHICLE_EXAMINE', tempProperties);
    log(`SHOWING PAGE - ${tempProperties.type}`);
});
