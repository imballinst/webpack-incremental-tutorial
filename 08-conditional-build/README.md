## Advanced Webpack Config - Conditional Build
Advanced Webpack config with conditional build.

## Prerequisites
It is recommended to check the [previous example](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/07-tree-shaking) first about tree shaking.

### What's Special About This Part?
Sometimes, we want to define something on build-time. Maybe to remove unused if-branches, maybe to define a variable pre-runtime, and many more. We could achieve this with `webpack.DefinePlugin`. Then, during the build time, Webpack will replace the given variable with the given value.

### Features
1. Loading assets
2. Outputting assets
3. Mapping assets to a manifest
4. Minifying assets
5. Hashing assets
6. Spltting assets
7. Improving consecutive build performance
8. Filtering vendor assets
9. Enabling tree shaking
10. Conditional build
