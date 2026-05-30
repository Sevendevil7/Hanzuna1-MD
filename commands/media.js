// © Ⲙʀ Ꮋᴀɴᴢᴜ | 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 | Protected
// Build: 1780048171222 | Hash: f836b7e0dbc2dd90
// Reproduction interdite sans autorisation écrite
const _ꜰjps9=()=>{};const _ᴅ3ayx=void 0;/* 96a99eb555d6a0e0 */
// 7e24f488




import { applyFancy }                 from '../core/fancy.js';
import { sendHuman }                  from '../lib/utils.js';
import { sendButtons, FOOTER }        from '../lib/buttons.js';
import { downloadContentFromMessage } from Buffer.from('40776869736b6579736f636b6574732f6261696c657973','hex').toString();
import axios from 'axios';
import fs    from 'fs';

const TMP = './tmp';
if (!fs.existsSync(TMP)) fs.mkdirSync(TMP, { recursive: true });

// ba5d0b
async function dlMedia(m, type) {
  const msgData =
    m.message?.[`${type}Message`] ||
    m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[`${type}Message`];
  if (!msgData) throw new Error(Buffer.from('4d6564696120696e74726f757661626c65','hex').toString());
  const stream = await downloadContentFromMessage(msgData, type);
  let buf = Buffer.from([]);
  for await (const chunk of stream) buf = Buffer.concat([buf, chunk]);
  return buf;
}

// ba5d0b
async function makeSticker(buf, sock, jid, opts = {}) {
  return sock.sendMessage(jid, {
    sticker: buf,
    ...(opts.quoted ? {} : {}),
    // Métadonnées du sticker (pack name = Hanzuna MD, author = Hanzu)
    stickerMetadata: {
      pack : '🦊 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗',
      auth : 'Ⲙʀ Ꮋᴀɴᴢᴜ',
    }
  }, opts.quoted ? { quoted: opts.quoted } : {});
}

