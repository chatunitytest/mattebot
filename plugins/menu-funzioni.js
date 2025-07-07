import { promises as fs } from 'fs';

const handler = async (m, { conn, usedPrefix }) => {
  const {
    antiToxic, antilinkhard, antiPrivate, antitraba, antiArab, antiviewonce,
    isBanned, welcome, detect, antiLink, sologruppo, soloprivato,
    antiCall, modoadmin, antiPorno, jadibot, gpt
  } = global.db.data.chats[m.chat] || {};

  const botName = global.db.data.nomedelbot || "𝕸𝖆𝖙𝖙𝖊 𝖇𝖔𝖙✦";
  const status = v => v ? '✅' : '❌';

  const menuFunzioni = `
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛
         🛠️  𝐌𝐄𝐍𝐔 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈  🛠️
                  𝐁𝐘 𝐌𝐀𝐓𝐓𝐄 𝐁𝐎𝐓
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛

🔹 *Funzioni Gruppo*
⟡ detect: ${status(detect)}
⟡ gpt: ${status(gpt)}
⟡ jadibot: ${status(jadibot)}
⟡ benvenuto: ${status(welcome)}
⟡ sologruppo: ${status(sologruppo)}
⟡ soloprivato: ${status(soloprivato)}

🔹 *Protezione e Moderazione*
⟡ modoadmin: ${status(modoadmin)}
⟡ bangruppo: ${status(isBanned)}
⟡ antiporno: ${status(antiPorno)}
⟡ anticall: ${status(antiCall)}
⟡ antilink: ${status(antiLink)}
⟡ antitoxic: ${status(antiToxic)}

📌 *Comandi Utili:*
⟡ ${usedPrefix}attiva <funzione>
⟡ ${usedPrefix}disabilita <funzione>
⟡ ${usedPrefix}infostato

⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛
`.trim();

  await conn.sendMessage(m.chat, {
    text: menuFunzioni,
    contextInfo: {
      externalAdReply: {
        title: "𝕸𝖆𝖙𝖙𝖊 𝖇𝖔𝖙✦ - 𝐌𝐄𝐍𝐔 𝐅𝐔𝐍𝐙𝐈𝐎𝐍𝐈",
        body: "Controlla le funzioni attive nel gruppo",
        thumbnail: await fs.readFile('./storage/image/origin.jpg'),
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

handler.help = ['funzioni'];
handler.tags = ['menu'];
handler.command = /^(funzioni)$/i;

export default handler;