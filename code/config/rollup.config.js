import path from 'path';
import jetpack, { copy } from 'fs-jetpack';

import builtinModules from 'builtin-modules';

import typescript from '@rollup/plugin-typescript';

import jsonPlugin from '@rollup/plugin-json';
import commonjsPlugin from '@rollup/plugin-commonjs';
import typescriptPlugin from 'rollup-plugin-typescript2';
import nodeResolvePlugin from '@rollup/plugin-node-resolve';

import tsPaths from 'rollup-plugin-tsconfig-paths';

const pkgJson = jetpack.read('../package.json', 'json');
let localInstalledPackages = [];

if (pkgJson) {
    localInstalledPackages = [...Object.keys(pkgJson.dependencies)]
}

const SOURCE_PATH = path.resolve('src');
const BUILD_OUTPUT = '../gamemode';

/**
 * Resolve given path by fs-jetpack
 */
function resolvePath(pathParts) {
    return jetpack.path(...pathParts);
}

/**
 * Generate the config depending on if it's server or client.
 */
function generateConfig({isServer} = {}) {
    const tsConfigPath = resolvePath([SOURCE_PATH, isServer ? 'packages/' : 'client_packages', 'tsconfig.json']);
    const external = [...builtinModules, ...localInstalledPackages];

    return {
        'inlineDynamicImports': true,
        'external': isServer ? [...external] : null,

        'input': resolvePath([SOURCE_PATH, isServer ? 'packages/rageapb/': 'client_packages', 'index.ts']),
        'output': isServer ? {
            'dir': `${BUILD_OUTPUT}/packages/rageapb`,
            'format': 'cjs'
        } : {
            'file': `${BUILD_OUTPUT}/client_packages/index.mjs`,
            'format': 'cjs'
        },
        'plugins': [
            commonjsPlugin(),
            jsonPlugin(),
            nodeResolvePlugin(),
            tsPaths({tsConfigPath}),
            typescriptPlugin({check: false, tsconfig: tsConfigPath})
        ]
    };
}

export default [generateConfig({isServer: true}), generateConfig({isServer: false})];
