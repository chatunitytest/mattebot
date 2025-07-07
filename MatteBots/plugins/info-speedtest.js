import cp from 'child_process';
import { promisify } from 'util';
import translate from '@vitalets/google-translate-api';

const exec = promisify(cp.exec).bind(cp);

const handler = async (m, { conn }) => {
  await conn.reply(m.chat, '🕒 *Attendi, sto eseguendo lo speed test...*', m);

  let o;
  try {
    o = await exec('python3 speed.py --secure --share');
  } catch (e) {
    o = e;
  } finally {
    const { stdout, stderr } = o;

    if (stdout.trim()) {
      const translated = await translate(stdout, { to: 'it' });
      let text = translated.text;

      // Pulizia e formattazione "dark style"
      text = text
        .replace(/Scarica/g, '🔵 *Download*')
        .replace(/Carica/g, '🟣 *Upload*')
        .replace(/Ospitato/g, 'Hostato')
        .replace(/Test di velocità di download\s+-\s+/g, '\n──────────────\n🔵 *Download:* ')
        .replace(/Test di velocità di caricamento\s+-\s+/g, '🟣 *Upload:* ')
        .replace(/Test da/g, '\n> 📍 *Test da*')
        .replace(/Recupero elenco di server Speedtest.net/g, '> 🌐 Recupero server')
        .replace(/Selezionando il miglior server in base al ping/g, '> ⚡ Scelta server migliore (ping)')
        .replace(/Hostato da/g, '> 🏢 *Hostato da*')
        .replace(/MS/g, 'ms\n')
        .replace(/Mbit\/s/g, 'Mbps');

      const finalReply = `
🌑━━━━━━━━━━━━━━━🌒
⬛ *𝙎𝙋𝙀𝙀𝘿𝙏𝙀𝙎𝙏 – 𝙈𝙊𝘿𝙀 𝘿𝘼𝙍𝙆* ⬛
🌘━━━━━━━━━━━━━━━🌕
${text.trim()}
🌑━━━━━━━━━━━━━━━🌑
      `.trim();

      m.reply(finalReply);
    }

    if (stderr.trim()) {
      const translated = await translate(stderr, { to: 'it' });
      m.reply(`⚠️ *Errore:* ${translated.text}`);
    }
  }
};

handler.help = ['speedtest'];
handler.tags = ['info'];
handler.command = /^(speedtest?|test?|speed)$/i;
handler.owner = true;

export default handler;