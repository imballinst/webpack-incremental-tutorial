## Advanced Webpack Config - Split Chunk
Advanced Webpack config with assets chunk splitting, mainly for Javascript and CSS files.

## Prerequisites
It is recommended to check the [previous example](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/03-hash) first about hashing assets.

### What's Special About This Part?
This is highly related to previous part, hashing. Since we have known that the browser has caching technology, we should maximize it. Imagine if we are only changing a line of code in a Javascript bundle then the client's browser needs to download it all again (because of the new hash). This part explains how it could be optimized further by separating vendor and application bundles. Vendor bundles rarely change; which is the opposite of application bundles. By separating them, every time we change a line of code that doesn't affect our vendor bundles, only the application bundles change. Therefore, the browser will only need to download the application bundles (not both).

### Features
1. Loading assets
2. Outputting assets
3. Mapping assets to a manifest
4. Minifying assets
5. Hashing assets
6. Spltting assets

### Next Example
Check out the [next example](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/05-build-cache) on improving build performance.
