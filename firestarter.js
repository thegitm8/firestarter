#!/usr/bin/env node

const fire = require('commander');
const { version } = require('./package')

fire
    .version(version)
    .command('run [service]', 'start a service')
    //  .command('search [query]', 'search with optional query')
    //  .command('list', 'list packages installed', {isDefault: true})
    .parse(process.argv);