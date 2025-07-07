let handler = async (m, { conn }) => {
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];

  const messaggi = data.messages || 0;
  const warn = data.warns || 0;
  const ruolo = data.role || 'Nessuno';
  const categoria = data.category || 'Nessuna';
  const grado = data.rank || 'Nessuno';
  const eta = data.age || 'Non impostata';
  const genere = data.gender || 'Non impostato';
  const bio = data.bio || 'Non impostata';
  const vittorie = data.slotWins || 0;
  const pet = data.pet || 'Nessuno';
  const instagram = data.instagram || 'Non impostato';
  const mattecash = data.mattecash || 0;
  const totalPokemons = (data.pokemons && data.pokemons.length) || 0;

  const profileMessage = `
╭━━❰ 𝐏𝐑𝐎𝐅𝐈𝐋𝐎 𝐔𝐓𝐄𝐍𝐓𝐄 ❱━━╮
┃👤 *Messaggi:* ${messaggi}
┃🚫 *Warn:* ${warn} / 4
┃🎭 *Ruolo:* ${ruolo}
┃📚 *Categoria:* ${categoria}
┃🎖️ *Grado:* ${grado}
┃📆 *Età:* ${eta}
┃⚧️ *Genere:* ${genere}
┃📝 *Bio:* ${bio}
┃🎰 *Slot vinte:* ${vittorie}
┃🐾 *Pet:* ${pet}
┃💰 *Mattecash:* ${mattecash}
┃🎮 *Pokémon posseduti:* ${totalPokemons}
┃📸 *Instagram:* instagram.com/${instagram}
╰━━━━━━━━━━━━━━━━━━━━╯
`.trim();

  await conn.sendMessage(m.chat, { text: profileMessage, mentions: [user] }, { quoted: m });
};

handler.help = ['profilo'];
handler.tags = ['info'];
handler.command = /^profilo$/i;

export default handler;