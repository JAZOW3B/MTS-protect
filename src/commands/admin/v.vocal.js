const Discord = require("discord.js");
const {
    blue,
    emojiValidé,
    emojiAttention,
    emojiVocal,
    emojiMuted,
    emojiDeaf
} = require('../../../config.json')
const db = require('quick.db');
const emojis = require('../../../emojis.json')
module.exports = {
    name: 'vocal',
    aliases: ['voc', 'vc'],
    description: 'Affiche le nombre de personne en vocal sur le discord',
    usage: 'vocal',
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

        let size = message.guild.members.cache.filter(m => m.voice.channel).size
         let vocmute = message.guild.members.cache.filter(m => m.voice.mute).size
         let vocdeaf = message.guild.members.cache.filter(m => m.voice.deaf).size
        const vocal = new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(`${emojis.voice} ${lang.VocalEmbed1} **${size}** ${lang.VocalEmbed2}\n\n ${emojis.mute} Il y a **${vocmute}** personnes mute \n ${emojis.mutecasque} Il y a **${vocdeaf}** personnes mute casque`)
            // \n ${emojiMuted} Il y a **${vocmute}** personnes mute \n ${emojiDeaf} Il y a **${vocdeaf}** personnes mute casque
            .setTimestamp()
            .setFooter(`${client.user.username} © 2021`, `${client.user.displayAvatarURL()}`);
        message.channel.send(vocal)
    }
}