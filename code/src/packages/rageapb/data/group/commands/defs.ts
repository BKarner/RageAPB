import {addCommand} from '../../../lib/commandManager';

import * as GroupCommands from './index';

// Group Management.
addCommand('gkick',     ['group'], GroupCommands.kick);
addCommand('gpromote',  ['group'], GroupCommands.promote);
addCommand('ginvite',   ['group'], GroupCommands.invite,       ['gi']);
addCommand('gleave',    ['group'], GroupCommands.leave,        ['gquit']);
addCommand('guninvite', ['group'], GroupCommands.cancelInvite, ['gdeinvite']);

// Utility/Information.
addCommand('ginvites',       ['group'], GroupCommands.invites);
addCommand('gmembers',       ['group'], GroupCommands.members,       ['gm']);
addCommand('gacceptinvite',  ['group'], GroupCommands.acceptInvite,  ['ga', 'gaccept']);
addCommand('gdeclineinvite', ['group'], GroupCommands.declineInvite, ['gd', 'gdecline']);
