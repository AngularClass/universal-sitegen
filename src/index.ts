import { renderPage } from './render'
import { NgModuleFactory, enableProdMode, Type } from '@angular/core'
import { loadConfigFile, createHTML } from './file'
import { SiteGenConfig } from './interfaces'
// import { createFile } from './file'
import { Observable} from 'rxjs'
const chalk = require('chalk')
const progressBar = require('progress')
const prettysize = require('prettysize')

enableProdMode()

export { UniversalCache } from './cache'

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
    .mergeMap((opts: any) => Observable.fromPromise(renderPage(
      opts.serverModuleOrFactory,
      opts.document,
      opts.url,
      opts.config
    )))
  })

  const bar = new progressBar('  univeral building :url [:bar] :percent :total pages', {
    total: pages.length,
    clear: true,
    incomplete: ' '
  })

  Observable.concat(...pages)
  .do((page) => bar.tick({
    url: page.url
  }))
  .do((page) => createHTML(page.html, page.url, configOptions))
  .subscribe((page) => {
    const bytes = Buffer.byteLength(page.html, 'utf8')
    console.log(chalk.green(`built ${page.url} ${prettysize(bytes, true)}`))
  })
}
