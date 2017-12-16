import { generateSite } from '@angularclass/universal-sitegen'
import { AppServerModule } from './server.module'

generateSite(AppServerModule, require('./index.html'), {
  routes: [
    '/',
    '/about'
  ],
  outputPath: 'site'
})
.then(() => console.log('site is done'))