export default function registerMedia(bot) {

  // .sticker — image/vidéo → sticker avec nom Hanzuna ─────────
  bot.cmd([Buffer.from('737469636b6572','hex').toString(),'s',Buffer.from('737469636b','hex').toString()], async (sock, m, ctx) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const isImg  = ctx.msgType===Buffer.from('696d6167654d657373616765','hex').toString() || !!quoted?.imageMessage;
    const isVid  = ctx.msgType===Buffer.from('766964656f4d657373616765','hex').toString() || !!quoted?.videoMessage;

    if (!isImg && !isVid)
      return sendButtons(sock, ctx.jid, {
        text: applyFancy(
          `🎨 *sᴛɪᴄᴋᴇʀ*\n\n` +
          `Envoie ou cite une image/vidéo avec .sticker\n\n` +
          `_Le sticker aura le nom 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗~_`
        ),
        footer: applyFancy(FOOTER), buttons: [{ id:Buffer.from('2e6d656e75','hex').toString(), text:'📋 Menu' }]
      }, m);

    await sendHuman(sock, ctx.jid, { text: applyFancy('🎨 ᴄʀéᴀᴛɪᴏɴ ᴅᴜ sᴛɪᴄᴋᴇʀ...') }, { quoted: m });

    try {
      const buf = await dlMedia(m, isImg ? Buffer.from('696d616765','hex').toString() : Buffer.from('766964656f','hex').toString());
      await makeSticker(buf, sock, ctx.jid, { quoted: m });
    } catch {
      await sendHuman(sock, ctx.jid, { text: applyFancy('❌ Impossible de créer le sticker.') }, { quoted: m });
    }
  });

  // .toimg — sticker → image ────────────────────────────────────
  bot.cmd([Buffer.from('746f696d67','hex').toString(),'sti'], async (sock, m, ctx) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted?.stickerMessage && ctx.msgType!==Buffer.from('737469636b65724d657373616765','hex').toString())
      return sendHuman(sock, ctx.jid, { text: applyFancy('📎 ᴄɪᴛᴇ ᴜɴ sᴛɪᴄᴋᴇʀ ᴀᴠᴇᴄ ʟᴀ ᴄᴏᴍᴍᴀɴᴅᴇ.') }, { quoted: m });
    await sendHuman(sock, ctx.jid, { text: applyFancy('🔄 ᴄᴏɴᴠᴇʀsɪᴏɴ...') }, { quoted: m });
    try {
      const buf = await dlMedia(m, Buffer.from('737469636b6572','hex').toString());
      await sock.sendMessage(ctx.jid, { image: buf }, { quoted: m });
    } catch {
      await sendHuman(sock, ctx.jid, { text: applyFancy('❌ Conversion échouée.') }, { quoted: m });
    }
  });

  // .vv — message view once ─────────────────────────────────────
  bot.cmd(['vv',Buffer.from('766965776f6e6365','hex').toString(),'vo'], async (sock, m, ctx) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted)
      return sendButtons(sock, ctx.jid, {
        text: applyFancy('👁️ *ᴠɪᴇᴡ ᴏɴᴄᴇ*\n\nCite un message éphémère avec .vv'),
        footer: applyFancy(FOOTER), buttons: [{ id:'.menuBuffer.from('2c20746578743a','hex').toString()📋 Menu' }]
      }, m);

    const voImg = quoted?.viewOnceMessage?.message?.imageMessage || quoted?.viewOnceMessageV2?.message?.imageMessage;
    const voVid = quoted?.viewOnceMessage?.message?.videoMessage || quoted?.viewOnceMessageV2?.message?.videoMessage;
    const voAud = quoted?.viewOnceMessage?.message?.audioMessage || quoted?.viewOnceMessageV2?.message?.audioMessage;

    if (!voImg && !voVid && !voAud)
      return sendHuman(sock, ctx.jid, {
        text: applyFancy('❌ Aucun message éphémère détecté. Cite un view once avec .vv')
      }, { quoted: m });

    await sendHuman(sock, ctx.jid, { text: applyFancy('👁️ ᴏᴜᴠᴇʀᴛᴜʀᴇ...') }, { quoted: m });

    try {
      let type = voImg ? Buffer.from('696d616765','hex').toString() : voVid ? Buffer.from('766964656f','hex').toString() : Buffer.from('617564696f','hex').toString();
      let content = voImg || voVid || voAud;
      const stream = await downloadContentFromMessage(content, type);
      let buf = Buffer.from([]);
      for await (const chunk of stream) buf = Buffer.concat([buf, chunk]);

      if (type === Buffer.from('696d616765','hex').toString())
        await sock.sendMessage(ctx.jid, { image: buf, caption: applyFancy('👁️ ᴠɪᴇᴡ ᴏɴᴄᴇ — ᴅéᴠᴇʀʀᴏᴜɪʟʟé ᴘᴀʀ 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗') }, { quoted: m });
      else if (type === Buffer.from('766964656f','hex').toString())
        await sock.sendMessage(ctx.jid, { video: buf, caption: applyFancy('👁️ ᴠɪᴇᴡ ᴏɴᴄᴇ — ᴅéᴠᴇʀʀᴏᴜɪʟʟé ᴘᴀʀ 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗') }, { quoted: m });
      else
        await sock.sendMessage(ctx.jid, { audio: buf, mimetype:Buffer.from('617564696f2f6d7034','hex').toString(), ptt:true }, { quoted: m });
    } catch {
      await sendHuman(sock, ctx.jid, { text: applyFancy('❌ Impossible d\'ouvrir ce message éphémère.') }, { quoted: m });
    }
  });

  // .tovoice — audio → PTT ──────────────────────────────────────
  bot.cmd([Buffer.from('746f766f696365','hex').toString(),Buffer.from('746f707474','hex').toString(),Buffer.from('766f696365','hex').toString()], async (sock, m, ctx) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const hasAudio = ctx.msgType===Buffer.from('617564696f4d657373616765','hex').toString() || !!quoted?.audioMessage;
    if (!hasAudio)
      return sendButtons(sock, ctx.jid, {
        text: applyFancy('🎤 *ᴛᴏᴠᴏɪᴄᴇ*\n\nCite un audio avec .tovoice'),
        footer: applyFancy(FOOTER), buttons: [{ id:'.menuBuffer.from('2c20746578743a','hex').toString()📋 Menu' }]
      }, m);
    await sendHuman(sock, ctx.jid, { text: applyFancy('🎤 ᴄᴏɴᴠᴇʀsɪᴏɴ...') }, { quoted: m });
    try {
      const buf = await dlMedia(m, Buffer.from('617564696f','hex').toString());
      await sock.sendMessage(ctx.jid, { audio: buf, mimetype:Buffer.from('617564696f2f6d7034','hex').toString(), ptt:true }, { quoted: m });
    } catch {
      await sendHuman(sock, ctx.jid, { text: applyFancy('❌ Conversion échouée.') }, { quoted: m });
    }
  });

  // .tg — sticker Telegram → WhatsApp ──────────────────────────
  // Usage : .tg <lien sticker Telegram ou ID pack>
  bot.cmd(['tg',Buffer.from('74656c656772616d','hex').toString(),Buffer.from('7467737469636b6572','hex').toString()], async (sock, m, ctx) => {
    const input = ctx.args[0];
    if (!input)
      return sendButtons(sock, ctx.jid, {
        text: applyFancy(
          `📱 *ᴛᴇʟᴇɢʀᴀᴍ → ᴡʜᴀᴛsᴀᴘᴘ*\n\n` +
          `Envoie le lien d\'un sticker Telegram :\n` +
          `Usage : .tg <https://t.me/addstickers/NomDuPack>\n\n` +
          `_Hanzuna récupère le premier sticker du pack~_`
        ),
        footer: applyFancy(FOOTER), buttons: [{ id:Buffer.from('2e6d656e75','hex').toString(), text:'📋 Menu' }]
      }, m);

    await sendHuman(sock, ctx.jid, { text: applyFancy('📱 ʀéᴄᴜᴘéʀᴀᴛɪᴏɴ ᴅᴜ sᴛɪᴄᴋᴇʀ ᴛᴇʟᴇɢʀᴀᴍ...') }, { quoted: m });

    try {
      // Extraire le nom du pack depuis le lien
      const packName = input.replace(/.*addstickers\//,'').replace(/\?.*/,'').trim();
      if (!packName) throw new Error('Lien invalide');

      // API Telegram pour récupérer le sticker set
      // Note : Nécessite un token bot Telegram dans .env pour fonctionnement complet
      // Ici on utilise le proxy webp direct
      const tgApi = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN||''}`;

      if (!process.env.TELEGRAM_TOKEN) {
        // Fallback : essayer de charger directement via cdn
        const cdnUrl = `https://t.me/addstickers/${packName}`;
        return sendHuman(sock, ctx.jid, {
          text: applyFancy(
            `📱 *Pack Telegram détecté*\n\n` +
            `📦 Pack : *${packName}*\n\n` +
            `⚙️ Pour activer cette commande complètement,\najoute \`TELEGRAM_TOKEN=ton_token\` dans tes variables.\n\n` +
            `Obtiens un token sur @BotFather sur Telegram.`
          )
        }, { quoted: m });
      }

      const res  = await axios.get(`${tgApi}/getStickerSet?name=${packName}`, { timeout:10000 });
      const set  = res.data?.result;
      if (!set) throw new Error(Buffer.from('5061636b20696e74726f757661626c65','hex').toString());

      // Prendre le premier sticker
      const fileId = set.stickers[0]?.file_id;
      if (!fileId) throw new Error(Buffer.from('537469636b65722076696465','hex').toString());

      const fileRes  = await axios.get(`${tgApi}/getFile?file_id=${fileId}`, { timeout:10000 });
      const filePath = fileRes.data?.result?.file_path;
      if (!filePath) throw new Error(Buffer.from('4368656d696e20696e74726f757661626c65','hex').toString());

      const stickerRes = await axios.get(
        `https://api.telegram.org/file/bot${process.env.TELEGRAM_TOKEN}/${filePath}`,
        { responseType:Buffer.from('6172726179627566666572','hex').toString(), timeout:15000 }
      );

      const buf = Buffer.from(stickerRes.data);
      await makeSticker(buf, sock, ctx.jid, { quoted: m });
      await sendHuman(sock, ctx.jid, {
        text: applyFancy(`✅ Sticker du pack *${packName}* converti !`)
      }, { quoted: m });

    } catch (e) {
      await sendHuman(sock, ctx.jid, {
        text: applyFancy(`❌ Impossible de récupérer le sticker.\n${e.message}`)
      }, { quoted: m });
    }
  });

  // .ytmp3 ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('79746d7033','hex').toString(),Buffer.from('796d7033','hex').toString(),Buffer.from('7974617564696f','hex').toString()], async (sock, m, ctx) => {
    const url = ctx.args[0];
    if (!url || !url.includes(Buffer.from('796f757475','hex').toString()))
      return sendButtons(sock, ctx.jid, {
        text: applyFancy('🎵 *ʏᴏᴜᴛᴜʙᴇ ᴀᴜᴅɪᴏ*\n\nUsage : .ytmp3 <lien YouTube>'),
        footer: applyFancy(FOOTER), buttons: [{ id:'.menuBuffer.from('2c20746578743a','hex').toString()📋 Menu' }]
      }, m);
    await sendHuman(sock, ctx.jid, { text: applyFancy('🎵 ᴛéʟéᴄʜᴀʀɢᴇᴍᴇɴᴛ...') }, { quoted: m });
    try {
      const r1 = await axios.get(`https://api.vevioz.com/api/button/mp3/${encodeURIComponent(url)}`, { timeout:30000 });
      const dl = r1.data?.link || r1.request?.res?.responseUrl;
      if (!dl) throw new Error(Buffer.from('4c69656e20696e74726f757661626c65','hex').toString());
      const r2 = await axios.get(dl, { responseType:Buffer.from('6172726179627566666572','hex').toString(), timeout:90000 });
      await sock.sendMessage(ctx.jid, { audio:Buffer.from(r2.data), mimetype:Buffer.from('617564696f2f6d7034','hex').toString(), ptt:false }, { quoted: m });
    } catch {
      await sendHuman(sock, ctx.jid, { text: applyFancy('❌ Téléchargement échoué.') }, { quoted: m });
    }
  });

  // .ytmp4 ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('79746d7034','hex').toString(),Buffer.from('7974766964','hex').toString()], async (sock, m, ctx) => {
    const url = ctx.args[0];
    if (!url || !url.includes(Buffer.from('796f757475','hex').toString()))
      return sendButtons(sock, ctx.jid, {
        text: applyFancy('🎬 *ʏᴏᴜᴛᴜʙᴇ ᴠɪᴅéᴏ*\n\nUsage : .ytmp4 <lien YouTube>'),
        footer: applyFancy(FOOTER), buttons: [{ id:'.menuBuffer.from('2c20746578743a','hex').toString()📋 Menu' }]
      }, m);
    await sendHuman(sock, ctx.jid, { text: applyFancy('🎬 ᴛéʟéᴄʜᴀʀɢᴇᴍᴇɴᴛ...') }, { quoted: m });
    try {
      const r1 = await axios.get(`https://api.vevioz.com/api/button/mp4/360/${encodeURIComponent(url)}`, { timeout:30000 });
      const dl = r1.data?.link || r1.request?.res?.responseUrl;
      if (!dl) throw new Error(Buffer.from('4c69656e20696e74726f757661626c65','hex').toString());
      const r2 = await axios.get(dl, { responseType:Buffer.from('6172726179627566666572','hex').toString(), timeout:180000 });
      await sock.sendMessage(ctx.jid, { video:Buffer.from(r2.data), mimetype:Buffer.from('766964656f2f6d7034','hex').toString() }, { quoted: m });
    } catch {
      await sendHuman(sock, ctx.jid, { text: applyFancy('❌ Téléchargement échoué.') }, { quoted: m });
    }
  });

  // .tts ────────────────────────────────────────────────────────
  bot.cmd(['tts',Buffer.from('7061726c65','hex').toString()], async (sock, m, ctx) => {
    const texte = ctx.args.join(' ');
    if (!texte)
      return sendButtons(sock, ctx.jid, {
        text: applyFancy('🔊 *ᴛᴇxᴛ ᴛᴏ sᴘᴇᴇᴄʜ*\n\nUsage : .tts <texte>'),
        footer: applyFancy(FOOTER), buttons: [{ id:'.menuBuffer.from('2c20746578743a','hex').toString()📋 Menu' }]
      }, m);
    await sendHuman(sock, ctx.jid, { text: applyFancy('🔊 ɢéɴéʀᴀᴛɪᴏɴ...') }, { quoted: m });
    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(texte)}&tl=fr&client=tw-ob`;
      const res = await axios.get(url, { responseType:Buffer.from('6172726179627566666572','hex').toString(), headers:{Buffer.from('557365722d4167656e74','hex').toString():Buffer.from('4d6f7a696c6c612f352e30','hex').toString()}, timeout:15000 });
      await sock.sendMessage(ctx.jid, { audio:Buffer.from(res.data), mimetype:Buffer.from('617564696f2f6d706567','hex').toString(), ptt:true }, { quoted: m });
    } catch {
      await sendHuman(sock, ctx.jid, { text: applyFancy('❌ TTS indisponible.') }, { quoted: m });
    }
  });

  // .gif ────────────────────────────────────────────────────────
  bot.cmd(['gif'], async (sock, m, ctx) => {
    const query = ctx.args.join(' Buffer.from('29207c7c20','hex').toString()fox';
    await sendHuman(sock, ctx.jid, { text: applyFancy(`🔍 ɢɪғ "${query}"...`) }, { quoted: m });
    try {
      const res = await axios.get(Buffer.from('68747470733a2f2f6170692e67697068792e636f6d2f76312f676966732f72616e646f6d','hex').toString(), {
        params:{ api_key:Buffer.from('6463367a61544f78464a6d7a43','hex').toString(), tag:query, rating:'pg' }, timeout:10000
      });
      const gifUrl = res.data?.data?.images?.original?.url;
      if (!gifUrl) throw new Error(Buffer.from('496e74726f757661626c65','hex').toString());
      const gif = await axios.get(gifUrl, { responseType:Buffer.from('6172726179627566666572','hex').toString(), timeout:30000 });
      await sock.sendMessage(ctx.jid, { video:Buffer.from(gif.data), mimetype:Buffer.from('766964656f2f6d7034','hex').toString(), gifPlayback:true }, { quoted: m });
    } catch {
      await sendHuman(sock, ctx.jid, { text: applyFancy(`❌ GIF introuvable.`) }, { quoted: m });
    }
  });
}
