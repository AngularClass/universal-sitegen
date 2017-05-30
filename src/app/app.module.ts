import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HomeComponent } from './home'
import { App } from './app.component'

@NgModule({
  imports: [BrowserModule.withServerTransition({ appId: 'test' })],
  declarations: [
    HomeComponent,
    App
  ],
  bootstrap: [App]
})

export class AppModule {}

