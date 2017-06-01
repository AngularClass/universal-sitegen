import 'core-js'
import 'zone.js/dist/zone-node'
import { renderModule } from '@angular/platform-server'
import {  enableProdMode, Type } from '@angular/core'
// import * as path from 'path'
import { SiteGenConfig } from './interfaces'

enableProdMode()

/**
 * compiles and creates a HTML string from an angular app
 * @param serverModuleFactory the NgFactoryModule from your AOT built server module
 * @param document the index.html string
 * @param url the url to the page
 */
export function site (
  serverModuleFactory: Type<{}>,
  document: string,
  url: string = '/',
  config?: string | SiteGenConfig
) {
  // if (typeof config === 'string') {
  //   config = require.resolve(path.join(process.cwd(), config))
  // }

  // console.log('config here ', config)
  return renderModule(
    serverModuleFactory,
    {document, url}
  )
}

