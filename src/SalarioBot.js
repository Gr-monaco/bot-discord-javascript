require('dotenv').config();


const { Client, Intents, Message } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const PREFIX = "$"

client.on('ready', () => {
    console.log(`${client.user.tag} está online!`);
})

function getDate(){
    let dia_de_hoje = new Date();
    let proximo_cinco = new Date();
    proximo_cinco.setDate(5);
    if (proximo_cinco.getDay() === 6 || proximo_cinco.getDay() === 0) proximo_cinco.setDate(4);
    proximo_cinco.setMonth(dia_de_hoje.getMonth() + 1);
    let tempo = Math.floor((proximo_cinco - dia_de_hoje) / 86400000);
    return `Falta ${tempo.toString()} dias para o próximo salário :sunglasses:`;
}

client.on('messageCreate', (message) =>{
    console.log(`Author: ${message.author.tag}\n  Channel: ${ message.channel.type }\n Content: ${message.content}`)
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)){
        const [COMMAND, ...ARGUMENTS] = message.content
        .substring(PREFIX.length)
        .split(" ");
        if (COMMAND === "data"){
            message.reply(getDate())
        }
    }
})
client.login(process.env.BOT_TOKEN)