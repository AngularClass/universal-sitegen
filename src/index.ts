import { renderPage } from './render'
import { NgModuleFactory, enableProdMode, Type } from '@angular/core'
import { loadConfigFile, createHTML } from './file'
import { SiteGenConfig } from './interfaces'
// import { createFile } from './file'
import { Observable} from 'rxjs'
const chalk = require('chalk')
const progressBar = require('progress')
// const prettysize = require('prettysize')

enableProdMode()

export { UniversalCache } from './cache'
export { CACHE, cache } from './render'

export const generateSite = async (
  serverModuleOrFactory: Type<{}> | NgModuleFactory<{}>,
  document: string,
  config: string | SiteGenConfig
) => {
  let configOptions: SiteGenConfig

  if (typeof config === 'string') {
    try {
      const configJSON = await loadConfigFile(config)
      configOptions = JSON.parse(configJSON)
    } catch (e) {
      console.error(chalk.red(e))
    }
  } else {
    configOptions = (config as SiteGenConfig)
  }

  const pages = (configOptions.routes || await configOptions.getRoutes())
  .map((route: string) => {
    return Observable.of({serverModuleOrFactory, document, url: route, configOptions})
    .mergeMap((opts: any) => {
      const promise = renderPage(opts.serverModuleOrFactory, opts.document, opts.url, opts.config)
        .then
      return Observable.fromPromise(promise)
    })
  })

  const bar = new progressBar('   🌍 [:bar] :percent   route /:url', {
    total: pages.length,
    complete: '\u001b[42m \u001b[0m',
    incomplete: ' ',
    width: 40
  })

  const getUrl = (url: string) => {
    const bits = url.split('/')
    return bits.slice(bits.length - 2).join('/')
  }

  Observable.concat(...pages)
  .do((page) => createHTML(page.html, page.url, configOptions))
  .subscribe((page) => {
    bar.tick({
      url: !page.url || page.url === '/' ?
        '/' :
        getUrl(page.url)
    })
    bar.render()
  })
}
