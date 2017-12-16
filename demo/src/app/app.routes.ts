import {RouterModule, Route} from '@angular/router'
import {ModuleWithProviders} from '@angular/core'
import { HomeComponent } from './home/home.component'
import { AboutView } from './about/about.component'

const routes: Route[] = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutView}
]

export const ROUTES: ModuleWithProviders = RouterModule.forRoot(routes)
