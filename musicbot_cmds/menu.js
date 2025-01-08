const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
> *KARL XMD AVAILABLE MENUS* 
╭|───|──|───|───|───|───
|│🪰╭─────────────
|│🪰│▸ *MENU* 
|│🪰│▸ *MENU2* 
|│🪰│▸ *VINKEL HOOD*
|│🪰╰──────────────
|│🪰│▸ *PLUGINS* : ${cm.length} 
|│🪰│▸ *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
|│🪰│▸ *SAVER* : ${os.platform()}
|│🪰│▸ *THEME* : *VINKEL XMD THEMES*
|│🪰╰──────────────
|_╰_───_────_─────_───_───\n`;
    
let menuMsg = `

 *𝚅𝙸𝙽𝙺𝙴𝙻 𝚃𝙴𝙲𝙷🍀*${readmore}
`;

    for (const cat in coms) {
        menuMsg += ` |╭─=|───|───|─❒⁠⁠⁠⁠ *${cat}* ✣`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│🐉│▸ ${cmd}`;
        }
        menuMsg += `
|╰─_=──_─=───_=──_─=──_···▸▸ \n`
    }

    menuMsg += `> 𝙼𝙰𝙳𝙴 𝙴𝙰𝚂𝚈 𝙱𝚈 𝚅𝙸𝙽𝙺𝙴𝙻🍀
`;
    try {
            await client.sendMessage(m.chat, {
                text: menuText,
                contextInfo: {
                    mentionedJid: [m.sender], // Mention the sender
                    externalAdReply: {
                        title: "🌟 𝗞𝗔𝗥𝗟 𝗠𝗗 ✨",
                        body: "𝐫𝐞𝐠𝐚𝐫𝐝𝐬 𝗩𝗜𝗡𝗞𝗘𝗟",
                        thumbnailUrl: "https://files.catbox.moe/db846i.jpg",
                        sourceUrl: "https://whatsapp.com/channel/0029VaxZbeSDTkJwBgUb9u3N",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
    }

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *msela-chui-v2*, déveloper mselachui Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *msela-chui-v2*, déveloper mselachui Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
