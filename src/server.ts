import 'core-js'
import 'zone.js/dist/zone-node'
import { renderModuleFactory } from '@angular/platform-server'
import { NgModuleFactory, enableProdMode } from '@angular/core'

enableProdMode()

/**
 * compiles and creates a HTML string from an angular app
 * @param serverModuleFactory the NgFactoryModule from your AOT built server module
 * @param document the index.html string
 * @param url the url to the page
 */
export function site (
  serverModuleFactory: NgModuleFactory<{}>,
  document: string,
  url: string = '/'
) {
  return renderModuleFactory(
    serverModuleFactory,
    {document, url}
  )
}

