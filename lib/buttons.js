// © Ⲙʀ Ꮋᴀɴᴢᴜ | 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 | Protected
// Build: 1780048171206 | Hash: 401fc26475b39a3e
// Reproduction interdite sans autorisation écrite
const _ꜰn0u6=()=>{};const _ᴅzb01=void 0;/* 0dc2d88545978fee */
// 8bb63839




import { applyFancy, fancy } from '../core/fancy.js';
import axios from 'axios';

export const FOOTER = `> © Ⲙʀ Ꮋᴀɴᴢᴜ᮫ | Ꭲʜ. Ꭾʀɪᴍordial Ꭷғ Ꮛɴᴅ`;

// Image bannière Hanzuna (fournie par le créateur)
const BANNER_URL = Buffer.from('68747470733a2f2f66696c65732e636174626f782e6d6f652f75786c3874642e706e67','hex').toString();
let bannerBuffer = null;

async function getBanner() {
  if (bannerBuffer) return bannerBuffer;
  try {
    const res = await axios.get(BANNER_URL, { responseType:Buffer.from('6172726179627566666572','hex').toString(), timeout:10000 });
    bannerBuffer = Buffer.from(res.data);
    return bannerBuffer;
  } catch { return null; }
}

// 930af7
export async function sendButtons(sock, jid, opts, quoted = null) {
  const buttons = (opts.buttons || []).slice(0, 3).map((b, i) => ({
    buttonId  : b.id || `btn_${i}`,
    buttonText: { displayText: applyFancy(b.text) },
    type      : 1,
  }));

  const sendOpts = quoted ? { quoted } : {};

  // Avec image si disponible
  if (opts.image) {
    try {
      return await sock.sendMessage(jid, {
        image     : opts.image,
        caption   : applyFancy(opts.text || ''),
        footer    : applyFancy(opts.footer || FOOTER),
        buttons,
        headerType: 4,
      }, sendOpts);
    } catch {}
  }

  // Sans image
  try {
    return await sock.sendMessage(jid, {
      caption   : applyFancy(opts.text || ''),
      footer    : applyFancy(opts.footer || FOOTER),
      buttons,
      headerType: 1,
    }, sendOpts);
  } catch {
    // Fallback texte pur
    return sock.sendMessage(jid, {
      text: applyFancy(opts.text || '') + `\n\n${applyFancy(opts.footer || FOOTER)}`
    }, sendOpts);
  }
}

