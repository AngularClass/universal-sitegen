import 'core-js'
import 'zone.js'

import { platformBrowser } from '@angular/platform-browser'
import { AppModule } from './app/app.module'

platformBrowser().bootstrapModule(AppModule)
