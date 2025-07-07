import os from 'os';
import util from 'util';
import humanReadable from 'human-readable';
import { default as makeWASocket } from '@whiskeysockets/baileys';
import { promises as fs } from 'fs';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => {
  const botName = global.db.data.nomedelbot || "𝕸𝖆𝖙𝖙𝖊 𝖇𝖔𝖙✦";
  const commandList = `
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛
    ✦ 𝗣𝗔𝗡𝗡𝗘𝗟𝗟𝗢 𝗠𝗢𝗗𝗘𝗥𝗔𝗧𝗢𝗥𝗘 ✦  
              𝐌𝐀𝐓𝐓𝐄𝐁𝐎𝐓
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛

⚙️ 𝗖𝗼𝗺𝗮𝗻𝗱𝗶 𝗱𝗶𝘀𝗽𝗼𝗻𝗶𝗯𝗶𝗹𝗶:

⟡ ${usedPrefix}impostanome
⟡ ${usedPrefix}resettanome
⟡ ${usedPrefix}gestisci @
⟡ ${usedPrefix}setgruppi
⟡ ${usedPrefix}aggiungigruppi @
⟡ ${usedPrefix}resetgruppi @
⟡ ${usedPrefix}setpp (immagine)

🚫 Moderazione Utenti:
⟡ ${usedPrefix}banuser @
⟡ ${usedPrefix}unbanuser @
⟡ ${usedPrefix}blockuser @
⟡ ${usedPrefix}unblockuser @

🧹 Pulizia & Gestione:
⟡ ${usedPrefix}pulizia (+)
⟡ ${usedPrefix}azzera @
⟡ ${usedPrefix}aggiungi (num. messaggi) @
⟡ ${usedPrefix}rimuovi (num. messaggi) @

📁 File & Plugin:
⟡ ${usedPrefix}getfile
⟡ ${usedPrefix}salva (plugin)
⟡ ${usedPrefix}dp (plugin)
⟡ ${usedPrefix}getplugin

🔗 Gruppi:
⟡ ${usedPrefix}join + link
⟡ ${usedPrefix}out

⚡ Impostazioni Avanzate:
⟡ ${usedPrefix}prefisso (?)
⟡ ${usedPrefix}resettaprefisso
⟡ ${usedPrefix}godmode {autoadmin}

⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛


`;

  await conn.sendMessage(m.chat, {
    text: commandList,
    contextInfo: {
      externalAdReply: {
        title: "𝕸𝖆𝖙𝖙𝖊 𝖇𝖔𝖙✦ - 𝐎𝐖𝐍𝐄𝐑 𝐌𝐄𝐍𝐔",
        body: "BY MATTE - 𝐓𝐇𝐄 𝐁𝐄𝐒𝐓",
        thumbnail: await fs.readFile('./storage/image/origin.jpg'), // Aggiungi l'immagine di anteprima
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
      },
     // forwardingScore: 1,
     // isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363370244642449@newsletter',
        serverMessageId: '',
        newsletterName: botName
      }
    }
  }, { quoted: m });
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(menuowner|owner)$/i;

export default handler;

function clockString(ms) {
  const time = [
    Math.floor(ms / 3600000),
    Math.floor(ms / 60000) % 60,
    Math.floor(ms / 1000) % 60
  ].map(t => 
    t.toString().padStart(2, '0')
  ).join(':');
  return time;
}
