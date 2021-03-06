const net = require('net')
const sid = require('shortid')
const path = require('path')
const nodeCleanup = require('node-cleanup')

module.exports = function createLogInterface(servicePath, cb) {

    const connections = {}

    const server = net.createServer(socket => {

        socket.on('data', stuff => {
            // add plugin here
            console.log(`FIRE LOG: ${stuff.toString('utf8')}`)
        })

    })

    server.on('connection', socket => {

        const id = sid.generate()

        connections[id] = socket

        socket.on('end', () => {
            delete connections[id]
        })
    })

    server.listen(path.join(servicePath, '.fire_log.sock'), () => {
        cb()
    })

    nodeCleanup(function shutdown(code, signal) {
        server.close()

        Object
            .keys(connections)
            .forEach(id => connections[id].write('disconnect'))

    })

}
