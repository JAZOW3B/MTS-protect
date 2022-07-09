/* eslint-disable no-undef */
const {
    MessageEmbed,
} = require('discord.js');
const {
    blue,
    emojiAttention,
    prefix
} = require('../../../config.json');
const Discord = require('discord.js');
const db = require('quick.db');
const emojis = require('../../../emojis.json')
module.exports = {
    name: 'help',
    description: 'Envoie la liste des commandes',
    aliases: ['help'],
    usage: 'help',
    perms: `\`SEND_MESSAGES\``,

    async execute(message, args, client, lang) {

        let color;
        if (db.get(`${message.guild.id}.Color`)) {
            color = db.get(`${message.guild.id}.Color`)
        } else {
            color = blue;
        }

        let prefixbot;
        if (db.get(`${message.guild.id}.prefix`)) {
            prefixbot = db.get(`${message.guild.id}.prefix`)
        } else {
            prefixbot = prefix
        }

        if (args[0]) {
            const command = client.commands.get(args[0])
            if (command === undefined) return

            const embedhelpcommande = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(
                    `**${lang.HelpCommandName}** ${lang.commands[command.name.toLowerCase()].name}\n` +
                    `**Alias :** ${lang.commands[command.name.toLowerCase()].aliases.join(' | ')} \n` +
                    `**${lang.HelpCommandDescription}** ${lang.commands[command.name.toLowerCase()].description}\n` +
                    `**${lang.HelpCommandLogs}** ${prefixbot}${lang.commands[command.name.toLowerCase()].usage} \n` +
                    `**${lang.HelpCommandPerms}** ${lang.commands[command.name.toLowerCase()].perms}`
                )
                .setTimestamp()
                .setFooter(`${client.user.username} © 2021`, `${client.user.displayAvatarURL()}`);
            message.channel.send(embedhelpcommande);

        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle(`${emojis.settings} ${lang.HelpTitleList}`)
                .setDescription(`
                **${lang.HelpDescriptionCategoryAdministration}**\n \`embed\` \`secur\` 
                
                \`vocal\` \`addemoji\`\n

                **${lang.HelpDescriptionCategoryConfiguration}**\n \`prefix\` \`language\` 
                
                \`color\` \`sanction\` 
                
                \`setup\` \`tempvocal\` 
                
                \`ticket\` \`rolereaction\` 
                
                \`owner\` \`whitelist\` 
                
                \`config\` \n

                **${lang.HelpDescriptionCategoryModeration}**\n \`lock\`, \`unlock\`, 
                
                \`renew\` \`clear\` 
                
                \`rolecheck\` \n

                **${lang.HelpPremium}**\n \`setavatar\` \`setusername\` 
                
                \`statut\` \`serverlist\` 
                
                \`soutien\` \n

                **${lang.HelpDescriptionCategoryLog}**\n \`logsban\`, \`logsc\`, 
                
                \`logsmsg\` \`logsroles\` 
                
                \`logs\` \`setlogs\` \n

                **${lang.HelpDescriptionCategoryWhitelist}**\n  \`Antispam\` \`Antilink\` 
                
                \`Antiwebhook\` \`Antiban\` 
                
                \`Antichannel\` \`Antieveryone\` 
                
                \`Antirole\` \`Antibot\` 
                
                \`deletewebhooks\` \n
                
                                > ${lang.HelpDescriptionPermissionHelp} \`${prefixbot}help <command>\`
                                `
                                )
                                .setThumbnail(`${client.user.displayAvatarURL()}`)
                                .setTimestamp()
                                .setFooter(`${client.user.username} © 2021`, `${client.user.displayAvatarURL()}`);
                            message.lineReply(embed)
                
                        };
                    },
                };