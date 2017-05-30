import { NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'
import { App } from './app/app.component'
import { AppModule } from './app/app.module'

@NgModule({
  imports: [ServerModule, AppModule],
  bootstrap: [App]
})

export class AppServerModule {}

