# Universal Sitegen
> A Angular Universal static site generator

<!-- TOC -->

- [Universal Sitegen](#universal-sitegen)
  - [What is this?](#what-is-this)
  - [Getting started](#getting-started)
    - [Installation](#installation)
    - [Building your static site](#building-your-static-site)
      - [CLI](#cli)
      - [Progmatically](#progmatically)

<!-- /TOC -->

## What is this?
Ever wanted to make a static site from your Angular app? Now that we have finalzed Angular Universal, you can! Universal Sitegen takes your angular app, builds it, then spits out static pages for each route. If you're building a website that you don't need a client side JS framework for, then this is pefect. Blogs, ladning pages, sales pages, launch pages, company sites, you get the point.


## Getting started
### Installation
* `yarn add @angularclass/universal-sitegen`

### Building your static site
There are two ways to build your site:
* [CLI](#cli)
* [Progmatically](#progmatically)

No matter what approach you use, you need the following setup before you're ready to go.

First, make sure your AppModule is importing `BrowserModule.withServerTransition()`
and your routes. As it should.

```typescript
// app.module.ts

// .....imports

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-site' }),
    ROUTES
  ],
  // desclarations
  // proviiders
  // bootstrap
})

export class AppModule {}
```

Next, create a ServerModule for Universal, and import your AppModule

```typescript
// server.module.ts
import { NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'
import { App } from './app.component'
import { AppModule } from './app.module'

@NgModule({
  imports: [ServerModule, AppModule],
  bootstrap: [App]
})

export class AppServerModule {}
```

Finally, you need to create an entry file for the site generator

```typescript
// static.ts
import { generateSite } from '@angularclass/universal-sitegen'
import { AppServerModule } from './server.module'

generateSite(
  // NgModule or NgModuleFactory for the ServerModule you created
  AppServerModule,
  // index html file for all routes
  require('./index.html'),
  // options object
  {
    // routes for your app
    routes: [
      '/',
      '/about'
    ],
    // path to output the site
    outputPath: 'universal-site'
  }
)
.then(() => console.log('site built'))
```

There is a [Demo App](https://github.com/angularclass/universal-sitegen/tree/master/demo) that has the basics. Great place to start to getting your app ready.

#### CLI
Make sure you followed the steps above first. To build your site with the CLI (preffered), you only need to do a few things.


Because your app is never going to be ran in the browser and only node, you might have to adjust your webpack config. Look at the [demo webpack config](https://github.com/angularclass/universal-sitegen/tree/master/demo/webpack.config.js) for what it should look like.

Next, build your app. After you build it, you need to create a `universal.json` file with options on the root of your app.

```js
{
  // routes for your angular app. mirros your routes file
  "routes": [
    "/",
    "/about"
  ],
  // output folder for your site
  "outputPath": "site", 
  // path to the compiled Server NgModule or NgModuleFactory with the #ExportName of the module
  "serverModuleOrFactoryPath": "./dist/bundle#AppServerModule",
  // path to the root html page all pages will be injected into
  "indexHTMLPath": "./src/index.html"
}
```

After that is all done, add a `script` in your `package.json` to build the static site using the cli:

```json
{
  "scripts": {
    "universal": "universal build"
  }
}
```

The `universal build` command will build your app as a static site, and output the html files to the outpath you specified in `universal.json`.


#### Progmatically
**comming soon**
