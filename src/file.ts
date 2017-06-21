import { SiteGenConfig } from './interfaces'
import * as path from 'path'
const fs = require('fs-extra')

export const createHTML = (html: string, url: string, config: SiteGenConfig) => {
  let filePath = path.join(process.cwd(), config.outputPath)

  if (config.dotHTML) {
    filePath = path.join(filePath, `${url}.html`)
  } else {
    filePath = path.join(filePath, url,  'index.html')
  }

  console.log(filePath)
  return fs.outputFile(filePath, html)
}

export const loadConfigFile = (pathToFile: string): Promise<string> => {
  return new Promise((res, rej) => {
    fs.readFile(path.resolve(pathToFile), 'utf8', (err, file) => {
      if (err) {
        rej(err)
      } else {
        res(file)
      }
    })
  })
}
