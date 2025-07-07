import os from 'os';
import util from 'util';
import humanReadable from 'human-readable';
import { default as makeWASocket } from '@whiskeysockets/baileys';
import { promises as fs } from 'fs';
import { performance } from 'perf_hooks';

let handler = async (m, { conn, usedPrefix }) => {
  const botName = global.db.data.nomedelbot || "𝕸𝖆𝖙𝖙𝖊 𝖇𝖔𝖙✦";

  const adminMenu = `
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛
                  𝐌𝐄𝐍𝐔 𝐀𝐃𝐌𝐈𝐍  
                    𝐌𝐀𝐓𝐓𝐄𝐁𝐎𝐓
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛

🛡️ *Controllo Utenti:*
⟡ ${usedPrefix}promuovi / mettiadmin
⟡ ${usedPrefix}retrocedi / togliadmin
⟡ ${usedPrefix}warn / unwarn
⟡ ${usedPrefix}muta / smuta
⟡ ${usedPrefix}parlate / zitti

🧩 *Gestione Gruppo:*
⟡ ${usedPrefix}hidetag
⟡ ${usedPrefix}tagall / marcar
⟡ ${usedPrefix}setwelcome
⟡ ${usedPrefix}setbye
⟡ ${usedPrefix}inattivi

🧹 *Pulizia & Tools:*
⟡ ${usedPrefix}listanum + prefisso
⟡ ${usedPrefix}pulizia + prefisso

⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛
`.trim();

  await conn.sendMessage(m.chat, {
    text: adminMenu,
    contextInfo: {
      externalAdReply: {
        title: "𝕸𝖆𝖙𝖙𝖊 𝖇𝖔𝖙✦ - 𝐌𝐄𝐍𝐔 𝐀𝐃𝐌𝐈𝐍",
        body: "𝐁𝐘 𝐌𝐀𝐓𝐓𝐄 - 𝐓𝐇𝐄 𝐁𝐄𝐒𝐓",
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363370244642449@newsletter',
          serverMessageId: '',
          newsletterName: botName
        }
      }
    }
  }, { quoted: m });
};

handler.help = ["menuadm", "admin"];
handler.tags = ['menu'];
handler.command = /^(menuadm|admin)$/i;

export default handler;