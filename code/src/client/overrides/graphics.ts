import {invoke} from '../@natives';

export type GameGraphicsMpEx = GameGraphicsMp & {
    clearDrawOrigin: Function
}

const GRAPHICS = mp.game.graphics as GameGraphicsMpEx;


GRAPHICS.clearDrawOrigin = function () {
    invoke('0xFF0B610F6BE0D7AF', []);
}
