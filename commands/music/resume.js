const { Command, CommandoMessage } = require("discord.js-commando");
const { StreamDispatcher } = require('discord.js');

module.exports = class ResumeCommand extends Command
{
    constructor(client)
    {
        super(client,{
            name: 'resume',
            group: 'music',
            memberName: 'resume',
            description: 'Reprendre la musique en pause',
        });
    };

    /**
     * @param {CommandoMessage} message 
     */
    async run(message){
        /**
         * @type StreamDispatcher
         */
        const dispatcher = message.client.server.dispatcher;

        if (!message.member.voice.channel){
            return message.say(':x: Tu dois être dans un salon vocal pour pouvoir utiliser cette commande.');
        }

        if (!message.client.voice.connections.first()){
            return message.say(":x: Je ne suis pas connecté à un salon vocal. Tape `-join` pour m'ajouter.");
        }

        if(dispatcher) {
            dispatcher.resume();
        }
        
        return message.say("En train de jouer :notes:");
    };
}