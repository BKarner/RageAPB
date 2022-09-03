import {invoke} from '../@natives';
import {NATIVES} from '../@natives/player/consts';

export type GameGraphicsMpEx = GameGraphicsMp & {
    clearDrawOrigin: Function
}

const GRAPHICS = mp.game.graphics as GameGraphicsMpEx;


GRAPHICS.clearDrawOrigin = function () {
    invoke(NATIVES.ClearDrawOrigin, []);
}
