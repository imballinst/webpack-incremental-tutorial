## Advanced Webpack Config - Filter
Advanced Webpack config with vendor filtering to exclude out unwanted files.

## Prerequisites
It is recommended to check the [previous example](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/05-build-cache) first about splitting codes.

### What's Special About This Part?
We don't have a direct control upon vendor assets, because they have been released to online repositories already. However, we could control how to import the vendor assets. For example, [Moment.js](https://momentjs.com) has a lot of locales. If our application doesn't support i18n yet, we might want to exclude the unused locales. In this example, only English and Indonesian locales are included-- and the vendor bundle size is reduced by ~200kB.

### Features
1. Loading assets
2. Outputting assets
3. Mapping assets to a manifest
4. Minifying assets
5. Hashing assets
6. Spltting assets
7. Improving consecutive build performance
8. Filtering vendor assets

### Next Example
Check out the [next example](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/07-tree-shaking) on enabling tree shaking.
