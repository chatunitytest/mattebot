let handler = async (m, { conn }) => {
  const groupToExclude = '120363368641021092@g.us'; // ID del gruppo da NON abbandonare
  const ownerId = '46737807114@s.whatsapp.net'; // ID del proprietario del bot

  let groups = await conn.groupFetchAllParticipating();
  let leftGroups = [];

  for (let id in groups) {
    if (id !== groupToExclude) {
      await conn.sendMessage(id, {
        text: '⚠️ *Il bot ha lasciato questo gruppo.*\n🖤 *Motivo:* inattività o decisione forzata.'
      });
      await conn.groupLeave(id);
      leftGroups.push(groups[id].subject);
    }
  }

  const message = `
╭━━〔 📤 𝐑𝐄𝐏𝐎𝐑𝐓 𝐔𝐒𝐂𝐈𝐓𝐄 〕━━
┃📛 *Gruppi lasciati:* ${leftGroups.length}
┃📋 *Elenco:*
${leftGroups.length ? leftGroups.map(g => `┃- ${g}`).join('\n') : '┃- Nessun gruppo lasciato'}
╰━━━━━━━━━━━━━━━━━━━━━━
`.trim();

  await conn.sendMessage(ownerId, { text: message });
};

handler.command = /^(outall)$/i;
handler.group = true;
handler.rowner = true;

export default handler;