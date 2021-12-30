const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')

module.exports = {
    name: 'info',
    description: 'Info about the owner',
    usage: 'info',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args) {
        let tosEmbed = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription("Here you can find some info about the bot creator. \n:warning: **You will find here my youtube channel, and some random info.**")
            .addField('**1.** A short description', 'I am from **Romania**, I live in **Pitesti** and I am currently a **student**.' )
            .addField('**2.** Age', 'I am **15** years old. My birthday is **July 27th**')
            .addField('**3.** My youtube channel', 'This is my [Youtube Channel](https://www.youtube.com/channel/UCoegPiSTttKBkgnFh_mgJzA)')
            .addField('Tap the :white_check_mark:', '```\nTo confirm that you want to see my Instagram. \n If you do not see the reaction, please wait 10 seconds\n```')
        message.channel.send(tosEmbed).then(sMessage => {
            setTimeout(() => {
                sMessage.react('✅')
            }, 5000)

            const filter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
            };

            sMessage.awaitReactions(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(async collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === "✅") {
                    
                    let userReactions = (sMessage.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id)))
                    for (const reaction of userReactions.values()) {
                        await reaction.users.remove(message.author.id);
                    }
                    reaction.users.remove(message.client.user.id)

                    let editEmbed = new Discord.MessageEmbed()
                        .setTitle(`${message.client.user.username}  owner instagram`)
                        .setColor(colors.orange)
                        .setTimestamp()
                        .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
                        .setThumbnail(message.client.user.avatarURL())
                        .setDescription(`https://www.instagram.com/karma.andrewxd/`)
                    sMessage.edit(editEmbed)
                }
            })
        })
    }
}