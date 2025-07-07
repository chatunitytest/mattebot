const frasiOscure = [
  '“Meglio regnare all’inferno che servire in cielo.” – Lucifero',
  '“Il fuoco che arde dentro non ha bisogno di redenzione.”',
  '“Luce caduta, non significa luce spenta.”',
  '“Satana non è un demone. È l’onestà priva di maschere divine.”',
  '“Nacqui ribelle, morirò sovrano.”',
  '“Il paradiso mente, l’inferno svela.”',
  '“L’abisso non guarda te. Ti accoglie.”',
  '“Coloro che camminano con le ombre vedono ciò che i santi temono.”'
]

let handler = async (m, { conn }) => {
  if (!m.isGroup || !m.messageStubType || m.messageStubType !== 29) return;

  const frase = frasiOscure[Math.floor(Math.random() * frasiOscure.length)];

  const cornice = (contenuto) => `
╭═════【 🌹 𝕽𝕺𝕾𝕰 𝕭𝕺𝕿 🌹 】═════╮

  ${contenuto}

╰═════【 🌹 𝕽𝕺𝕾𝕰 𝕭𝕺𝕿 🌹 】═════╯`.trim()

  // Step 1 – Messaggio vuoto
  let sent = await conn.sendMessage(m.chat, { text: '👁‍🗨' }, { quoted: m });

  // Step 2 – Animazione in fasi
  const fasi = [
    '🌑', '🌒', '🌓', '🌔', '🌕',
    cornice('Invocazione...'),
    cornice('Ascesa...'),
    cornice(frase)
  ]

  for (let fase of fasi) {
    await new Promise(resolve => setTimeout(resolve, 1100)) // delay
    await conn.sendMessage(m.chat, {
      text: fase,
      edit: sent.key
    })
  }
}

handler.group = true
export default handler