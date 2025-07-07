// Codice di admin-deletesession.js

import { existsSync, promises as fs } from 'fs';
import path from 'path';

const handler = async (m, { conn }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, {
      text: '🚨 Usa questo comando direttamente nel numero del bot.'
    }, { quoted: m });
  }

  await conn.sendMessage(m.chat, {
    text: '⚙️ Ripristino delle sessioni in corso...'
  }, { quoted: m });

  const dir = './Sessioni/';
  if (!existsSync(dir)) {
    return conn.sendMessage(m.chat, {
      text: '❌ Cartella delle sessioni non trovata o vuota.'
    }, { quoted: m });
  }

  try {
    const files = await fs.readdir(dir);
    const toDelete = files.filter(f => f !== 'creds.json');
    let deleted = 0;

    for (const file of toDelete) {
      await fs.unlink(path.join(dir, file));
      deleted++;
    }

    const msg = deleted === 0
      ? '❗ Nessuna sessione da eliminare.'
      : `🔥 Eliminati ${deleted} file di sessione.`;

    await conn.sendMessage(m.chat, { text: msg }, { quoted: m });

    await conn.sendMessage(m.chat, {
      text: '✅ Ora puoi leggere nuovamente i messaggi del bot.'
    }, { quoted: m });

  } catch (err) {
    console.error(err);
    await conn.sendMessage(m.chat, {
      text: '❌ Errore durante l\'eliminazione delle sessioni.'
    }, { quoted: m });
  }
};

handler.help = ['deletession'];
handler.tags = ['owner'];
handler.command = /^(deletession|ds|clearallsession)$/i;
handler.admin = true;

export default handler;