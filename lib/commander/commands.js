module.exports.commands = [{
    'event': 'init',
    'alias': ['i'],
    'desc': 'create a new project by fone',
    'fn': require('../app/init')
},{
    'event': 'server',
    'alias': ['s'],
    'desc': 'start your project ...',
    'fn': require('../app/server')
},{
    'event': 'build',
    'alias': ['b'],
    'desc': 'build scripts ...',
    'fn': require('../app/build')
},{
    'event': 'new',
    'alias': ['n'],
    'desc': 'create a new page ...',
    'fn': require('../app/page')
}];

module.exports.helps = []