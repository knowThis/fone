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
}];

module.exports.helps = []