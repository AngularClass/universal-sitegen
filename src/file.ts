import { SiteGenConfig } from './interfaces'
import * as fs from 'fs'
import * as path from 'path'

export const createFile = (html: string, url: string, config: SiteGenConfig) => {
  let filePath = path.join(process.cwd(), config.outputPath)

  if (config.dotHTML) {
    filePath = path.join(filePath, `${url}.html`)
  } else {
    filePath = path.join(filePath, url,  'index.html')
  }

  return new Promise((res, rej) => {
    fs.writeFile(filePath, html, 'utf8', err => {
      if (err) {
        return rej(err)
      } else {
        res(filePath)
      }
    })
  })
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
