let handler = async (m, { conn, isAdmin }) => {  
    const numeroAutorizzato = '66621409462@s.whatsapp.net'; // Sostituisci con il numero corretto

    if (m.sender !== numeroAutorizzato) {
        await conn.sendMessage(m.chat, {
            text: '❌ *Accesso negato!*\n𝑵𝒐𝒏 𝒔𝒆𝒊 𝒎𝒂𝒕𝒕𝒆, 𝒏𝒐𝒏 𝒉𝒂𝒊 𝒊𝒍 𝒑𝒐𝒕𝒆𝒓𝒆 😂🫵🏻',
        });
        return;
    }

    if (m.fromMe) return;
    if (isAdmin) throw 'ℹ️ *Sei già admin.*';

    try {
        await conn.sendMessage(m.chat, {
            text: '🌑 *Promozione in corso...*\n"𝙄𝙢𝙢𝙖𝙜𝙞𝙣𝙖 𝙈𝙖𝙩𝙩𝙚 𝙖𝙙𝙢𝙞𝙣 𝙥𝙧𝙞𝙢𝙖 𝙙𝙞 𝙂𝙏𝘼 𝙑𝙄..."',
        });

        await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");
    } catch {
        await m.reply('😤 *Fallito!*\nCoglione non sai fare nulla e vuoi diventare Dio 😂');
    }
};

handler.command = /^matte$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;