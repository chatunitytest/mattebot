import { promises as fs } from 'fs'
import path from 'path'

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

const cornice = (contenuto) => `
╭═════【 🌹 𝕽𝕺𝕾𝕰 𝕭𝕺𝕿 🌹 】═════╮

  ${contenuto}

╰═════【 🌹 𝕽𝕺𝕾𝕰 𝕭𝕺𝕿 🌹 】═════╯`.trim()

let handler = async (m, { conn }) => {
  if (!m.isGroup) return

  const frase = frasiOscure[Math.floor(Math.random() * frasiOscure.length)]
  const filePath = './media/rosebot.png' // Percorso dell'immagine

  let sent = await conn.sendMessage(m.chat, { text: '👁‍🗨' }, { quoted: m })

  const fasi = [
    '🌑', '🌒', '🌓', '🌔', '🌕',
    cornice('Invocazione...'),
    cornice('Ascesa...'),
    cornice(frase)
  ]

  for (let fase of fasi) {
    await new Promise(resolve => setTimeout(resolve, 1100))
    await conn.sendMessage(m.chat, {
      text: fase,
      edit: sent.key
    })
  }

  // Invio immagine finale
  try {
    const buffer = await fs.readFile(filePath)
    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: '🌹 𝕽𝕺𝕾𝕰 𝕭𝕺𝕿 è tra voi. La verità brucia come l’inferno.'
    })
  } catch (e) {
    console.error(`Errore nell’invio dell’immagine: ${e.message}`)
    await conn.sendMessage(m.chat, {
      text: '⚠️ Immagine finale non trovata. Assicurati che *rosebot.png* sia in /media.'
    })
  }
}

handler.command = /^rosebot$/i
handler.tags = ['fun']
handler.help = ['rosebot']
handler.group = true

export default handler