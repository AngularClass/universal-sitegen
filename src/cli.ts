#!/usr/bin/env node
import * as program from 'commander'
import * as path from 'path'
import * as chalk from 'chalk'
import * as fs from 'fs'
import { generateSite } from './index'
import { CLIConfig } from './interfaces'
import { NgModuleFactory, Type } from '@angular/core'
const pjson = require('../package.json')

const readFile = (pathToFile: string): Promise<string> => {
  return new Promise((res, rej) => {
    fs.readFile(pathToFile, 'utf8', (err, file) => {
      if (err) {
        rej(err)
      } else {
       res(file)
      }
    })
  })
}

const getConfig = async (config = './universal.json'): Promise<CLIConfig> => {
  const configPath = path.join(process.cwd(), config)
  const file = await readFile(configPath)

  try {
    return JSON.parse(file)
  } catch (e) {
    console.error(new Error('Config file has invalid JSON'))
    process.exit(1)
  }
}

const getModule = (pathToModule: string): Type<{}> | NgModuleFactory<{}> => {
  if (!pathToModule) {
    console.log(chalk.red('Must provide a path to the NgModule or Factory'))
    process.exit(1)
    return
  }

  const modulePaths = pathToModule.split('#')
  let fullPath = path.join(process.cwd(), modulePaths[0])

  try {
    const ngModule = require(require.resolve(fullPath))[modulePaths[1]]
    return ngModule
  } catch (e) {
    console.error(chalk.red(e))
    process.exit(1)
  }
}


const build = async (config) => {
  const configOptions = (await getConfig(config.config) as CLIConfig)
  const serverModule = getModule(configOptions.serverModuleOrFactoryPath)

  return generateSite(
    serverModule,
    await readFile(path.join(process.cwd(), configOptions.indexHTMLPath)),
    configOptions
  )

}

program.version(pjson.version)

program
  .command('build')
  .option(
    '-c',
    '--config [configFilePath]', 'path to the config file, defaults to ./universal.json'
  )
  .description('Build and output your angular app as a static site')
  .action((config) => build(config))


program.parse(process.argv)

