import 'core-js'
import 'zone.js/dist/zone-node'
import { renderModule, renderModuleFactory } from '@angular/platform-server'
import { NgModuleFactory, Type, InjectionToken } from '@angular/core'
import { SiteGenConfig } from './interfaces'
import { UniversalCache } from './cache'


export const CACHE = new InjectionToken('universal.cache')
const cache = {}
/**
 * A thunk that takes a render method and later calls it with module or factory and platform options
 * @param renderMethod what method to render (renderModule | renderModuleFactory)
 */
const render = (renderMethod: Function) => {
  return function(moduleToRender, opts: {document: string, url: string, extraProviders?: any[]}) {
    return renderMethod.call(renderMethod, moduleToRender, opts)
  }
}

/**
 * compiles and creates a HTML string from an angular app
 * @param serverModuleOrFactory the NgFactoryModule or NgModule to render
 * @param document the index.html string
 * @param url the url to the page
 */
export async function renderPage (
  serverModuleOrFactory: Type<{}> | NgModuleFactory<{}>,
  document: string,
  url: string = '/',
  config: SiteGenConfig
) {

  let renderFunc

  /** if the mdoule is a factory, we need to change renderFuncs */
  if (serverModuleOrFactory instanceof NgModuleFactory) {
    renderFunc = render(renderModuleFactory)
  } else {
    renderFunc = render(renderModule)
  }

  const html = await renderFunc(
    serverModuleOrFactory,
    {
      document,
      url,
      extraProviders: [UniversalCache, {provide: CACHE, useValue: cache}]
    }
  )

  return {html, url}
}


