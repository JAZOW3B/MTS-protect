const Discord = require('discord.js');
const db = require('quick.db')
const {
    blue,
    logs,
    emojiAttention,
    emojiON,
    emojiOFF
} = require('../../../config.json');
const emojis = require('../../../emojis.json')
module.exports = {
    name: 'security',
    description: 'Affiche les sécurités du discord',
    aliases: ['secur', 'security', 'sec'],
    usage: 'security',
    perms: `\`ADMINISTRATOR\``,

    async execute(message, args, client, lang) {

        let color;
        if (db.get(`${message.guild.id}.Color`)) {
            color = db.get(`${message.guild.id}.Color`)
        } else {
            color = blue;
        }

        const embedPerms = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.permsAdmin}`)
            .setTimestamp()
            .setFooter(`${client.user.username} © 2021`, `${client.user.displayAvatarURL()}`);

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedPerms);

        const embedbotPerms = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${emojis.alert} <@${message.author.id}> ${lang.botNoPerms}`)
            .setTimestamp()
            .setFooter(`${client.user.username} © 2021`, `${client.user.displayAvatarURL()}`);
        if (!message.guild.me.hasPermission("SEND_MESSAGES")) return message.channel.send(embedbotPerms)

        let antispam = db.get(`${message.guild.id}.antispam`);
        if (antispam == undefined) {
            antispam = `${emojis.off}`
        }
        if (antispam == null) {
            antispam = `${emojis.off}`
        }
        if (antispam == true) {
            antispam = `${emojis.on}`
        }
        if (antispam == false) {
            antispam = `${emojis.off}`
        }

        let antilink = db.get(`${message.guild.id}.antilink`);
        if (antilink == undefined) {
            antilink = `${emojis.off}`
        }
        if (antilink == null) {
            antilink = `${emojis.off}`
        }
        if (antilink == true) {
            antilink = `${emojis.on}`
        }
        if (antilink == false) {
            antilink = `${emojis.off}`
        }

        let antiwebhook = db.get(`${message.guild.id}.antiwebhook`);
        if (antiwebhook == undefined) {
            antiwebhook = `${emojis.off}`
        }
        if (antiwebhook == null) {
            antiwebhook = `${emojis.off}`
        }
        if (antiwebhook == true) {
            antiwebhook = `${emojis.on}`
        }
        if (antiwebhook == false) {
            antiwebhook = `${emojis.off}`
        }

        let antiban = db.get(`${message.guild.id}.antiban`);
        if (antiban == undefined) {
            antiban = `${emojis.off} (3 / 1min)`
        }
        if (antiban == null) {
            antiban = `${emojis.off} (3 / 1min)`
        }
        if (antiban == true) {
            antiban = `${emojis.on} (3 / 1min)`
        }
        if (antiban == false) {
            antiban = `${emojis.off}`
        }


        let antirole = db.get(`${message.guild.id}.antiRole`);
        if (antirole == undefined) {
            antirole = `${emojis.off}`
        }
        if (antirole == null) {
            antirole = `${emojis.off}`
        }
        if (antirole == true) {
            antirole = `${emojis.on}`
        }
        if (antirole == false) {
            antirole = `${emojis.off}`
        }

        let antiword = db.get(`${message.guild.id}.antiWordChoice`);
        if (antiword == undefined) {
            antiword = `${emojis.off}`
        }
        if (antiword == null) {
            antiword = `${emojis.off}`
        }
        if (antiword == true) {
            antiword = `${emojis.on}`
        }
        if (antiword == false) {
            antiword = emojiOFF
        }

        let antibot = db.get(`${message.guild.id}.antibot`)
        if (antibot == undefined) {
            antibot = `${emojis.off}`
        }
        if (antibot == null) {
            antibot = `${emojis.off}`
        }
        if (antibot == true) {
            antibot = `${emojis.on}`
        }
        if (antibot == false) {
            antibot = `${emojis.off}`
        }

        let antichannel = db.get(`${message.guild.id}.antiChannel`)
        if (antichannel == undefined) {
            antichannel = `${emojis.off}`
        }
        if (antichannel == null) {
            antichannel = `${emojis.off}`
        }
        if (antichannel == true) {
            antichannel = `${emojis.on}`
        }
        if (antichannel == false) {
            antichannel = `${emojis.off}`
        }

        let antieveryone = db.get(`${message.guild.id}.antieveryone`)
        if (antieveryone == undefined) {
            antieveryone = `${emojis.off} (3 / 1h)`
        }
        if (antieveryone == null) {
            antieveryone = `${emojis.off} (3 / 1h)`
        }
        if (antieveryone == true) {
            antieveryone = `${emojis.on} (3 / 1h)`
        }
        if (antieveryone == false) {
            antieveryone = `${emojis.off}`
        }

        const security = new Discord.MessageEmbed()
            .setTitle(`${lang.SecurityServEmbed}`)
            .setColor(color)
            .setDescription(`• **__Antispam__ :** ${antispam} \n • **__Antilink__ :** ${antilink} \n • **__Antiwebhook__ :** ${antiwebhook} \n • **__Antiban__ :** ${antiban} \n • **__Antichannel__ :** ${antichannel} \n • **__Antieveryone__ :** ${antieveryone} \n • **__Antirole__ :** ${antirole} \n • **__Antiword__ :** ${antiword}`)
            .setFooter(`${client.user.username} © 2021`, `${client.user.displayAvatarURL()}`)
        message.channel.send(security)

    },
};