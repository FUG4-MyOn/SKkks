const Discord = require("discord.js");
const Bots = require("../Clusters/Models/Bots.js");

exports.run = async (client, message, args) => {
  let member =
    message.mentions.members.first() || client.users.cache.get(args[0]);

  let embederror = new Discord.MessageEmbed().setTitle(
    `<a:Sim_C:764950272774111252> **|** Este usuário não é um BOT!`
  );

  if (member.bot === false) return message.channel.send(embederror);

  Bots.findOne({ _id: member.id }, async (err, dados) => {
    if (dados) {
      client.users.fetch(member.id).then(bot => {
        client.users.fetch(dados.owner).then(user => {
          let embed = new Discord.MessageEmbed()

            .setTitle(
              `<:Git_C:764952225842987028> Informações do BOT: ${bot.username}`
            )
            .setColor(`YELLOW`)
            .addField(`Nome:`, bot.tag, true)
            .addField(`Prefix:`, dados.prefix, true)
            .addField(
              `Convite:`,
              `[[ ${bot.username} - Convite ]](${dados.invite})`,
              true
            )
            .addField(`Dono`, `${user.tag}`, true)
            .addField(`Votos`, `${dados.votes} Votos`, true)
            .addField(
              `Avatar`,
              `[[ ${bot.tag} - Avatar ]](${bot.avatarURL({ size: 4096 })})`,
              true
            )
            .addField(`Descrição Pequena`, `${dados.shortdescription}`)
            .setThumbnail(
              `https://cdn.discordapp.com/icons/764879920076816444/a_2ff9de9b0221fef654544d999240dd45.gif?size=2048`
            );

          message.channel.send(embed);
        });
      });
    } else {
      let embederror = new Discord.MessageEmbed().setTitle(
        `<a:Sim_C:764950272774111252> **|** Este BOT não está registrado em minha database!!`
      );

      return message.channel.send(embederror);
    }
  });
};

exports.help = {
  name: "botinfo",
  aliases: []
};
