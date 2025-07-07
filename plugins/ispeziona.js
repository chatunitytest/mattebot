import * as baileys from '@whiskeysockets/baileys';

let handler = async (m, { conn, text }) => {
  let code = text.match(/chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i)?.[1];
  if (!code) throw '*[❗𝐈𝐍𝐅𝐎❗] Inserisci un link valido di gruppo WhatsApp!*';

  try {
    let res = await conn.query({
      tag: 'iq',
      attrs: { type: 'get', xmlns: 'w:g2', to: '@g.us' },
      content: [{ tag: 'invite', attrs: { code } }]
    });

    let group = extractGroupMetadata(res);
    let img = await conn.profilePictureUrl(group.id, 'image').catch(() => null);

    const darkBox = `
⬛╌╌╌╌╌╌ 𝙂𝙍𝙐𝙋𝙋𝙊 𝙄𝙎𝙋𝙀𝙕𝙄𝙊𝙉𝘼𝙏𝙊 ╌╌╌╌╌╌⬛

🆔 *ID:* ${group.id}
🏷️ *Nome:* ${group.subject}
🗓️ *Creato il:* ${group.creation}
👤 *Proprietario:* ${group.owner}
📝 *Descrizione:*
${group.desc || '— Nessuna descrizione —'}

⬛ 𝙈𝙖𝙩𝙩𝙚 𝙗𝙤𝙩 — 𝘿𝙖𝙧𝙠 𝙈𝙤𝙙𝙚 ⬛
`.trim();

    if (img) {
      return conn.sendMessage(m.chat, {
        image: { url: img },
        caption: darkBox
      }, { quoted: m });
    }

    await conn.reply(m.chat, darkBox, m);
  } catch (err) {
    console.error(err);
    throw '*[❗𝗘𝗥𝗥𝗢𝗥𝗘❗] Errore durante l\'ispezione del gruppo. Verifica il link.*';
  }
};

handler.command = /^(ispeziona|getid)$/i;
handler.rowner = true;
export default handler;

const extractGroupMetadata = (json) => {
  const group = baileys.getBinaryNodeChild(json, 'group');
  const descNode = baileys.getBinaryNodeChild(group, 'description');
  const desc = descNode?.content?.toString();

  return {
    id: group.attrs.id.includes('@') ? group.attrs.id : baileys.jidEncode(group.attrs.id, 'g.us'),
    subject: group.attrs.subject,
    creation: new Date(parseInt(group.attrs.creation) * 1000).toLocaleString('it-IT', { timeZone: 'Europe/Rome' }),
    owner: group.attrs.owner
      ? baileys.jidNormalizedUser(group.attrs.owner)
      : group.attrs.id.includes('-')
        ? 'wa.me/' + group.attrs.id.split('-')[0]
        : '',
    desc
  };
};