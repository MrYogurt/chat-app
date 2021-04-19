import { resolve as _resolve, join } from 'path';

export const mode = 'production';
export const entry = './app/entry';
export const output = {
  // options related to how webpack emits results
  path: _resolve(__dirname, 'dist'),

  // the target directory for all output files
  // must be an absolute path (use the Node.js path module)
  filename: '[name].js',

  // the filename template for entry chunks
  publicPath: '/assets/',

  // the url to the output directory resolved relative to the HTML page
  library: {
    // There is also an old syntax for this available (click to show)
    type: 'umd',

    // the type of the exported library
    name: 'MyLibrary', // string | string[]
    // the name of the exported library
    /* Advanced output.library configuration (click to show) */
  },
  uniqueName: 'my-application',

  // unique name for this build to avoid conflicts with other builds in the same HTML
  name: 'my-config',
  // name of the configuration, shown in output
  /* Advanced output configuration (click to show) */
  /* Expert output configuration 1 (on own risk) */
  /* Expert output configuration 2 (on own risk) */
};
export const module = {
  // configuration regarding modules
  rules: [
    // rules for modules (configure loaders, parser options, etc.)
    {
      // Conditions:
      test: /\.jsx?$/,
      include: [_resolve(__dirname, 'app')],
      exclude: [_resolve(__dirname, 'app/demo-files')],
      // these are matching conditions, each accepting a regular expression or string
      // test and include have the same behavior, both must be matched
      // exclude must not be matched (takes preferrence over test and include)
      // Best practices:
      // - Use RegExp only in test and for filename matching
      // - Use arrays of absolute paths in include and exclude to match the full path
      // - Try to avoid exclude and prefer include
      // Each condition can also receive an object with "and", "or" or "not" properties
      // which are an array of conditions.
      issuer: /\.css$/,
      issuer: _resolve(__dirname, 'app'),
      issuer: { and: [/\.css$/, _resolve(__dirname, 'app')] },
      issuer: { or: [/\.css$/, _resolve(__dirname, 'app')] },
      issuer: { not: [/\.css$/] },
      issuer: [/\.css$/, _resolve(__dirname, 'app')],

      // conditions for the issuer (the origin of the import)
      /* Advanced conditions (click to show) */
      // Actions:
      loader: 'babel-loader',
      // the loader which should be applied, it'll be resolved relative to the context
      options: {
        presets: ['es2015'],
      },
      // options for the loader
      use: [
        // apply multiple loaders and options instead
        'htmllint-loader',
        {
          loader: 'html-loader',
          options: {
            // ...
          },
        },
      ],
      type: 'javascript/auto',
      // specifies the module type
      /* Advanced actions (click to show) */
    },
    {
      oneOf: [
        // ... (rules)
      ],
      // only use one of these nested rules
    },
    {
      // ... (conditions)
      rules: [
        // ... (rules)
      ],
      // use all of these nested rules (combine with conditions to be useful)
    },
  ],
  /* Advanced module configuration (click to show) */
};
export const resolve = {
  // options for resolving module requests
  // (does not apply to resolving of loaders)
  modules: ['node_modules', _resolve(__dirname, 'app')],
  // directories where to look for modules (in order)
  extensions: ['.js', '.json', '.jsx', '.css'],
  // extensions that are used
  alias: {
    // a list of module name aliases
    // aliases are imported relative to the current context
    module: 'new-module',
    // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
    'only-module$': 'new-module',
    // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"
    module: _resolve(__dirname, 'app/third/module.js'),
    // alias "module" -> "./app/third/module.js" and "module/file" results in error
    module: _resolve(__dirname, 'app/third'),
    // alias "module" -> "./app/third" and "module/file" -> "./app/third/file"
    [_resolve(__dirname, 'app/module.js')]: _resolve(
      __dirname,
      'app/alternative-module.js',
    ),
    // alias "./app/module.js" -> "./app/alternative-module.js"
  },
  /* Alternative alias syntax (click to show) */
  /* Advanced resolve configuration (click to show) */
  /* Expert resolve configuration (click to show) */
};
export const performance = {
  hints: 'warning',
  maxAssetSize: 200000,
  maxEntrypointSize: 400000,
  assetFilter: function (assetFilename) {
    // Function predicate that provides asset filenames
    return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
  },
};
export const devtool = 'source-map';
export const context = __dirname;
export const target = 'web';
export const externals = ['react', /^@angular/];
export const externalsType = 'var';
export const externalsPresets = {
  /* ... */
};
export const ignoreWarnings = [/warning/];
export const stats = 'errors-only';
export const stats = {
  // lets you precisely control what bundle information gets displayed
  preset: 'errors-only',
  // A stats preset
  /* Advanced global settings (click to show) */
  env: true,
  // include value of --env in the output
  outputPath: true,
  // include absolute output path in the output
  publicPath: true,
  // include public path in the output
  assets: true,
  // show list of assets in output
  /* Advanced assets settings (click to show) */
  entrypoints: true,
  // show entrypoints list
  chunkGroups: true,
  // show named chunk group list
  /* Advanced chunk group settings (click to show) */
  chunks: true,
  // show list of chunks in output
  /* Advanced chunk group settings (click to show) */
  modules: true,
  // show list of modules in output
  /* Advanced module settings (click to show) */
  /* Expert module settings (click to show) */
  /* Advanced optimization settings (click to show) */
  children: true,
  // show stats for child compilations
  logging: true,
  // show logging in output
  loggingDebug: /webpack/,
  // show debug type logging for some loggers
  loggingTrace: true,
  // show stack traces for warnings and errors in logging output
  warnings: true,
  // show warnings
  errors: true,
  // show errors
  errorDetails: true,
  // show details for errors
  errorStack: true,
  // show internal stack trace for errors
  moduleTrace: true,
  // show module trace for errors
  // (why was causing module referenced)
  builtAt: true,
  // show timestamp in summary
  errorsCount: true,
  // show errors count in summary
  warningsCount: true,
  // show warnings count in summary
  timings: true,
  // show build timing in summary
  version: true,
  // show webpack version in summary
  hash: true,
  // show build hash in summary
};
export const devServer = {
  proxy: {
    // proxy URLs to backend development server
    '/api': {
      target: 'http://localhost:5000',
      pathRewrite: { '^/api': '' },
    },
  },
  contentBase: join(__dirname, 'public'),
  compress: true,
  historyApiFallback: true,
  hot: true,
  https: false,
  noInfo: true, // only errors & warns on hot reload
  // ...
};
export const experiments = {
  asyncWebAssembly: true,
  // WebAssembly as async module (Proposal)
  syncWebAssembly: true,
  // WebAssembly as sync module (deprecated)
  outputModule: true,
  // Allow to output ESM
  topLevelAwait: true,
  // Allow to use await on module evaluation (Proposal)
};
export const plugins = [
  // ...
];
export const optimization = {
  chunkIds: 'size',
  // method of generating ids for chunks
  moduleIds: 'size',
  // method of generating ids for modules
  mangleExports: 'size',
  // rename export names to shorter names
  minimize: true,
  // minimize the output files
  minimizer: [new CssMinimizer(), '...'],
  // minimizers to use for the output files
  /* Advanced optimizations (click to show) */
  splitChunks: {
    cacheGroups: {
      'my-name': {
        // define groups of modules with specific
        // caching behavior
        test: /\.sass$/,
        type: 'css/mini-extract',
        /* Advanced selectors (click to show) */
        /* Advanced effects (click to show) */
      },
    },

    fallbackCacheGroup: {
      /* Advanced (click to show) */
    },
    /* Advanced selectors (click to show) */
    /* Advanced effects (click to show) */
    /* Expert settings (click to show) */
  },
};
