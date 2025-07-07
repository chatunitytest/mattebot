import fs from 'fs';
import os from 'os';
import { performance } from 'perf_hooks';

const tmas = number => {
  const map = {'0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'};
  return number.toString().split('').map(d => map[d] || d).join('');
};

const clockString = ms => {
  const days = String(Math.floor(ms / 86400000)).padStart(2, '0');
  const hours = String(Math.floor((ms % 86400000) / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  return `${tmas(days)}:${tmas(hours)}:${tmas(minutes)}:${tmas(seconds)}`;
};

const ramBar = (used, total, length = 20) => {
  const ratio = used / total;
  const filled = Math.round(ratio * length);
  const empty = length - filled;
  return `|${'█'.repeat(filled)}${'░'.repeat(empty)}|`;
};

const handler = async (m, { conn }) => {
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);

  const speedStart = performance.now();
  const speedEnd = performance.now();
  const speed = (speedEnd - speedStart).toFixed(4);
  const speedWithFont = tmas(speed);

  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const totalMemGB = (totalMem / (1024 ** 3)).toFixed(2);
  const usedMemGB = (usedMem / (1024 ** 3)).toFixed(2);
  const ramVisual = ramBar(usedMem, totalMem);

  const { heapUsed, heapTotal } = process.memoryUsage();
  const heapUsedMB = (heapUsed / (1024 ** 2)).toFixed(2);
  const heapTotalMB = (heapTotal / (1024 ** 2)).toFixed(2);

  const mention = m.mentionedJid?.[0] || m.quoted?.sender || m.sender;
  const image = fs.readFileSync('./icone/ping.png');

  const nomeDelBot = 'Matte bot';

  const timestamp = new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' });
  const statusEmoji = _uptime > 0 ? '🟢' : '🔴';

  const info = `
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛
   ⚙️ 𝘚𝘛𝘈𝘛𝘖 𝘉𝘖𝘛 – ${nomeDelBot} ${statusEmoji}
⬛╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌⬛

⏱️ 𝗨𝗽𝘁𝗶𝗺𝗲: ${uptime}
⚡ 𝗩𝗲𝗹𝗼𝗰𝗶𝘁𝗮̀: ${speedWithFont} 𝘀𝗲𝗰

🧠 𝗥𝗔𝗠 𝗦𝗲𝗿𝘃𝗲𝗿: ${usedMemGB} GB / ${totalMemGB} GB
${ramVisual}

🔧 𝗠𝗲𝗺 𝗣𝗿𝗼𝗰𝗲𝘀𝘀𝗼: ${heapUsedMB} MB / ${heapTotalMB} MB

📅 𝗢𝗿𝗮: ${timestamp}

⬛ 𝘔𝘢𝘵𝘵𝘦 𝘣𝘰𝘵 — 𝘋𝘢𝘳𝘬 𝘔𝘰𝘥𝘦 ⬛
`.trim();

  const msg = {
    key: {
      participants: "0@s.whatsapp.net",
      fromMe: false,
      id: "ping_dark"
    },
    message: {
      documentMessage: {
        title: `${nomeDelBot} 𝗣𝗜𝗡𝗚 🏓`,
        jpegThumbnail: image
      }
    },
    participant: "0@s.whatsapp.net"
  };

  conn.reply(m.chat, info, msg, m);
};

handler.command = /^(ping)$/i;
export default handler;