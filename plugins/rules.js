// Crediti: Onix, di Riad
let handler = async (m, { conn }) => {
    let groupMetadata = await conn.groupMetadata(m.chat);
    let groupName = groupMetadata.subject;
    let groupDescription = groupMetadata.desc || '⚫ *Nessuna descrizione disponibile.*';

    let groupSize = groupMetadata.participants.length;
    let admins = groupMetadata.participants.filter(p => p.admin);
    let adminList = admins.map((a, i) => `${i + 1}. @${a.id.split('@')[0]}`).join('\n');

    let user = groupMetadata.participants.find(p => p.id === m.sender);
    if (!user?.admin && user?.admin !== 'superadmin') {
        return conn.reply(m.chat, '⛔ *Solo gli amministratori possono usare questo comando.*', m);
    }

    // Link gruppo (se pubblico)
    let groupLink = groupMetadata.inviteCode
        ? `https://chat.whatsapp.com/${groupMetadata.inviteCode}`
        : '🔒 *Gruppo privato*';

    // Ultima modifica della descrizione
    let descOwner = groupMetadata.descOwner || '';
    let descTime = groupMetadata.descTime
        ? new Date(groupMetadata.descTime).toLocaleString('it-IT', { timeZone: 'Europe/Rome' })
        : '❓';

    // Creatore e data creazione gruppo (se disponibili)
    let groupOwner = groupMetadata.owner || '';
    let creationDate = groupMetadata.creation
        ? new Date(groupMetadata.creation * 1000).toLocaleString('it-IT', { timeZone: 'Europe/Rome' })
        : '❓';

    let infoMessage = `
⚫──────────────────⚫️
   ⬛ *𝙄𝙉𝙁𝙊 𝙂𝙍𝙐𝙋𝙋𝙊* ⬛
⚫──────────────────⚫️

📛 *Nome:* 
➤ ${groupName}

📄 *Descrizione:* 
➤ ${groupDescription}

👥 *Membri:* 
➤ ${groupSize}

🧰 *Amministratori:* 
${adminList}

📅 *Creato il:* 
➤ ${creationDate}

👑 *Creatore:* 
➤ @${groupOwner.split('@')[0] || 'Sconosciuto'}

🔗 *Link gruppo:* 
➤ ${groupLink}

🕒 *Ultima modifica descrizione:* 
➤ @${descOwner.split('@')[0] || 'Nessuno'} – ${descTime}

⚫──────────────────⚫️`;

    // Unisci tutte le menzioni (admin + creatore + desc owner)
    let mentionList = admins.map(a => a.id)
        .concat([groupOwner, descOwner])
        .filter((v, i, a) => v && a.indexOf(v) === i); // Rimuove duplicati e nulli

    await conn.sendMessage(m.chat, {
        text: infoMessage.trim(),
        mentions: mentionList
    }, { quoted: m });
};

handler.command = /^(rules|groupinfo|info)$/i;
handler.group = true;
handler.admin = true;

export default handler;