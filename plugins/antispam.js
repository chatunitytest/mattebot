let userSpamCounters = {}; 
const STICKER_LIMIT = 6;
const PHOTO_VIDEO_LIMIT = 10;
const RESET_TIMEOUT = 5000;

export async function before(m, { isAdmin, isBotAdmin, conn }) {
    if (m.isBaileys && m.fromMe) return true;
    if (!m.isGroup) return false;

    let chat = global.db.data.chats[m.chat] || {};
    let bot = global.db.data.settings[this.user.jid] || {};
    const sender = m.sender;
    const delet = m.key.participant;
    const bang = m.key.id;

    if (!userSpamCounters[m.chat]) userSpamCounters[m.chat] = {};
    if (!userSpamCounters[m.chat][sender]) {
        userSpamCounters[m.chat][sender] = {
            stickerCount: 0,
            photoVideoCount: 0,
            tagCount: 0,
            messageIds: [],
            lastMessageTime: 0,
            timer: null
        };
    }

    const counter = userSpamCounters[m.chat][sender];
    const currentTime = Date.now();

    const isSticker = m.message?.stickerMessage;
    const isPhoto = m.message?.imageMessage || m.message?.videoMessage;
    const isTaggingAll = m.message?.extendedTextMessage?.text?.includes('@all') || m.message?.extendedTextMessage?.text?.includes('@everyone');

    if (isSticker || isPhoto || isTaggingAll) {
        if (isSticker) counter.stickerCount++;
        if (isPhoto) counter.photoVideoCount++;
        if (isTaggingAll) counter.tagCount++;

        counter.messageIds.push(m.key.id);
        counter.lastMessageTime = currentTime;

        if (counter.timer) clearTimeout(counter.timer);

        const isStickerSpam = counter.stickerCount >= STICKER_LIMIT;
        const isPhotoVideoSpam = counter.photoVideoCount >= PHOTO_VIDEO_LIMIT;
        const isTagSpam = counter.tagCount > 0;

        if (isStickerSpam || isPhotoVideoSpam || isTagSpam) {
            if (isBotAdmin && bot.restrict) {
                try {
                    console.log('💀 Spam rilevato. MatteBot attiva la modalità esecuzione.');

                    await conn.groupSettingUpdate(m.chat, 'announcement');
                    console.log('🔒 Gruppo sigillato temporaneamente.');

                    if (!isAdmin) {
                        let response = await conn.groupParticipantsUpdate(m.chat, [sender], 'remove');
                        console.log(`💣 Rimozione utente: ${JSON.stringify(response)}`);
                        if (response[0].status === "404") {
                            console.log('👻 Utente non trovato o già espulso.');
                        }
                    } else {
                        console.log('👑 Admin immune al giudizio.');
                    }

                    for (const msgId of counter.messageIds) {
                        await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: msgId, participant: delet } });
                        console.log(`🧹 Messaggio ${msgId} rimosso.`);
                    }

                    console.log('🗑️ Pulizia completata.');
                    await conn.groupSettingUpdate(m.chat, 'not_announcement');
                    console.log('🔓 Gruppo riaperto ai comuni mortali.');

                    await conn.sendMessage(m.chat, { text: '☠️ *MatteBot ha giustiziato un trasgressore dello spam.*' });

                    delete userSpamCounters[m.chat][sender];
                    console.log('📛 Contatore di spam eliminato.');

                } catch (e) {
                    console.error('🚫 Errore durante la procedura di purga:', e);
                }
            } else {
                console.log('⚠️ MatteBot è senza poteri o la restrizione è off. Niente punizione eseguita.');
            }
        } else {
            counter.timer = setTimeout(() => {
                delete userSpamCounters[m.chat][sender];
                console.log('⏲️ Timeout raggiunto. Contatore annientato.');
            }, RESET_TIMEOUT);
        }
    } else {
        if (currentTime - counter.lastMessageTime > RESET_TIMEOUT &&
            (counter.stickerCount > 0 || counter.photoVideoCount > 0 || counter.tagCount > 0)) {
            delete userSpamCounters[m.chat][sender];
            console.log('🧼 Inattività rilevata. Contatore eliminato.');
        }
    }

    return true;
}