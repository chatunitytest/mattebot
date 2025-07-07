import { promises as fs } from 'fs';

let handler = async (m, { conn, usedPrefix }) => {
  const botName = global.db.data.nomedelbot || "𝕸𝖆𝖙𝖙𝖊 𝖇𝖔𝖙✦";

  const menuText = `
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛
          🎯  𝐌𝐄𝐍𝐔 𝐆𝐑𝐔𝐏𝐏𝐎  🎯
                𝐁𝐘 𝐌𝐀𝐓𝐓𝐄 𝐁𝐎𝐓
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛

🧠 𝗜𝗡𝗧𝗘𝗟𝗟𝗜𝗚𝗘𝗡𝗭𝗔 𝗔𝗥𝗧𝗜𝗙𝗜𝗖𝗜𝗔𝗟𝗘
⟡ bot
⟡ ia

🎵 𝗠𝗨𝗦𝗜𝗖𝗔 & 𝗩𝗜𝗗𝗘𝗢
⟡ play <titolo>
⟡ video <titolo>
⟡ shazam

🌦️ 𝗜𝗡𝗙𝗢 & 𝗨𝗧𝗜𝗟𝗜𝗧𝗔'
⟡ meteo <città>
⟡ hd <foto>
⟡ leggi <foto>
⟡ calc 1+1
⟡ conta <testo>
⟡ msg @utente
⟡ id

🖼️ 𝗜𝗠𝗔𝗚𝗜𝗡𝗜 & 𝗤𝗥
⟡ img
⟡ setig
⟡ eliminaig
⟡ qrcode <testo>
⟡ styletxt <testo>
⟡ rivela <foto>
⟡ ttp <testo>

🎭 𝗚𝗜𝗢𝗖𝗛𝗜 & 𝗠𝗘𝗠𝗘𝗦
⟡ tris
⟡ dado
⟡ sposami
⟡ crush
⟡ topgays
⟡ topnazi

💥 𝗧𝗔𝗚 𝗚𝗨𝗘𝗥𝗥𝗔
⟡ sega <nome>
⟡ ditalino <nome>
⟡ insulta <nome>
⟡ bello/a @
⟡ gay @
⟡ puttana @
⟡ lesbica @
⟡ insulta @
⟡ scopami @
⟡ abbraccia @
⟡ odio @
⟡ amore @
⟡ dox @

🧩 𝗦𝗧𝗜𝗖𝗞𝗘𝗥𝗦 & 𝗠𝗘𝗗𝗜𝗔
⟡ sticker / s
⟡ rimuovisfondo
⟡ tovideo
⟡ togif

🔧 𝗔𝗟𝗧𝗥𝗢
⟡ gitclone
⟡ autoadmin

⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛
`.trim();

  await conn.sendMessage(m.chat, {
    text: menuText,
    contextInfo: {
      externalAdReply: {
        title: "𝕸𝖆𝖙𝖙𝖊 𝖇𝖔𝖙✦ - 𝐌𝐄𝐍𝐔 𝐆𝐑𝐔𝐏𝐏𝐎",
        body: "Comandi utili per il tuo gruppo",
        thumbnail: await fs.readFile('./storage/image/chatunity.png'),
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

handler.help = ['menugruppo'];
handler.tags = ['menu'];
handler.command = /^(menugruppo|gruppo)$/i;

export default handler;