import {ItemSettings, ITEMS} from '@shared/constants/items';

type VehicleComponent = {
    doesExist: boolean,
    health: number,
    item?: ItemSettings
}

type VehicleFluidComponent = VehicleComponent & {
    capacity: number,
    remaining: number
}

type VehicleWheelComponent = VehicleComponent & {
    suspension: VehicleComponent,
    brake: VehicleComponent,
    tyre: VehicleComponent
}

export type VehicleSettings = {
    name: string,
    id: string,
    hash: number,
    type: string

    engine: VehicleComponent,
    battery: VehicleComponent,
    muffler: VehicleComponent,

    gasTank: VehicleFluidComponent,

    headlights: VehicleComponent[],
    tailLights: VehicleComponent[],
    wheels: VehicleWheelComponent[]
}

const ENGINE_DEFAULT: VehicleComponent = { doesExist: true, health: 100, item: ITEMS.engineDefault};
const BATTERY_DEFAULT: VehicleComponent = { doesExist: true, health: 100, item: ITEMS.batteryDefault};
const MUFFLER_DEFAULT: VehicleComponent = { doesExist: true, health: 100, item: ITEMS.mufflerDefault};
const LIGHT_DEFAULT: VehicleComponent = { doesExist: true, health: 100, item: ITEMS.lightDefault};

const GAS_TANK_DEFAULT: VehicleFluidComponent = { doesExist: true, health: 100, item: ITEMS.gasTankDefault, capacity: 100, remaining: 100};

const SUSPENSION_DEFAULT: VehicleComponent = { doesExist: true, health: 100, item: ITEMS.suspensionDefault};
const BRAKE_DEFAULT: VehicleComponent = { doesExist: true, health: 100, item: ITEMS.brakeDefault};
const TYRE_DEFAULT: VehicleComponent = { doesExist: true, health: 100, item: ITEMS.tyreDefault};
const WHEEL_DEFAULT: VehicleWheelComponent = { doesExist: true, health: 100, suspension: SUSPENSION_DEFAULT, brake: BRAKE_DEFAULT, tyre: TYRE_DEFAULT};


export const VEHICLES: {[key: string]: VehicleSettings} = {
    // Motorcycles
    'BAGGER': {
        name: 'Western Bagger',
        id: 'bagger',
        hash: 0x806B9CC3,
        type: 'harley',

        engine: ENGINE_DEFAULT,
        battery: BATTERY_DEFAULT,
        muffler: MUFFLER_DEFAULT,
        gasTank: GAS_TANK_DEFAULT,

        headlights: [
            LIGHT_DEFAULT
        ],
        tailLights: [
            LIGHT_DEFAULT
        ],

        wheels: [
            WHEEL_DEFAULT,
            WHEEL_DEFAULT
        ]
    }
}
