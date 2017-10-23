#!/usr/bin/env node

const firestarter = require('commander');
const { version } = require('./package')

firestarter
    .version(version)
    .command('start [service]', 'start a service')
    .parse(process.argv);