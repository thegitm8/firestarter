const path = require('path')
const { exec } = require('child_process')

const provideLogSocket = require('./fire-tools//log')

const pathToService = process.argv[2]
    ? path.resolve(process.argv[2])
    : process.cwd()

process.chdir(pathToService)

provideLogSocket(pathToService, () => {
    exec('make START')
})
