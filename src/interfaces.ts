import { Type, NgModuleFactory } from '@angular/core'

export interface RouteFunc {
  (): Promise<string[]>
}

export interface RenderPageOpts {
  serverModuleOrFactory: Type<{}> | NgModuleFactory<{}>
  document: string
  url: string
  config: SiteGenConfig
}

export interface SiteGenConfig {
  /** all your route paths that are registered the NgModule that you're rendering */
  routes?: string[]
  /** rather to have /your-route.html or not. Defaults to false */
  dotHTML: boolean
  /** where to place the output of the files. defaults to ./universal-site */
  outputPath: string

  getRoutes?: RouteFunc
}

export interface CLIConfig extends SiteGenConfig {
  /** the path to the ngmodule or factor */
  serverModuleOrFactoryPath: string
  /** the path  to the index.html */
  indexHTMLPath: string
}