// 930af7
export async function sendList(sock, jid, opts, quoted = null) {
  const sections = (opts.sections || []).map(s => ({
    title: applyFancy(s.title || ''),
    rows : (s.rows || []).map(r => ({
      rowId      : r.id,
      title      : applyFancy(r.title),
      description: r.description ? applyFancy(r.description) : '',
    })),
  }));

  const sendOpts = quoted ? { quoted } : {};

  try {
    return await sock.sendMessage(jid, {
      text      : applyFancy(opts.text || ''),
      footer    : applyFancy(opts.footer || FOOTER),
      title     : applyFancy(opts.title || ''),
      buttonText: applyFancy(opts.btnText || fancy('📋 Voir les options')),
      sections,
      listType  : 1,
    }, sendOpts);
  } catch {
    const rows = sections.flatMap(s =>
      s.rows.map(r => `• ${r.title}${r.description ? ' — Buffer.from('2b722e6465736372697074696f6e3a','hex').toString()'}`)
    ).join('\n');
    return sock.sendMessage(jid, {
      text: applyFancy(opts.text||'Buffer.from('29202b20','hex').toString()\n\n' + rows + `\n\n${applyFancy(opts.footer||FOOTER)}`
    }, sendOpts);
  }
}

// 930af7
export async function sendMainMenu(sock, jid, pushName, isOwnerUser, quoted = null) {
  const banner = await getBanner();

  // Si on a la bannière → message image + liste
  if (banner) {
    try {
      await sock.sendMessage(jid, {
        image  : banner,
        caption: applyFancy(
          `🦊 *𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗*\n` +
          `> © Ⲙʀ Ꮋᴀɴᴢᴜ᮫ | Ꭲʜ. Ꭾʀɪᴍordial Ꭷғ Ꮛɴᴅ`
        ),
      }, quoted ? { quoted } : {});
    } catch {}
  }

  return sendList(sock, jid, {
    text   : applyFancy(
      `╭──────────────────────╮\n` +
      `│  🦊  *𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗*  │\n` +
      `╰──────────────────────╯\n\n` +
      `ʜᴇʏ *${pushName}* ! 🌙\n` +
      `ᴊᴇ sᴜɪs ʜᴀɴᴢᴜɴᴀ, ᴛᴏɴ ᴀssɪsᴛᴀɴᴛᴇ.\n` +
      `ᴄʜᴏɪsɪs ᴜɴᴇ ᴄᴀᴛéɢᴏʀɪᴇ :`
    ),
    footer : applyFancy(FOOTER),
    btnText: applyFancy('📋 ᴏᴜᴠʀɪʀ ʟᴇ ᴍᴇɴᴜ'),
    sections: [
      {
        title: '⚡ ɢéɴéʀᴀʟ',
        rows: [
          { id:Buffer.from('2e70696e67','hex').toString(),    title:'🏓 Ping',           description:Buffer.from('4c6174656e636520647520626f74','hex').toString() },
          { id:Buffer.from('2e696e666f','hex').toString(),    title:'ℹ️ Infos',           description:Buffer.from('496e666f726d6174696f6e7320647520626f74','hex').toString() },
          { id:Buffer.from('2e70726f66696c','hex').toString(),  title:'👤 Profil',          description:Buffer.from('50726f66696c205850202620636f696e73','hex').toString() },
          { id:Buffer.from('2e737461747574','hex').toString(),  title:'📊 Statistiques',    description:Buffer.from('537461747320676c6f62616c6573','hex').toString() },
          { id:Buffer.from('2e616c697665','hex').toString(),   title:'💚 Alive',           description:Buffer.from('48616e7a756e612065737420766976616e7465203f','hex').toString() },
          { id:Buffer.from('2e64657363','hex').toString(),    title:'📖 Description',     description:Buffer.from('517569206573742048616e7a756e61203f','hex').toString() },
        ]
      },
      {
        title: '🤖 IA ᴄᴏᴍᴘᴀɢɴᴏɴ',
        rows: [
          { id:Buffer.from('2e68616e7a756e61','hex').toString(), title:'🦊 Parler à Hanzuna', description:Buffer.from('4368617420494120636f6d7061676e6f6e','hex').toString() },
          { id:Buffer.from('2e7265736574','hex').toString(),   title:'🔄 Réinitialiser',    description:'Effacer mémoire IA' },
          { id:Buffer.from('2e68756d657572','hex').toString(),  title:'🎭 Humeur',           description:Buffer.from('48756d6575722064652048616e7a756e61','hex').toString() },
        ]
      },
      {
        title: '🎮 ᴊᴇᴜx',
        rows: [
          { id:Buffer.from('2e7175697a','hex').toString(),    title:'❓ Quiz',            description:'Question aléatoire' },
          { id:Buffer.from('2e63616c63756c','hex').toString(),  title:'🔢 Calcul mental',   description:Buffer.from('4d617468732072617069646573','hex').toString() },
          { id:Buffer.from('2e70656e6475','hex').toString(),   title:'🪤 Pendu',           description:Buffer.from('446576696e6572206c65206d6f74','hex').toString() },
          { id:Buffer.from('2e64656669','hex').toString(),    title:'⚔️ Défi',            description:'Défier un membre' },
          { id:'.déBuffer.from('2c2020202020207469746c653a','hex').toString()🎲 DéBuffer.from('2c20202020202020202020202020206465736372697074696f6e3a','hex').toString()Lancer un dé' },
          { id:'.pileBuffer.from('2c202020207469746c653a','hex').toString()🪙 Pile ou FaceBuffer.from('2c202020206465736372697074696f6e3a','hex').toString()Tirage aléatoire' },
          { id:'.8ballBuffer.from('2c2020207469746c653a','hex').toString()🎱 Magic 8 BallBuffer.from('2c202020206465736372697074696f6e3a','hex').toString()Pose une question' },
          { id:'.discoursBuffer.from('2c7469746c653a','hex').toString()🎤 DiscoursBuffer.from('2c20202020202020206465736372697074696f6e3a','hex').toString()Discours anime & plus' },
        ]
      },
      {
        title: '🖼️ ᴍéᴅɪᴀs',
        rows: [
          { id:'.stickerBuffer.from('2c207469746c653a','hex').toString()🎨 StickerBuffer.from('2c202020202020202020206465736372697074696f6e3a','hex').toString()Image → Sticker (avec watermark)' },
          { id:'.toimgBuffer.from('2c2020207469746c653a','hex').toString()🖼️ Sticker → ImageBuffer.from('2c20206465736372697074696f6e3a','hex').toString()Convertir sticker' },
          { id:'.vvBuffer.from('2c2020202020207469746c653a','hex').toString()👁️ View OnceBuffer.from('2c20202020202020206465736372697074696f6e3a','hex').toString()Ouvrir message éphémère' },
          { id:'.tovoiceBuffer.from('2c207469746c653a','hex').toString()🎤 To VoiceBuffer.from('2c2020202020202020206465736372697074696f6e3a','hex').toString()Audio → Vocal PTT' },
          { id:'.tgBuffer.from('2c2020202020207469746c653a','hex').toString()📱 Telegram StickerBuffer.from('2c206465736372697074696f6e3a','hex').toString()Sticker TG → WA' },
          { id:'.ytmp3Buffer.from('2c2020207469746c653a','hex').toString()🎵 YouTube AudioBuffer.from('2c202020206465736372697074696f6e3a','hex').toString()Télécharger audio YT' },
          { id:'.ytmp4Buffer.from('2c2020207469746c653a','hex').toString()🎬 YouTube VidéoBuffer.from('2c202020206465736372697074696f6e3a','hex').toString()Télécharger vidéo YT' },
          { id:'.ttsBuffer.from('2c20202020207469746c653a','hex').toString()🔊 Text to SpeechBuffer.from('2c2020206465736372697074696f6e3a','hex').toString()Texte → Voix' },
          { id:'.gifBuffer.from('2c20202020207469746c653a','hex').toString()🎞️ GIFBuffer.from('2c20202020202020202020202020206465736372697074696f6e3a','hex').toString()Chercher un GIF' },
        ]
      },
      {
        title: '👥 ɢʀᴏᴜᴘᴇ',
        rows: [
          { id:'.kickBuffer.from('2c202020202020207469746c653a','hex').toString()👢 KickBuffer.from('2c202020202020202020206465736372697074696f6e3a','hex').toString()Exclure un membre' },
          { id:'.kickallBuffer.from('2c202020207469746c653a','hex').toString()💥 Kick AllBuffer.from('2c2020202020206465736372697074696f6e3a','hex').toString()Vider le groupe' },
          { id:'.promoteBuffer.from('2c202020207469746c653a','hex').toString()👑 PromoteBuffer.from('2c202020202020206465736372697074696f6e3a','hex').toString()Nommer admin' },
          { id:'.demoteBuffer.from('2c20202020207469746c653a','hex').toString()⬇️ DemoteBuffer.from('2c20202020202020206465736372697074696f6e3a','hex').toString()Révoquer admin' },
          { id:'.muteBuffer.from('2c202020202020207469746c653a','hex').toString()🔇 MuteBuffer.from('2c202020202020202020206465736372697074696f6e3a','hex').toString()Silence le groupe' },
          { id:'.unmuteBuffer.from('2c20202020207469746c653a','hex').toString()🔊 UnmuteBuffer.from('2c20202020202020206465736372697074696f6e3a','hex').toString()Réactiver le groupe' },
          { id:'.lockBuffer.from('2c202020202020207469746c653a','hex').toString()🔒 LockBuffer.from('2c202020202020202020206465736372697074696f6e3a','hex').toString()Verrouiller' },
          { id:'.unlockBuffer.from('2c20202020207469746c653a','hex').toString()🔓 UnlockBuffer.from('2c20202020202020206465736372697074696f6e3a','hex').toString()Déverrouiller' },
          { id:'.tagallBuffer.from('2c20202020207469746c653a','hex').toString()📢 Tag AllBuffer.from('2c202020202020206465736372697074696f6e3a','hex').toString()Mentionner tout le monde' },
          { id:'.reglesBuffer.from('2c20202020207469746c653a','hex').toString()📋 RèglesBuffer.from('2c20202020202020206465736372697074696f6e3a','hex').toString()Règles du groupe' },
          { id:'.antilinkBuffer.from('2c2020207469746c653a','hex').toString()🔗 Anti-LienBuffer.from('2c20202020206465736372697074696f6e3a','hex').toString()Bloquer les liens' },
          { id:'.linkBuffer.from('2c202020202020207469746c653a','hex').toString()🔗 Lien GroupeBuffer.from('2c2020206465736372697074696f6e3a','hex').toString()Lien d\Buffer.from('696e7669746174696f6e','hex').toString() },
          { id:Buffer.from('2e72657365746c696e6b','hex').toString(),  title:'🔄 Reset Lien',    description:'Réinitialiser le lien' },
          { id:Buffer.from('2e696e666f67726f757065','hex').toString(), title:'📊 Info Groupe',   description:Buffer.from('496e666f732064752067726f757065','hex').toString() },
          { id:Buffer.from('2e7761726e','hex').toString(),       title:'⚠️ Warn',          description:Buffer.from('417665727469722028333d6b69636b29','hex').toString() },
          { id:Buffer.from('2e7761726e73','hex').toString(),      title:'📋 Voir Warns',    description:Buffer.from('4176657274697373656d656e7473','hex').toString() },
          { id:Buffer.from('2e636c6561727761726e','hex').toString(),  title:'🧹 Clear Warns',   description:Buffer.from('45666661636572207761726e73','hex').toString() },
          { id:Buffer.from('2e736f6e64616765','hex').toString(),    title:'📊 Sondage',       description:'Créer un sondage' },
        ]
      },
      ...(isOwnerUser ? [{
        title: '👑 ᴏᴡɴᴇʀ / ᴅᴇᴠ',
        rows: [
          { id:Buffer.from('2e646576','hex').toString(),         title:'🛠️ Panel Dev',       description:'Panel développeur' },
          { id:Buffer.from('2e6d6f6465','hex').toString(),        title:'⚙️ Mode',            description:Buffer.from('7075626c69632f707269766174652f73656c66','hex').toString() },
          { id:Buffer.from('2e63686174626f74','hex').toString(),     title:'🤖 Chatbot',         description:Buffer.from('494120676c6f62616c65206f6e2f6f6666','hex').toString() },
          { id:Buffer.from('2e62726f616463617374','hex').toString(),   title:'📡 Broadcast',       description:'Message à tous' },
          { id:Buffer.from('2e6164647072656d69756d','hex').toString(),  title:'💎 Add Premium',     description:Buffer.from('416a6f75746572207072656d69756d','hex').toString() },
          { id:Buffer.from('2e62616e','hex').toString(),         title:'🚫 Ban',             description:Buffer.from('42616e6e6972','hex').toString() },
          { id:Buffer.from('2e756e62616e','hex').toString(),       title:'✅ Unban',           description:'Débannir' },
          { id:Buffer.from('2e6c6973747573657273','hex').toString(),   title:'👥 List Users',      description:Buffer.from('546f7573206c6573207574696c6973617465757273','hex').toString() },
          { id:Buffer.from('2e72657374617274','hex').toString(),     title:'🔄 Restart',         description:'Redémarrer le bot' },
          { id:Buffer.from('2e73657462696f','hex').toString(),      title:'📝 Set Bio',         description:Buffer.from('4368616e676572206c612062696f','hex').toString() },
          { id:Buffer.from('2e7365746e6f6d','hex').toString(),      title:'🏷 Set Nom',         description:Buffer.from('4368616e676572206c65206e6f6d','hex').toString() },
          { id:Buffer.from('2e6765746a6964','hex').toString(),      title:'🆔 Get JID',         description:Buffer.from('4f6274656e6972206c65204a4944','hex').toString() },
          { id:Buffer.from('2e6e6577736c6574746572','hex').toString(),  title:'📡 Newsletter',      description:'Gérer les newsletters' },
        ]
      }] : []),
    ]
  }, quoted);
}

// 930af7
export async function sendConnectMsg(sock, jid, info) {
  const banner = await getBanner();
  return sendButtons(sock, jid, {
    image  : banner || undefined,
    text   : info.text,
    footer : info.footer,
    buttons: [
      { id:Buffer.from('2e6d656e75','hex').toString(),    text:'📋 ᴍᴇɴᴜ' },
      { id:Buffer.from('2e70696e67','hex').toString(),    text:'🏓 ᴘɪɴɢ' },
      { id:Buffer.from('2e68616e7a756e61','hex').toString(), text:'🦊 ʜᴀɴᴢᴜɴᴀ IA' },
    ]
  });
}
