const path = require('path');
const _root = path.resolve(__dirname, '.');
const webpackMerge = require('webpack-merge');

/**
 * Helpers
 */
const helpers = {
    root: function (args) {
        args = Array.prototype.slice.call(arguments, 0);
        return path.join.apply(path, [_root].concat(args));
    },

    libVersion: require("./package.json").version
};

/**
 * Webpack Plugins
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * Webpack common configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
const commonConfig = (options = {}) => {
    return {
        /**
         * These options change how modules are resolved.
         *
         * See: https://webpack.js.org/configuration/resolve/
         */
        resolve: {
            /**
             * Automatically resolve certain extensions.
             *
             * See: https://webpack.js.org/configuration/resolve/#resolve-extensions
             */
            extensions: ['.ts']
        },

        /**
         * Instructs webpack to target a specific environment.
         *
         * See: https://webpack.js.org/concepts/targets/
         */
        target: 'web',

        /*
         * The entry point for the bundle
         *
         * See: http://webpack.github.io/docs/configuration.html#entry
         */
        entry: {
            'typescript-object-mapper': helpers.root('src/main', 'object-mapper.ts')
        },

        /**
         * Options affecting the output of the compilation.
         *
         * See: https://webpack.js.org/concepts/output/
         * See: https://webpack.js.org/configuration/output/
         */
        output: {
            /**
             * The output directory as an absolute path.
             *
             * See: https://webpack.js.org/configuration/output/#output-path
             */
            path: helpers.root('dist'),

            /**
             * Specifies the name of each output file on disk.
             * IMPORTANT: You must not specify an absolute path here!
             *
             * See: http://webpack.github.io/docs/configuration.html#output-filename
             */
            filename: '[name].js',

            /**
             * The variable will be bound with the return value of your entry file,
             * if the resulting output is included as a script tag in an HTML page.
             *
             * See: https://webpack.js.org/configuration/output/#output-library
             */
            library: "ObjectMapper"
        },

        /**
         * Configuration regarding modules.
         *
         * See: https://webpack.js.org/configuration/module/
         */
        module: {
            /**
             * Rules for modules (configure loaders, parser options, etc.)
             *
             * See: https://webpack.js.org/configuration/module/#module-rules
             */
            rules: [
                /**
                 * TypeScript loader for webpack
                 *
                 * See: https://github.com/TypeStrong/ts-loader
                 */
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: helpers.root('tsconfig.json'),
                        context: helpers.root('src/main'),
                        compilerOptions: options.compilerOptions || {}
                    }
                }
            ]
        },

        /**
         * Add additional plugins to the compiler.
         *
         * See: http://webpack.github.io/docs/configuration.html#plugins
         */
        plugins: [],

        /**
         * Developer tool to enhance debugging
         *
         * See: http://webpack.github.io/docs/configuration.html#devtool
         * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
         */
        devtool: 'source-map',

        /**
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        "node": {
            "fs": "empty",
            "global": true,
            "crypto": "empty",
            "tls": "empty",
            "net": "empty",
            "process": true,
            "module": false,
            "clearImmediate": false,
            "setImmediate": false
        }
    };
};

/**
 * Browser config
 */
const browserConfig = webpackMerge(commonConfig({
    compilerOptions: {
        target: "ES3",
        module: "commonjs"
    }
}), {
    output: {
        /**
         * Configure how the library will be exposed.
         *
         * See: https://webpack.js.org/configuration/output/#output-librarytarget
         */
        libraryTarget: 'var',

        /**
         * Configure which module or modules will be exposed via the libraryTarget.
         *
         * See: https://webpack.js.org/configuration/output/#output-libraryexport
         */
        libraryExport: 'ObjectMapper'
    }
});

/**
 * UMD config
 */
const umdConfig = webpackMerge(commonConfig({
    compilerOptions: {
        target: "ES3",
        module: "commonjs"
    }
}), {
    output: {
        /**
         * Configure how the library will be exposed.
         *
         * See: https://webpack.js.org/configuration/output/#output-librarytarget
         */
        libraryTarget: 'umd'
    }
});

/**
 * Export Webpack configurations
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = [
    /**
     * Browser
     */
    webpackMerge(browserConfig, {
        output: {
            filename: '[name].browser.js',
        }
    }),
    webpackMerge(browserConfig, {
        output: {
            filename: '[name].browser.min.js',
        },
        plugins: [
            /**
             * This plugin uses UglifyJS v3 (uglify-es) to minify your JavaScript.
             *
             * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
             */
            new UglifyJsPlugin({
                sourceMap: true
            })
        ]
    }),

    /**
     * UMD
     */
    webpackMerge(umdConfig, {
        output: {
            filename: '[name].umd.js',
        }
    }),
    webpackMerge(umdConfig, {
        output: {
            filename: '[name].umd.min.js',
        },
        plugins: [
            /**
             * This plugin uses UglifyJS v3 (uglify-es) to minify your JavaScript.
             *
             * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
             */
            new UglifyJsPlugin({
                sourceMap: true
            })
        ]
    }),

    /**
     * ES5
     */
    webpackMerge(commonConfig({
        compilerOptions: {
            target: "ES5",
            module: "commonjs"
        }
    }), {
        output: {
            filename: '[name].esm5.js',

            /**
             * Configure how the library will be exposed.
             *
             * See: https://webpack.js.org/configuration/output/#output-librarytarget
             */
            libraryTarget: 'umd'
        }
    }),

    /**
     * ES2015
     */
    webpackMerge(commonConfig({
        compilerOptions: {
            declaration: true,
            target: "ES2015",
            module: "ES2015"
        }
    }), {
        output: {
            filename: '[name].esm2015.js',

            /**
             * Configure how the library will be exposed.
             *
             * See: https://webpack.js.org/configuration/output/#output-librarytarget
             */
            libraryTarget: 'umd'
        }
    })
];
