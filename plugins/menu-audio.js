import { promises as fs } from 'fs';

const handler = async (m, { conn, usedPrefix }) => {
  const botName = global.db.data.nomedelbot || "𝕸𝖆𝖙𝖙𝖊 𝖇𝖔𝖙✦";

  const menuAudio = `
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛
     🎧  𝐌𝐄𝐍𝐔 𝐀𝐔𝐃𝐈𝐎  🎧
        𝐁𝐘 𝐌𝐀𝐓𝐓𝐄 𝐁𝐎𝐓
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛

🎙️ *Rispondi a un audio con uno di questi comandi:*

⟡ ${usedPrefix}blown
⟡ ${usedPrefix}reverse
⟡ ${usedPrefix}chipmunk
⟡ ${usedPrefix}deep
⟡ ${usedPrefix}fast
⟡ ${usedPrefix}slow
⟡ ${usedPrefix}squirrel
⟡ ${usedPrefix}bass
⟡ ${usedPrefix}robot
⟡ ${usedPrefix}nightcore
⟡ ${usedPrefix}earrape

⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛
`.trim();

  await conn.sendMessage(m.chat, {
    text: menuAudio,
    contextInfo: {
      externalAdReply: {
        title: "𝕸𝖆𝖙𝖙𝖊 𝖇𝖔𝖙✦ - 𝐌𝐄𝐍𝐔 𝐀𝐔𝐃𝐈𝐎",
        body: "Effetti audio disponibili",
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

handler.help = ['menuaudio', 'audio'];
handler.tags = ['audio'];
handler.command = /^(menuaudio|audio)$/i;

export default handler;