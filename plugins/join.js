// Plugin .join — MatteBot 😈
// Solo il padrone del bot può ordinare questa mossa

const handler = async (m, { conn, command, isOwner, args }) => {
    if (!isOwner) {
        return conn.reply(m.chat, '🚫 Questo comando è riservato al creatore di *MatteBot*. Tu non sei nessuno.', m);
    }

    if (command === 'join') {
        if (!args[0]) {
            return conn.reply(m.chat, '❌ *Link mancante.*\nDammi qualcosa con cui lavorare.', m);
        }

        try {
            const linkRegex = /(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})/i;
            const match = args[0].match(linkRegex);

            if (!match) {
                return conn.reply(m.chat, '❗ *Link non valido.*\nNon farmi perdere tempo.', m);
            }

            const code = match[2];

            try {
                await conn.groupAcceptInvite(code);
                conn.reply(m.chat, '✅ *MatteBot è entrato nel gruppo.*\nLa festa è iniziata.', m);
            } catch (err) {
                console.error("Errore nell'entrare nel gruppo:", err);
                conn.reply(m.chat, '⚠️ *Errore nell\'unirsi al gruppo.*\nControlla il link o se il bot è bloccato.', m);
            }

        } catch (e) {
            console.error(e);
            conn.reply(m.chat, '💥 *Errore interno.*\nMatteBot ha avuto un momento di rabbia.', m);
        }
    }
};

handler.command = /^(join)$/i;
handler.owner = true;

export default handler;