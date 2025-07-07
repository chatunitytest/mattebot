let handler = async (m, { conn }) => {
  await m.reply('👋 𝐂𝐢𝐚𝐨 𝐛𝐞𝐥𝐥𝐢, 𝐢𝐨 𝐬𝐜𝐞𝐬𝐬𝐨 𝐝𝐚𝐥 𝐭𝐫𝐚𝐦! 💨');
  await conn.groupLeave(m.chat);
};

handler.command = /^(out|leavegc|leave|salirdelgrupo)$/i;
handler.group = true;
handler.rowner = true;

export default handler;