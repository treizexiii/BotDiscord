const { Command, CommandoMessage } = require("discord.js-commando");

module.exports = class JoinCommand extends Command
{
    constructor(client)
    {
        super(client,{
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Ajoute le bot à votre channel vocal'
        });
    };

    /**
     * @param {CommandoMessage} message 
     */
    async run(message){
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel){
            return message.say(':x: Tu dois être dans un salon vocal pour pouvoir utiliser cette commande.');
        }

        await voiceChannel.join();
        
        return message.say(":thmsup: J'ai rejoins" + " ` " + voiceChannel.name + " `");
    };
}