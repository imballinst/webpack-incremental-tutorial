## Advanced Webpack Config - Tree Shaking
Advanced Webpack config with tree shaking.

## Prerequisites
It is recommended to check the [previous example](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/06-filter) first about filtering unwanted vendor assets.

### What's Special About This Part?
Sometimes, we like to export all helper functions, let's say we have this:
```
// a.js

export { functionA, functionB, functionC };
```
Then, in the other file, we imported only one of them.
```
// b.js
import { functionA } from './a.js';
```
Do we really only import `functionA`? No! Actually, we imported an object containing `functionA`, `functionB`, `functionC`. This is where **Tree Shaking** comes in handy. It cuts the exported things, but not imported. It doesn't really reduce much in this case; but on bigger projects, it might matter a lot.

### Some Common Misconceptions
At this time, tree shaking isn't as smart as we think. How often we do named imports like `import { keys, filter } from 'lodash'`? In this case, again, we imported everything from `lodash`. Why is this happening? Because, when we import things from `lodash`, we import it from the main module (which has been bundled). Tree shaking doesn't work on bundled modules. It only works on unbundled modules with `import` and `export` syntaxes.

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

### Next Example
Check out the [next example](https://github.com/Imballinst/webpack-incremental-tutorial/tree/master/08-conditional-build) on doing conditional build.
