import * as rpc from 'rage-rpc';

import {UI_RPC} from '@shared/constants/rpc';

/**
 * Instantiate our browser.
 */
export const BROWSER = mp.browsers.new('package://index.html')
BROWSER.active = true;

export function trigger(name: string, args?: any) {
    if (!BROWSER) { return; }

    rpc.triggerBrowser(BROWSER, name, args);
}

export function show(page: string, args?: any) {
    trigger(UI_RPC.SHOW_PAGE, [page, args]);
}

export function hide(page: string) {
    trigger(UI_RPC.HIDE_PAGE, page);
}
