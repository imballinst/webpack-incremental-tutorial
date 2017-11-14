# Webpack Incremental Tutorial
Basic and advanced guide for [Webpack](http://webpack.js.org/) in an incremental way. It is incremental because there are 8 examples (8 folders). Each has a `webpack.config.js` and complements the previous tutorial. For example, [Example 2 (Minify)](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/02-minify) complements [Example 1 (Basic)](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/01-basic), and so on.

## Installation
```
git clone https://github.com/Imballinst/webpack-incremental-tutorial
cd webpack-incremental-tutorial
npm install
```

## List of examples and How to Run Them
There are 8 examples (as stated above) in this repository. Run these commands on your **root directory**.

1. [Basic - Complete Asset Loaders](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/01-basic): `npm run build:1`
2. [Advanced - Minify Assets](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/02-minify): `npm run build:2`
3. [Advanced - Hash](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/03-hash): `npm run build:3`
4. [Advanced - Code Splitting](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/04-split-chunk): `npm run build:4`
5. [Advanced - Build Performance](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/05-build-cache): `npm run build:5`
6. [Advanced - Vendor Assets Filtering](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/06-filter): `npm run build:6`
7. [Advanced - Tree Shaking](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/07-tree-shaking): `npm run build:7`
8. [Advanced - Conditional Build](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/08-conditional-build): `npm run build:8`

## Additional Scripts
1. **Clear cache folder (for example #5 and above)**: `npm run cache:clear`

## Testing
The test contained in this repository has only one purpose: to make sure that no code is unused or out of context with [eslint](https://eslint.org/). To run the test: `npm test`.

## Complete guide
For complete guide, please check [Webpack's guides section](https://webpack.js.org/guides).
