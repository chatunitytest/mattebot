let handler = async (m, { conn }) => {
  const message = `
🎁 *PACCHETTI DISPONIBILI* 🎁

1. 📦 *Base*  
   💰 Costo: *100* Mattecash  
   🎲 2 Comuni, 1 Non Comune

2. 👑 *Imperium*  
   💰 Costo: *10.000.000* Mattecash  
   🎲 1 Comune, 1 Non Comune, 1 Raro + chance Leggendario

3. 🌌 *Premium*  
   💰 Costo: *1.000.000.000.000* Mattecash  
   🎲 3 Rari Holo garantiti + chance Leggendario  
   🔄 Ogni 10 pacchetti premium aperti, 50% di trovare un *pacchetto DARKNESS*

⬇️ Usa i bottoni per acquistare o vedere i tuoi pacchetti.
`.trim();

  await conn.sendMessage(m.chat, {
    text: message,
    footer: '💡 Usa .apri <tipo> [quantità] per aprire i pacchetti!',
    buttons: [
      { buttonId: '.buy base', buttonText: { displayText: '📦 Compra Base' }, type: 1 },
      { buttonId: '.buy imperium', buttonText: { displayText: '👑 Compra Imperium' }, type: 1 },
      { buttonId: '.buy premium', buttonText: { displayText: '🌌 Compra Premium' }, type: 1 },
      { buttonId: '.imieipacchetti', buttonText: { displayText: '📂 I Miei Pacchetti' }, type: 1 },
      { buttonId: '.darknessinfo', buttonText: { displayText: '🌑 DARKNESS' }, type: 1 }
    ]
  }, { quoted: m });
};

handler.help = ['pacchetti'];
handler.tags = ['pokemon'];
handler.command = /^pacchetti$/i;

export default handler;