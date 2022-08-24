import path from 'path';

import jetpack, { copy } from 'fs-jetpack';

import builtinModules from 'builtin-modules';

import typescript from '@rollup/plugin-typescript';

import jsonPlugin from '@rollup/plugin-json';
import commonjsPlugin from '@rollup/plugin-commonjs';
import typescriptPlugin from 'rollup-plugin-typescript2';
import nodeResolvePlugin from '@rollup/plugin-node-resolve';
import tsPaths from 'rollup-plugin-tsconfig-paths';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { terser } from 'rollup-plugin-terser';


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

const PATHS = {
    'SERVER': 'server',
    'CLIENT': 'client',
    'WEB': '__html__'
}

const OUTPUTS = {
    'SERVER': {
        'dir': `${BUILD_OUTPUT}/packages/rageapb`,
        'format': 'cjs'
    },
    'CLIENT': {
        'file': `${BUILD_OUTPUT}/client_packages/index.mjs`,
        'format': 'cjs'
    },
    'WEB': {
        'file': `${BUILD_OUTPUT}/client_packages/__index.mjs`,
        'format': 'iife',
        'sourcemap': true,
    }
}

/**
 * Generate the config depending on if it's server or client.
 */
function generateSourceConfig({project} = {}) {
    const tsConfigPath = resolvePath([SOURCE_PATH, PATHS[project], 'tsconfig.json']);
    const external = [...builtinModules, ...localInstalledPackages];

    return {
        'inlineDynamicImports': true,
        'external': project === 'SERVER' ? [...external] : null,

        'input': resolvePath([SOURCE_PATH, PATHS[project], 'index.ts']),
        'output': OUTPUTS[project],
        'plugins': [
            commonjsPlugin(),
            jsonPlugin(),
            nodeResolvePlugin(),
            tsPaths({tsConfigPath}),
            typescriptPlugin({check: false, tsconfig: tsConfigPath})
        ]
    };
}

/**
 * Generate the config for the web.
 */
function generateWebConfig({project} = {}) {
    const tsConfigPath = resolvePath([SOURCE_PATH, PATHS[project], 'tsconfig.json']);

    return {
        'inlineDynamicImports': true,

        'input': resolvePath([SOURCE_PATH, PATHS[project], 'index.tsx']),
        'output': OUTPUTS[project],
        'plugins': [
            replace({
                'process.env.NODE_ENV': JSON.stringify('development'),
                'preventAssignment': true
            }),
            nodeResolvePlugin({
                browser: true,
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }),
            tsPaths({tsConfigPath}),
            typescriptPlugin({check: false, tsconfig: tsConfigPath}),
            commonjsPlugin({
                include: ['node_modules/**']
            }),
            babel({
                presets: ['@babel/preset-env', '@babel/preset-react'],
                exclude: 'node_modules/**',
                babelHelpers: 'bundled'
            }),
            serve({
                open: true,
                verbose: true,
                contentBase: ['../gamemode/client_packages'],
                historyApiFallback: true,
                host: 'localhost',
                port: 3000
            })
        ]
    };
}

export default [
    generateSourceConfig({project: 'SERVER'}),
    generateSourceConfig({project: 'CLIENT'}),
    generateWebConfig({project: 'WEB'})
];
