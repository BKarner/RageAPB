const glob = window as any;

if (!glob.alt) {
    glob.alt = {
        emit: () => {},
        on: () => {}
    };
}

import rpc from 'rage-rpc';

rpc.init('gta-apb')

export default rpc;
