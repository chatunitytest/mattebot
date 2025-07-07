let handler = async (m, { conn }) => {
  if (!m.quoted) return m.reply('❗ Rispondi a un messaggio per analizzare il dispositivo usato.');

  const quoted = m.quoted;
  const msgID = quoted.id || quoted.key?.id || '';
  const senderJid = quoted.sender || m.sender;
  const numero = senderJid.split('@')[0];
  const tagUtente = numero;

  const detectDevice = (id) => {
    if (id.startsWith('false_') || id.startsWith('true_')) return ['💻 WhatsApp Web', '🌐 Wi-Fi'];
    if (id.includes(':')) return ['🖥️ WhatsApp Desktop', '🌐 Desktop'];
    if (/^[A-F0-9]{32}$/i.test(id)) return ['📱 Android', '📶 Mobile'];
    if (/^[0-9a-f\-]{36}$/i.test(id)) return ['🍏 iOS', '📶 Mobile'];
    if (id.startsWith('3EB0')) return ['🤖 Android (Legacy)', '📶 Mobile'];
    return ['🕵️ Dispositivo sconosciuto', '❓'];
  };

  const [device, connection] = detectDevice(msgID);

  const now = Math.floor(Date.now() / 1000);
  const quotedTimestamp = quoted.messageTimestamp || quoted.key?.timestamp || now;
  const delaySeconds = now - quotedTimestamp;
  const delay = delaySeconds < 60 ? `${delaySeconds}s` : delaySeconds < 3600 ? `${Math.floor(delaySeconds / 60)}m` : `${Math.floor(delaySeconds / 3600)}h`;

  const tipo = Object.keys(quoted.message || {}).join(', ') || 'Sconosciuto';
  const isForwarded = quoted.isForwarded ? '✅ Sì' : '❌ No';
  const dataOra = new Date(quotedTimestamp * 1000).toLocaleString('it-IT');

  // 📸 Profilo
  let pp = 'https://telegra.ph/file/0d7e77764ac7c5a02026c.png';
  try { pp = await conn.profilePictureUrl(senderJid, 'image'); } catch { }

  // 📝 Stato
  let status = '⚠️ Stato non disponibile';
  try {
    const info = await conn.fetchStatus(senderJid);
    if (info?.status) status = info.status;
  } catch { }

  // 🧊 Dark Frame Report
  const report = `
╭─────────────⚫️
│ 🎯 *𝘿𝙀𝙑𝙄𝘾𝙀 𝘾𝙃𝙀𝘾𝙆
⬛️─────────────
│ 👤 *Utente:* @${tagUtente}
│ 📞 *Numero:* +${numero}
│ 📝 *Bio:* ${status}
├─────────────
│ 🕰️ *Messaggio:* ${delay} fa
│ 📅 *Data:* ${dataOra}
│ 🔁 *Inoltrato:* ${isForwarded}
│ 📩 *Tipo:* ${tipo}
⬛️─────────────
│ 💽 *Dispositivo:* ${device}
│ 📡 *Connessione:* ${connection}
│ 🆔 *ID:* ${msgID.slice(0, 20)}...
⬛️─────────────⚫️
`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: report,
    mentions: [senderJid]
  }, { quoted: m });
};

handler.command = /^(report|device|dispositivo|bigcheck)$/i;
handler.group = true;
export default handler;