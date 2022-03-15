import {addCommand} from '../../lib/commandManager';
import {groupInvite, groupKick, groupLeave, groupPromote} from './index';

addCommand('ginvite', ['group'], groupInvite);
addCommand('gkick', ['group'], groupKick);
addCommand('gleave', ['group'], groupLeave);
addCommand('gpromote', ['group'], groupPromote);
