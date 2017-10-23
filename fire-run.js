const path = require('path')
const { exec } = require('child_process')

const provideLogSocket = require('./fire-tools/log')

const pathToService = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd()

console.log(`Starting a fire @ ${pathToService}`)
process.chdir(pathToService)

provideLogSocket(pathToService, () => {
    console.log('established sockets, starting service.')
    exec('make START')
})
