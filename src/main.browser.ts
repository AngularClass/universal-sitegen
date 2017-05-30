import 'core-js'
import 'zone.js'

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser'
import { AppModule } from './app/app.module'

platformBrowser().bootstrapModule(AppModule)
.catch(e => {
  console.error(e)
})
