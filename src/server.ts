import 'core-js'
import 'zone.js/dist/zone-node'
import { renderModule } from '@angular/platform-server'
import { Type } from '@angular/core'

// enableProdMode()

/**
 * @param addModule the server module
 * @param indexFile the index file to yor app. The HTML string
 */
export function site (appModule: Type<any>, indexFile: string) {
  return renderModule(appModule, {document: indexFile, url: '/'})
}

