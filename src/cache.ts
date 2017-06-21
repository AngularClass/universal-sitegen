import * as path from 'path'
const fs = require('fs-extra')

export class UniversalCache {
  private cacheFile: string = 'universal.cache.json'
  private cachePath: string = path.join(process.cwd(), this.cacheFile)

  public setCache(data: any): Promise<any> {
    return fs.outputJson(this.cachePath, data)
  }

  public getCache(): Promise<any> {
    try {
      const cache = fs.readJsonSync(this.cachePath)
      return Promise.resolve(cache)
    } catch (e) {
    return fs.outputJson(this.cachePath, {cache: true})
    .then(() => ({cache: true}))
    }
  }
}
