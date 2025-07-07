let handler = async (m, { conn }) => {
  const user = m.sender;
  global.db.data.users[user] = global.db.data.users[user] || {};
  const data = global.db.data.users[user];
  data.pokemons = data.pokemons || [];

  const darkness = data.pokemons.filter(p => p.type === 'Darkness');

  if (darkness.length === 0) {
    return m.reply(`🌑 Non hai ancora trovato nessun Pokémon *Darkness*! Apri pacchetti premium e spera nella sorte...`);
  }

  const list = darkness.map((p, i) => `#${i + 1} ➤ *${p.name}* (Lvl ${p.level})`).join('\n');

  return m.reply(`🌌 *POKÉMON DARKNESS TROVATI:*\n\n${list}`);
};

handler.help = ['darkness'];
handler.tags = ['pokemon'];
handler.command = /^darkness$/i;

export default handler;