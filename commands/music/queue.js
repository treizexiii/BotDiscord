const { MessageEmbed } = require("discord.js");
const { Command, CommandoMessage } = require("discord.js-commando");

module.exports = class QueueCommand extends Command
{
    constructor(client)
    {
        super(client,{
            name: 'queue',
            group: 'music',
            memberName: 'queue',
            description: 'Affiche la file d\'attente',
            args: [
                {
                    key: 'page',
                    prompt: "Quelle page veux-tu afficher?",
                    default: 1,
                    type: 'integer'
                }
            ]
        });
    };

    /**
     * @param {CommandoMessage} message 
     * @param {Number} page
     */
    async run(message, { page }){
        const server = message.client.server;

        if (!message.client.voice.connections.first()) {
            return message.say(":x: Je ne suis pas connecté à un salon vocal. Tape `-join` pour m'ajouter.");
        }
        
        const numberOfItems= 10;
        const startingItem = (page - 1) * numberOfItems;
        const queueLength = server.queue.length;

        var itemPerPage = startingItem + numberOfItems;
        var totalPages = 1;

        var embed = new MessageEmbed()
            .setTitle('File d\'attente pour ${message.author.username}')
            .setColor('BLUE')
            .addField('En train de jouer: ', server.currentVideo.url);
        
        if (queueLength > 0) {
            var value = "";

            if (queueLength > numberOfItems) {
                totalPages = Math.ceil(queueLength / numberOfItems);
            }

            if (page <= 0 || page > totalPages) {
                return message.say(":x: Cette page n'existe pas.");
            }

            if ((queueLength - startingItem) < numberOfItems) {
                itemPerPage = (queueLength - startingItem) + startingItem;
            }

            for (let i = startingItem; i < itemPerPage; i++) {
                const video = server.queue[i];
                value += "`" + (i + 1) + ".` " + video.url + "\n";
            }

            embed.addField("A venir : ", value);
        }

        embed.setFooter('Page ${page}/${totalPages}');

        return message.say(embed);
    }
}