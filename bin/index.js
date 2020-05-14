#!/usr/bin/env node
const { program } = require('commander')
const fs = require('fs')
const packagejson = require('../package.json')
const api = require('../lib/workspace')

let path
let outputPath

program
  .version(packagejson.version)
  .arguments('[source] [destination]')
  .action((source, destination) => {
    path = source
    outputPath = destination
  })

program.parse(process.argv)

if (!path) {
  console.log('ERROR: Missing path argument')
  process.exit()
}

api.generate(path).then((workspace) => {
  if (outputPath) {
    fs.writeFileSync(
      outputPath,
      JSON.stringify(workspace, null, 2)
    )
    console.log(`Insomnia workspace written to ${outputPath}`)
  } else {
    console.log(workspace)
  }
}).catch((error) => {
  console.log(error)
  process.exit()
})
