// Plugin anti-link canali — MatteBot Edition 😈
// Creato per punire chi rompe con i loro canali inutili

const channelLinkRegex = /whatsapp\.com\/(?:channel|broadcast)\/[0-9A-Za-z]{20,}/i;
const maxWarn = 4;

export async function before(m, { isAdmin, isBotAdmin, conn }) {
    if (!m.isGroup || m.isBaileys) return true;

    let chat = global.db.data.chats[m.chat];
    if (!chat.antilinkch) return true;

    if (channelLinkRegex.test(m.text)) {
        if (isAdmin) return true;

        const user = global.db.data.users[m.sender];
        user.warn = user.warn || 0;

        if (user.warn >= maxWarn) {
            await conn.sendMessage(m.chat, {
                text: `💀 @${m.sender.split('@')[0]} ha raggiunto il limite di ${maxWarn} warn. MatteBot lo ha cancellato dalla realtà.`,
                mentions: [m.sender]
            });
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            return true;
        }

        user.warn += 1;

        // Elimina il messaggio incriminato
        await conn.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: m.key.id,
                participant: m.key.participant || m.sender
            }
        });

        // Avviso e punizione
        await conn.sendMessage(m.chat, {
            text: `⚠️ *LINK CANALE RILEVATO!*\n@${m.sender.split('@')[0]} ha osato condividere una porcata.\n🔥 Warn attuale: *${user.warn}/${maxWarn}*`,
            mentions: [m.sender]
        });

        user.muto = true;

        if (user.warn >= maxWarn) {
            user.warn = 0;
            await conn.sendMessage(m.chat, {
                text: `☠️ @${m.sender.split('@')[0]} ha raggiunto il numero massimo di warn. MatteBot ha eseguito la sentenza.`,
                mentions: [m.sender]
            });
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
        }

        // Pulizia live se continua a scrivere
        conn.on('chat-update', async (chatUpdate) => {
            if (chatUpdate.messages && chatUpdate.count) {
                const message = chatUpdate.messages.all()[0];
                if (message && message.sender === m.sender) {
                    await conn.sendMessage(m.chat, {
                        delete: {
                            remoteJid: m.chat,
                            fromMe: false,
                            id: message.key.id,
                            participant: m.sender
                        }
                    });
                }
            }
        });
    }

    return true;
}