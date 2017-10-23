const net = require('net')
const http = require('http')
const sid = require('shortid')
const path = require('path')
const nodeCleanup = require('node-cleanup')

module.exports = function createStatInterface(servicePath, cb) {

    const connections = {}
    let stats = {
        state: 'DOWN',
        time: 0,
        memory: 0,
        pid: undefined
    }

    const statServer = http.createServer((req, res) => {
        res.end(JSON.stringify(stats))
    })

    statServer.listen(9999)

    const server = net.createServer(socket => {

        socket.on('data', data => {
            stats = JSON.parse(data.toString('utf8'))
        })

    })

    server.on('connection', socket => {

        const id = sid.generate()

        connections[id] = socket

        socket.on('end', () => {
            delete connections[id]
        })
    })

    server.listen(path.join(servicePath, '.fire_stat.sock'), () => {
        cb()
    })

    nodeCleanup(function shutdown(code, signal) {
        server.close()
        statServer.close()

        Object
            .keys(connections)
            .forEach(id => connections[id].write('disconnect'))

    })

}
