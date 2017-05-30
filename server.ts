import 'core-js'
import 'zone.js/dist/zone-node'
import { renderModule } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'
import { AppServerModule } from './src/main.server'

enableProdMode()

renderModule(AppServerModule, {document: require('./src/index.html'), url: '/'})
.then((output)=> console.log('output: ', output))