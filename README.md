# Universal Sitegen
> A Angular Universal static site generator

<!-- TOC -->

- [Universal Sitegen](#universal-sitegen)
  - [What is this?](#what-is-this)
  - [Getting started](#getting-started)
    - [Installation](#installation)
    - [Building your static site](#building-your-static-site)
      - [Progmatically](#progmatically)
      - [CLI](#cli)

<!-- /TOC -->

## What is this?
Ever wanted to make a static site from your Angular app? Now that we have finalzed Angular Universal, you can! Universal Sitegen takes your angular app, builds it, then spits out static pages for each route. If you're building a website that you don't need a client side JS framework for, then this is pefect. Blogs, ladning pages, sales pages, launch pages, company sites, you get the point.


## Getting started
### Installation
* `yarn add @angularclass/universal-sitegen`

### Building your static site
There are two ways to build your site:

#### Progmatically
First, create a `ServerModule` That imports your main app module.

```typescript
// app.module.ts
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HomeComponent } from './home'
import { App } from './app.component'
import { AboutView } from './about/about.component'
import { ROUTES } from './app.routes'

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'test' }),
    ROUTES
  ],
  declarations: [
    HomeComponent,
    AboutView,
    App
  ],
  bootstrap: [App]
})

export class AppModule {}
```

This is what you need to make that you probably don't have already
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

Next, you need to create an entry for the site generator

```typescript
// static.ts
import { generateSite } from '@angularclass/universal-sitegen'
import { AppServerModule } from './server.module'

generateSite(AppServerModule, (require('./index.html') as string), {
  routes: [
    '/',
    '/about'
  ],
  outputPath: 'universal-site'
})
.then(() => console.log('site built'))
```

* `generateSite()`
  * Takes either your Server `NgModule` or, for prod, your Server `NgModuleFactory`
  * The index html string
  * options arg
    * `routes`: all your angular routes
    * `outputPath`: where to output your site

Next, you need to create a build from this new entry. So, if you're using webpack, use the same build you do for your app, just change the entry to point to this file.
Run your build. After your build finishes, you need to execute the script:

```
node path/to/bundled.file.js
```

That will build your site.


#### CLI
To build your site with the CLI (preffered), you only need to do a few things.

Create a config file with these options:

```json
{
  // routes for your angular app. mirros your routes file
  "routes": [
    "/",
    "/about"
  ],
  // output folder for your site
  "outputPath": "site", 
  // path to Server NgModule or NgModuleFactory with the #ExportName of the module
  "serverModuleOrFactoryPath": "./dist/bundle#AppServerModule",
  // path to the root html page all pages will be injected into
  "indexHTMLPath": "./src/index.html"
}
```

Create your Server Module:

```typescript
// server.module.ts
import { NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'
import { App } from './app.component'
// make sure your AppModule imports the BrowserModule.withServerTransition()
import { AppModule } from './app.module'

@NgModule({
  imports: [ServerModule, AppModule],
  bootstrap: [App]
})

// notice this export name matches the #{name} in the config.serverModuleOrFactoryPath above
export class AppServerModule {}
```
