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

  // Nuovi dati richiesti
  const mattecash = data.mattecash || 0;
  const totalPokemons = (data.pokemons && data.pokemons.length) || 0;

  const profileMessage = `
꧁════ ☾︎•✦•☽︎ ════꧂
𝕄𝕖𝕤𝕤𝕒𝕘𝕘𝕚: ${messaggi}
𝕎𝕒𝕣𝕟: ${warn} / 4
ℝ𝕦𝕠𝕝𝕠: ${ruolo} 👑
ℂ𝕒𝕥𝕖𝕘𝕠𝕣𝕚𝕒: ${categoria}
𝔾𝕣𝕒𝕕𝕠: ${grado}
𝔼𝕥𝕒̀: ${eta}
𝔾𝕖𝕟𝕖𝕣𝕖: ${genere}
𝔹𝕚𝕠: ${bio}
𝕍𝕚𝕥𝕥𝕠𝕣𝕚𝕖 𝕕𝕖𝕝𝕝𝕒 𝕤𝕝𝕠𝕥: ${vittorie}
𝔓𝔢𝔱: ${pet}
💰 Mattecash: ${mattecash}
📦 Pokémon posseduti: ${totalPokemons}
instagram.com/${instagram}
꧁════ ☾︎•✦•☽︎ ════꧂
  `.trim();

  await conn.sendMessage(m.chat, { text: profileMessage, mentions: [user] }, { quoted: m });
};

handler.help = ['profilo'];
handler.tags = ['info'];
handler.command = /^profilo$/i;

export default handler;