console.log('Prebuild script running')
// Empty the electron configs file before building (Linux)
const fsExtra = require('fs-extra')
const configFolder =
  '/home/' + require('os').userInfo().username + '/.config/picssmart-client'

console.log('Removing config folder:', configFolder)

// fsExtra.removeSync(configFile)
fsExtra.removeSync(configFolder)

console.log('Config folder removed')
