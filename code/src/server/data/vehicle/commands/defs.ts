import {addCommand} from '../../../@lib/commandManager';

import * as VehicleCommands from './index';

addCommand('vex', ['vehicle'], VehicleCommands.examine, ['vexamine'])
