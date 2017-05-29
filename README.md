# Angular Lib Starter
> Universal, AOT, Web Worker ready lib starter. Use for your Angular libs


## Getting started
* fork this
* clear the git history `git init .`
* add your source code in `src`.
* change the entry in `webpack.config.js`
* change the output filnames in `package.json` to match your src files and webpack
  * `"main", "jsnext:main", "module", "types"`
* build your project `yarn release` or `npm run release`

## Builds
This starter prepares 2 different types of builds of your lib
* **esm** or ES2015 Modules
  * this build is a transpilation of your Typescript code to ES5 and ES2015 modules. Its' not bundled. This is needed for treeshaking when users use your lib
* **UMD**
  * this is a bundle of ES5 code. What you would typically get from webpack or rollup.

The build system generates AOT metadata too, so you're good.


## Scripts
* `"test"`: runs the test in mocha on node
* `"lint"`: runs the linter
* `"build:esm"`: builds the esm versions
* `"build:bundle"`: builds the UMD version
* `"build:aot"`: makes it work for aot
* `"build"`: does all the above
* `"copy"`: copies over file to dist
* `"package"`: does all the above
* `"release"`: bumps the version, creates a tag, pushes to your master, builds then publiseh to npm
* `"pack"`: produces a tarball
* `"coverage"`: runs the test then coverage
