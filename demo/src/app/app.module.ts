import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HomeComponent } from './home'
import { App } from './app.component'
import { AboutView } from './about/about.component'
import { ROUTES } from './app.routes'

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'test' }),
    ROUTES
  ],
  declarations: [
    HomeComponent,
    AboutView,
    App
  ],
  bootstrap: [App]
})

export class AppModule {}

