import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'umd', // UMD version for browser, and for Node (for Jest testing)
                name: 'U',
            },
            {
                file: 'dist/index.min.js',
                format: 'umd', // minified UMD version for browser
                name: 'U',
                plugins: [terser()],
            },
            {
                file: 'commonjs/index.js',
                format: 'cjs', // CommonJS version for node? Not even sure this is required.
            },
            {
                file: 'dist/index.esm.js',
                format: 'esm', // ES2015 modules version so consumers can tree-shake
            },
        ],
        plugins: [
            commonjs(),
            nodeResolve(),
            babel({ babelHelpers: 'bundled' }),
        ],
    },
    {
        input: 'src/index.test.js',
        output: [
            {
                file: 'commonjs/index.test.js',
                format: 'cjs',
            },
        ],
        plugins: [
            commonjs(),
            nodeResolve(),
            babel({ babelHelpers: 'bundled' }),
        ],
    },
];