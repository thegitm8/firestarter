/**
 * fire start
 */
'use strict'

global.Promise = require('bluebird')

const path = require('path')
const { exec } = require('child_process')

const provideLogSocket = require('./fire-tools/log')
const provideStatSocket = require('./fire-tools/stat')

const pathToService = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd()
let fireConfig

try {
    fireConfig = require(path.join(pathToService, 'fire.json'))
} catch (err) {
    console.error('FIRE: target directory does not contain a valid fire.json')
    process.exit(1)
}

console.log(`FIRE: Starting a fire @ ${pathToService}`)
process.chdir(pathToService)

provideLogSocket(pathToService, () => {

    provideStatSocket(pathToService, () => {

        console.log('FIRE: established sockets, starting service.')
        const service = exec(fireConfig.start, (e, s, t) => {
            console.log('PING', e, s, t)
        })

        service.stderr.on('data', data => {
            console.log(`Fire: the service encountered an error: ${data}`)
        })

        service.on('exit', (code, signal) => {
            console.log('FIRE: service exited unexpectedly:', code, signal)
            process.exit(code)
        })
    })
})
