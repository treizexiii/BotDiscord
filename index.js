const {CommandoClient} = require('discord.js-commando');
const path = require('path');

const client = new CommandoClient({
    commandPrefix: '-',
    owner: '000000',
    invite: 'xxxxxx'
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music', 'Music')
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.server = {
    queue: [],
    currentVideo: { title: "", url: "" },
    dispatcher: null
};

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag} - (${client.user.id})`);
});

client.on('error', (error) => console.error(error));

client.login('API_KEY');
