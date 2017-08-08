import { NgZone, ReflectiveInjector, NgModuleFactoryLoader } from '@angular/core'
import { platformServer } from '@angular/platform-server'
import { ROUTES } from '@angular/router'

export function createModule(factory) {
  let loader = null
  const ngZone = new NgZone({ enableLongStackTrace: false })
  const platformProviders = platformServer().injector
  const providers = [ { provide: NgZone, useValue: ngZone } ]
  const injector = ReflectiveInjector.resolveAndCreate(providers, platformProviders);

  const moduleRef = factory.create(injector);

  const routes = moduleRef.injector.get(ROUTES);
  try {
    loader = moduleRef.injector.get(NgModuleFactoryLoader)
  } catch (e) {
    console.log('Error', e);
  }

  return routes.reduce((a, b) => a.concat(b))
    .map(route => {
      if (route.loadChildren) {
        return loader.load(route.loadChildren)
          .then((_factory) => Promise.all(createModule(_factory))
            .then(paths => paths.map(path => route.path + path))
          )
      } else {
        return Promise.resolve(route.path)
      }
    })
}

export function getRoutes(factory) {
  return Promise.all(createModule(factory))
};
