const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client()

client.login('NzY0OTIyNjgzMzU1MTY4ODI4.X4NTww.32hTzKSwN7gjuULJ1lhqtXIHoGk')


fs.readdir("./comandos/", (err, files) => {
  if (err) console.error(err);
  let arquivojs = files.filter(f => f.split(".").pop() === "js");
  arquivojs.forEach((f, i) => {
    let props = require(`./comandos/${f}`)
    console.log(`Comando ${f} iniciou com sucesso`);
    
    client.commands.set(props.help.name, props);
  });
  arquivojs.forEach((f, i) => {
    let props = require(`./comandos/${f}`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    })
  })
})

client.on("ready", () => {
    console.log(`${client.user.username} foi iniciado com sucesso, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`);
    let status = [
        {name: `Estamos com ${client.users.cache.size} usuarios na Rocket List`, type: 'WATCHING'}
    ]
    function setStatus(){
        let randomStatus = status[Math.floor(Math.random()*status.length)]
        client.user.setPresence({activity: randomStatus})
    }
    setStatus();
    setInterval(() => setStatus(),20000)
    
});

client.on("message", message => {
  
  if(message.author.bot) return;
  if(message.channel.type === 'DM') return;
  
  let prefix = '.' 
  
  let mention = [`<@${client.user.id}>`, `<@!${client.user.id}>`]
  
    mention.find(mention => {
      
    if(message.content === mention) {
      
    let embed = new Discord.MessageEmbed()
        
      .setTitle('<:Comunidade_C:764950239761006653> Rocket List')
      .setDescription(`<a:Certinho_C:764950062417182772> Seja bem vindo ao Rocket List meu prefix é \`${prefix}\`, espero que goste da nossa Rocket List!`)
        
    message.channel.send(embed)
      
    }
      
  });
    
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  
  if (command) {
    
    command.run(client, message, args)
    
  } else {
    
    message.channel.send(':x: | Comando inexistente!')
    
  }
  
})

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()