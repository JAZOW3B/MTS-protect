const Discord = require('discord.js');
const {
   blue,
  emojiValidé,
  emojiAttention,
  prefix,
  owner
} = require('../../config.json');
const db = require('quick.db');
const fs = require('fs').promises;
const emojis = require('../../emojis.json')
module.exports = (client) => {
  client.on('guildCreate', async (guild) => {
    if (!guild) return;

    let color;
    if (db.get(`${guild.id}.Color`)) {
      color = db.get(`${guild.id}.Color`)
    } else {
       color = "2f3136";
    }

    let language;
    if (db.get(`${guild.id}.language`) === undefined || db.get(`${guild.id}.language`) === null) {
      await db.set(`${guild.id}.language`, "fr")
      language = db.get(`${guild.id}.language`)
    }
    language = db.get(`${guild.id}.language`)
    const lang = JSON.parse(await fs.readFile(`./Languages/${language}.json`))

    const id = (await client.users.fetch(owner))
    id.send(`${client.user.username} a rejoint **${guild.name}**, qui a **${guild.memberCount}** membres.`)

    let mtschannel = client.guilds.cache.get('885941523412316222').channels.cache.find((c) => c.id === '892173880767160320')
    const msg = new Discord.MessageEmbed()
      .setColor(color)
      .setDescription(`• Bot ajouté sur : **${guild.name}** \n • Membres : **${guild.memberCount}** \n • Boosts : **${guild.premiumSubscriptionCount}** ${emojis.boost} `)
      .setTimestamp()
      .setFooter(`${client.user.username} `);
    mtschannel.send(msg)

  });
};