export interface SiteGenConfig {
  /** all your route paths that are registered the NgModule that you're rendering */
  routes: string[]
  /** rather to have /your-route.html or not. Defaults to false */
  dotHTML: boolean
  /** where to place the output of the files. defaults to ./universal-site */
  outputPath: string
}
