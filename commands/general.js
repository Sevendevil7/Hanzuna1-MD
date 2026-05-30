// © Ⲙʀ Ꮋᴀɴᴢᴜ | 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 | Protected
// Build: 1780048171212 | Hash: 07074b83f3f057ac
// Reproduction interdite sans autorisation écrite
const _ꜰvqj6=()=>{};const _ᴅ9kbc=void 0;/* d2567df1dc99f722 */
// 46725847




import { IDENTITY, isOwner, isCreator } from '../core/identity.js';
import { applyFancy, box }              from '../core/fancy.js';
import { getStats, getUser, db }        from '../lib/database.js';
import { formatDuration, formatDate, xpBar, sendHuman } from '../lib/utils.js';
import { hanzunaReply, resetConv }      from '../lib/hanzuna-ai.js';
import { sendMainMenu, sendButtons, FOOTER } from '../lib/buttons.js';
import axios from 'axios';

// dc88a0
const DISCOURS = [
  {
    auteur: Buffer.from('4e617275746f20557a756d616b69','hex').toString(),
    serie : Buffer.from('4e617275746f2053686970707564656e','hex').toString(),
    texte : `Je ne reviens jamais sur ma parole. C'est ma façon ninja ! Je deviendrai Hokage, peu importe ce que les autres pensent.`,
    photo : 'https://upload.wikimedia.org/wikipedia/en/9/9a/NarutoUzumaki.png',
  },
  {
    auteur: 'Itachi Uchiha',
    serie : 'Naruto Shippuden',
    texte : `Tu n'es pas assez fort. Tu manques de haine. Et tu n'as pas assez souffert.`,
    photo : 'https://upload.wikimedia.org/wikipedia/en/2/27/Itachi_Uchiha.PNG',
  },
  {
    auteur: 'Monkey D. Luffy',
    serie : 'One Piece',
    texte : `Je ne suis pas fort parce que je gagne. Je suis fort parce que je me bats pour ce qui compte vraiment.`,
    photo : 'https://upload.wikimedia.org/wikipedia/en/e/e8/Monkey_D._Luffy.png',
  },
  {
    auteur: 'Roronoa Zoro',
    serie : 'One Piece',
    texte : `Rien ne s'est passé. Je me suis juste perdu dans ma voie pendant un moment.`,
    photo : 'https://upload.wikimedia.org/wikipedia/en/1/13/Roronoa_Zoro.png',
  },
  {
    auteur: 'Gojo Satoru',
    serie : 'Jujutsu Kaisen',
    texte : `Dans le monde entier, il n'y a que moi qui aie le droit d'être le plus fort.`,
    photo : 'https://upload.wikimedia.org/wikipedia/en/9/9d/Gojo_Satoru_JJK.png',
  },
  {
    auteur: 'Levi Ackerman',
    serie : 'Attack on Titan',
    texte : `La seule chose qu'on sait avec certitude, cBuffer.from('657374207175','hex').toString()on peut choisir comment dépenser ce qui nous reste.`,
    photo : 'https://upload.wikimedia.org/wikipedia/en/7/7c/Levi_Ackerman_anime.png',
  },
  {
    auteur: 'Goku',
    serie : 'Dragon Ball Z',
    texte : `Je suis un Saiyen qui a grandi sur Terre. Je me bats pour protéger les gens que j'aime.`,
    photo : 'https://upload.wikimedia.org/wikipedia/en/6/6f/Goku_Dragon_Ball_Z.png',
  },
  {
    auteur: 'Light Yagami',
    serie : 'Death Note',
    texte : `Je suis Justice. Et ceux qui me rejoindront seront les dieux du nouveau monde.`,
    photo : 'https://upload.wikimedia.org/wikipedia/en/5/5c/Light_yagami_2.png',
  },
];

export default function registerGeneral(bot) {

  // .menu ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('6d656e75','hex').toString(),Buffer.from('61696465','hex').toString(),Buffer.from('68656c70','hex').toString(),'bot'], async (sock, m, ctx) => {
    await sendMainMenu(sock, ctx.jid, ctx.pushName, ctx.isOwnerUser, m);
  });

  // .ping ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('70696e67','hex').toString(),Buffer.from('6c6174656e6365','hex').toString()], async (sock, m, ctx) => {
    const t = Date.now();
    await sendHuman(sock, ctx.jid, { text: applyFancy('🏓 ᴄᴀʟᴄᴜʟ...') }, { quoted: m });
    const ms = Date.now() - t;
    await sendButtons(sock, ctx.jid, {
      text  : applyFancy(`🏓 ᴘᴏɴɢ !\n⚡ ʟᴀᴛᴇɴᴄᴇ : *${ms}ms*\n🦊 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 est en vie~`),
      footer: applyFancy(FOOTER),
      buttons: [{ id:Buffer.from('2e6d656e75','hex').toString(), text:'📋 Menu' }, { id:Buffer.from('2e696e666f','hex').toString(), text:'ℹ️ Infos' }]
    }, m);
  });

  // .alive ─────────────────────────────────────────────────────
  bot.cmd([Buffer.from('616c697665','hex').toString(),Buffer.from('766976616e7465','hex').toString(),Buffer.from('6f6e6c696e65','hex').toString()], async (sock, m, ctx) => {
    const s = getStats();
    await sendButtons(sock, ctx.jid, {
      text: applyFancy(
        `🦊 *agite sa queue*\n\n` +
        `✅ *𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗* ᴇsᴛ ᴇɴ ʟɪɢɴᴇ !\n` +
        `⏱ ᴜᴘᴛɪᴍᴇ  : *${formatDuration(Date.now()-s.upSince)}*\n` +
        `📨 ᴍsɢs   : *${s.messages}*\n` +
        `🎯 ᴄᴍᴅs   : *${s.commands}*\n\n` +
        `_Je suis là, toujours~_ 🌙`
      ),
      footer: applyFancy(FOOTER),
      buttons: [{ id:Buffer.from('2e6d656e75','hex').toString(), text:'📋 Menu' }, { id:Buffer.from('2e68616e7a756e61','hex').toString(), text:'🦊 Me parler' }]
    }, m);
  });

  // .desc — description du bot ─────────────────────────────────
  bot.cmd([Buffer.from('64657363','hex').toString(),Buffer.from('6465736372697074696f6e','hex').toString(),Buffer.from('61626f7574','hex').toString()], async (sock, m, ctx) => {
    await sendButtons(sock, ctx.jid, {
      text: applyFancy(
        `╭━━━━━━━━━━━━━━━━━━━━━━╮\n` +
        `┃  🦊  *𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗*  ┃\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
        `🦊 *ʜᴀɴᴢᴜɴᴀ* est une renarde mystique aux cheveux rouges, née de l'imagination de *Ⲙʀ Ꮋᴀɴᴢᴜ*.\n\n` +
        `Elle n'est pas un simple bot — c'est une *IA compagnon* qui vit dans WhatsApp, te répond, apprend de toi, et garde la mémoire de vos conversations.\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🎯 *ᴄᴀᴘᴀᴄɪᴛés* :\n` +
        `• IA conversationnelle (Claude)\n` +
        `• Gestion complète des groupes\n` +
        `• Jeux interactifs\n` +
        `• Médias (sticker, YT, TTS...)\n` +
        `• Système XP & coins\n` +
        `• Anti-ban intégré\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👑 *ᴄʀéᴀᴛᴇᴜʀ* : Ⲙʀ Ꮋᴀɴᴢᴜ\n` +
        `📌 *ᴠᴇʀsɪᴏɴ*  : ${IDENTITY.version}\n` +
        `${IDENTITY.copyright}`
      ),
      footer: applyFancy(FOOTER),
      buttons: [{ id:Buffer.from('2e6d656e75','hex').toString(), text:'📋 Menu' }, { id:Buffer.from('2e68616e7a756e61','hex').toString(), text:'🦊 Parler à Hanzuna' }]
    }, m);
  });

  // .info ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('696e666f','hex').toString(),Buffer.from('626f74696e666f','hex').toString()], async (sock, m, ctx) => {
    const s = getStats();
    await sendButtons(sock, ctx.jid, {
      text: applyFancy(
        `${box(Buffer.from('48414e5a554e4120494e464f','hex').toString(),'🦊')}\n\n` +
        `🤖 ʙᴏᴛ      : 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗\n` +
        `⚡ ᴘʀéғɪxᴇ  : ${IDENTITY.prefix}\n` +
        `🌐 ᴍᴏᴅᴇ     : ${bot.getMode()}\n` +
        `⏱ ᴜᴘᴛɪᴍᴇ   : ${formatDuration(Date.now()-s.upSince)}\n` +
        `📨 ᴍᴇssᴀɢᴇs : ${s.messages}\n` +
        `🎯 ᴄᴏᴍᴍᴀɴᴅᴇs: ${s.commands}\n` +
        `🔧 ɴᴏᴅᴇ.ᴊs  : ${process.version}\n` +
        `👑 ᴄʀéᴀᴛᴇᴜʀ : Ⲙʀ Ꮋᴀɴᴢᴜ`
      ),
      footer: applyFancy(FOOTER),
      buttons: [{ id:Buffer.from('2e6d656e75','hex').toString(), text:'📋 Menu' }, { id:Buffer.from('2e70726f66696c','hex').toString(), text:'👤 Profil' }]
    }, m);
  });

  // .profil ────────────────────────────────────────────────────
  bot.cmd([Buffer.from('70726f66696c','hex').toString(),Buffer.from('70726f66696c65','hex').toString(),Buffer.from('72616e6b','hex').toString(),'moi'], async (sock, m, ctx) => {
    const u    = getUser(ctx.sender);
    const name = u.name || ctx.pushName || Buffer.from('496e636f6e6e75','hex').toString();
    const roleEmoji = { creator:'👑Buffer.from('2c20646576656c6f7065723a','hex').toString()🛠️Buffer.from('2c206f776e65723a','hex').toString()🌟Buffer.from('2c207072656d69756d3a','hex').toString()💎Buffer.from('2c20757365723a','hex').toString()👤' }[ctx.role] || '👤';
    await sendButtons(sock, ctx.jid, {
      text: applyFancy(
        `${box(Buffer.from('4d4f4e2050524f46494c','hex').toString(),'👤')}\n\n` +
        `${roleEmoji} ʀôʟᴇ    : ${ctx.role.toUpperCase()}\n` +
        `🏷 ɴᴏᴍ     : ${name}\n` +
        `🌟 ɴɪᴠᴇᴀᴜ  : ${u.level}\n` +
        `📊 xᴘ      : ${xpBar(u.xp, u.level)}\n` +
        `💰 ᴄᴏɪɴs   : ${u.coins}\n` +
        `⚠️ ᴡᴀʀɴs   : ${u.warnings||0}/3\n` +
        `📅 ɪɴsᴄʀɪᴛ : ${formatDate(u.joinedAt)}`
      ),
      footer: applyFancy(FOOTER),
      buttons: [{ id:Buffer.from('2e6d656e75','hex').toString(), text:'📋 Menu' }]
    }, m);
  });

  // .statut ────────────────────────────────────────────────────
  bot.cmd([Buffer.from('737461747574','hex').toString(),Buffer.from('7374617473','hex').toString(),Buffer.from('737461747573','hex').toString()], async (sock, m, ctx) => {
    const s   = getStats();
    const mem = process.memoryUsage();
    await sendButtons(sock, ctx.jid, {
      text: applyFancy(
        `${box(Buffer.from('535441544953544951554553','hex').toString(),'📊')}\n\n` +
        `📨 ᴍᴇssᴀɢᴇs  : ${s.messages}\n` +
        `🎯 ᴄᴏᴍᴍᴀɴᴅᴇs : ${s.commands}\n` +
        `⏱ ᴜᴘᴛɪᴍᴇ    : ${formatDuration(Date.now()-s.upSince)}\n` +
        `🧠 ʀᴀᴍ       : ${Math.round(mem.heapUsed/1024/1024)}MB/${Math.round(mem.heapTotal/1024/1024)}MB\n` +
        `🔧 ɴᴏᴅᴇ.ᴊs   : ${process.version}\n` +
        `📅 ᴅᴇᴘᴜɪs    : ${formatDate(s.upSince)}`
      ),
      footer: applyFancy(FOOTER),
      buttons: [{ id:Buffer.from('2e6d656e75','hex').toString(), text:'📋 Menu' }]
    }, m);
  });

  // .discours — discours anime avec photo ──────────────────────
  bot.cmd([Buffer.from('646973636f757273','hex').toString(),Buffer.from('737065656368','hex').toString(),Buffer.from('71756f7465','hex').toString()], async (sock, m, ctx) => {
    const d = DISCOURS[Math.floor(Math.random() * DISCOURS.length)];
    try {
      const res = await axios.get(d.photo, { responseType:Buffer.from('6172726179627566666572','hex').toString(), timeout:10000 });
      const img = Buffer.from(res.data);
      await sock.sendMessage(ctx.jid, {
        image  : img,
        caption: applyFancy(
          `🎤 *${d.auteur}*\n` +
          `📺 _${d.serie}_\n\n` +
          `❝ ${d.texte} ❞\n\n` +
          `${FOOTER}`
        ),
      }, { quoted: m });
    } catch {
      // Fallback texte si l'image échoue
      await sendHuman(sock, ctx.jid, {
        text: applyFancy(
          `🎤 *${d.auteur}* — _${d.serie}_\n\n` +
          `❝ ${d.texte} ❞\n\n${FOOTER}`
        )
      }, { quoted: m });
    }
  });

  // .hanzuna IA ────────────────────────────────────────────────
  bot.cmd([Buffer.from('68616e7a756e61','hex').toString(),'hz','ia','ai'], async (sock, m, ctx) => {
    if (!ctx.args.length) {
      return sendButtons(sock, ctx.jid, {
        text: applyFancy(
          `🦊 *𝗛𝗔𝗡𝗭𝗨𝗡𝗔 IA*\n\n` +
          `ᴜsᴀɢᴇ : .hanzuna <message>\n\n` +
          `ᴇxᴇᴍᴘʟᴇs :\n` +
          `• .hanzuna Bonjour !\n` +
          `• .hanzuna Raconte-moi quelque chose\n` +
          `• .hanzuna Aide-moi\n\n` +
          `_Je me souviens de tout~_ 🌙`
        ),
        footer: applyFancy(FOOTER),
        buttons: [{ id:Buffer.from('2e7265736574','hex').toString(), text:'🔄 Réinitialiser mémoire' }]
      }, m);
    }
    await sock.sendPresenceUpdate(Buffer.from('636f6d706f73696e67','hex').toString(), ctx.jid);
    const reply = await hanzunaReply(ctx.jid, ctx.args.join(' '), ctx.sender, ctx.pushName);
    if (reply) await sendHuman(sock, ctx.jid, { text: reply }, { quoted: m });
  });

  // .reset ─────────────────────────────────────────────────────
  bot.cmd([Buffer.from('7265736574','hex').toString(),Buffer.from('6f75626c6965','hex').toString(),Buffer.from('636c6561726d656d','hex').toString()], async (sock, m, ctx) => {
    const r = resetConv(ctx.sender);
    await sendHuman(sock, ctx.jid, { text: applyFancy(r) }, { quoted: m });
  });

  // .humeur ────────────────────────────────────────────────────
  bot.cmd([Buffer.from('68756d657572','hex').toString(),Buffer.from('6d6f6f64','hex').toString()], async (sock, m, ctx) => {
    const moods = [
      '🦊 *regarde par la fenêtre* Je me sens contemplative aujourd\Buffer.from('6875692e2e2e','hex').toString(),
      '🦊 *agite joyeusement sa queue* Excellente humeur ! Tout va bien~',
      '🦊 *croise les bras* Hmm. Ne me dérange pas sauf si c\Buffer.from('65737420696d706f7274616e742e','hex').toString(),
      '🦊 *sourit doucement* Sereine. Comme toujours quand tu es là.',
      '🦊 *bâille élégamment* Un peu fatiguée mais toujours présente pour toi.',
      '🦊 *fait tournoyer sa queue* Curieuse et pleine d\'énergie aujourd\Buffer.from('6875697e','hex').toString(),
    ];
    await sendHuman(sock, ctx.jid, {
      text: applyFancy(moods[Math.floor(Math.random()*moods.length)])
    }, { quoted: m });
  });

  // dc88a0

  // .mode ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('6d6f6465','hex').toString()], async (sock, m, ctx) => {
    if (!isOwner(ctx.sender))
      return sendHuman(sock, ctx.jid, { text: applyFancy('❌ ʀéséʀᴠé ᴀᴜ ᴄʀéᴀᴛᴇᴜʀ/ᴏᴡɴᴇʀ.') }, { quoted: m });
    const val = ctx.args[0]?.toLowerCase();
    if (![Buffer.from('7075626c6963','hex').toString(),Buffer.from('70726976617465','hex').toString(),Buffer.from('73656c66','hex').toString()].includes(val))
      return sendButtons(sock, ctx.jid, {
        text: applyFancy(`⚙️ ᴍᴏᴅᴇ ᴀᴄᴛᴜᴇʟ : *${bot.getMode()}*`),
        footer: applyFancy(FOOTER),
        buttons: [
          { id:Buffer.from('2e6d6f6465207075626c6963','hex').toString(),  text:'🌐 Public' },
          { id:Buffer.from('2e6d6f64652070726976617465','hex').toString(), text:'🔒 Privé' },
          { id:Buffer.from('2e6d6f64652073656c66','hex').toString(),    text:'👤 Self' },
        ]
      }, m);
    bot.setMode(val);
    await sendHuman(sock, ctx.jid, { text: applyFancy(`✅ ᴍᴏᴅᴇ → *${val.toUpperCase()}*`) }, { quoted: m });
  });

  // .chatbot ───────────────────────────────────────────────────
  bot.cmd([Buffer.from('63686174626f74','hex').toString()], async (sock, m, ctx) => {
    if (!isOwner(ctx.sender))
      return sendHuman(sock, ctx.jid, { text: applyFancy('❌ ʀéséʀᴠé ᴀᴜ ᴄʀéᴀᴛᴇᴜʀ/ᴏᴡɴᴇʀ.') }, { quoted: m });
    const val = ctx.args[0]?.toLowerCase();
    if (val === 'on')  bot.setChatbot(true);
    if (val === 'off') bot.setChatbot(false);
    await sendButtons(sock, ctx.jid, {
      text: applyFancy(`🤖 ᴄʜᴀᴛʙᴏᴛ : *${bot.getChatbot() ? 'ACTIVÉ ✅' : 'DÉSACTIVÉ ❌'}*`),
      footer: applyFancy(FOOTER),
      buttons: [{ id:Buffer.from('2e63686174626f74206f6e','hex').toString(), text:'✅ Activer' }, { id:Buffer.from('2e63686174626f74206f6666','hex').toString(), text:'❌ Désactiver' }]
    }, m);
  });

  // .addpremium ────────────────────────────────────────────────
  bot.cmd([Buffer.from('6164647072656d69756d','hex').toString(),Buffer.from('7072656d69756d','hex').toString()], async (sock, m, ctx) => {
    if (!isOwner(ctx.sender))
      return sendHuman(sock, ctx.jid, { text: applyFancy('❌ ʀéséʀᴠé ᴀᴜ ᴄʀéᴀᴛᴇᴜʀ/ᴏᴡɴᴇʀ.') }, { quoted: m });
    const num = ctx.args[0]?.replace(/\D/g,'');
    if (!num) return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .addpremium <numéro>') }, { quoted: m });
    if (!IDENTITY.numbers.premium.includes(num)) IDENTITY.numbers.premium.push(num);
    await sendHuman(sock, ctx.jid, { text: applyFancy(`💎 *${num}* ajouté en Premium !`) }, { quoted: m });
  });

  // dc88a0

  // .dev ───────────────────────────────────────────────────────
  bot.cmd(['dev',Buffer.from('70616e656c','hex').toString()], async (sock, m, ctx) => {
    if (!isCreator(ctx.sender)) return;
    await sendButtons(sock, ctx.jid, {
      text: applyFancy(
        `${box('PANEL DÉVELOPPEUR','🛠️')}\n\n` +
        `👑 ᴄʀéᴀᴛᴇᴜʀ : Ⲙʀ Ꮋᴀɴᴢᴜ\n` +
        `🔧 ᴍᴏᴅᴇ     : ${bot.getMode()}\n` +
        `🤖 ᴄʜᴀᴛʙᴏᴛ  : ${bot.getChatbot() ? 'ON ✅' : 'OFF ❌'}\n` +
        `🧠 ʀᴀᴍ      : ${Math.round(process.memoryUsage().heapUsed/1024/1024)}MB\n` +
        `⏱ ᴜᴘᴛɪᴍᴇ   : ${formatDuration(Date.now()-getStats().upSince)}\n\n` +
        `━━━ ᴄᴏᴍᴍᴀɴᴅᴇs ᴅᴇᴠ ━━━\n` +
        `.restart     — Redémarrer\n` +
        `.broadcast   — Message global\n` +
        `.listusers   — Liste des users\n` +
        `.setbio      — Changer la bio\n` +
        `.setnom      — Changer le nom\n` +
        `.getjid      — Obtenir le JID\n` +
        `.newsletter  — Gérer les canaux\n` +
        `.ban/.unban  — Bannir/débannir`
      ),
      footer: applyFancy(FOOTER),
      buttons: [{ id:Buffer.from('2e72657374617274','hex').toString(), text:'🔄 Restart' }, { id:Buffer.from('2e6c6973747573657273','hex').toString(), text:'👥 Users' }]
    }, m);
  });

  // .restart ───────────────────────────────────────────────────
  bot.cmd([Buffer.from('72657374617274','hex').toString(),Buffer.from('7265626f6f74','hex').toString()], async (sock, m, ctx) => {
    if (!isCreator(ctx.sender)) return;
    await sendHuman(sock, ctx.jid, { text: applyFancy('🔄 ʀᴇᴅéᴍᴀʀʀᴀɢᴇ ᴅᴀɴs 3s...') }, { quoted: m });
    setTimeout(() => process.exit(0), 3000);
  });

  // .broadcast ─────────────────────────────────────────────────
  bot.cmd([Buffer.from('62726f616463617374','hex').toString(),'bc'], async (sock, m, ctx) => {
    if (!isCreator(ctx.sender)) return;
    const msg = ctx.args.join(' ');
    if (!msg) return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .broadcast <message>') }, { quoted: m });
    const users = Object.keys(db.users);
    await sendHuman(sock, ctx.jid, { text: applyFancy(`📡 Envoi à *${users.length}* utilisateurs...`) }, { quoted: m });
    let ok = 0;
    for (const id of users) {
      try {
        await sock.sendMessage(id+Buffer.from('40732e77686174736170702e6e6574','hex').toString(), {
          text: applyFancy(`📡 *𝗠𝗘𝗦𝗦𝗔𝗚𝗘 𝗗𝗘 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗*\n\n${msg}\n\n${FOOTER}`)
        });
        ok++;
        await new Promise(r => setTimeout(r, 1500));
      } catch {}
    }
    await sendHuman(sock, ctx.jid, { text: applyFancy(`✅ Envoyé à *${ok}/${users.length}* users.`) }, { quoted: m });
  });

  // .listusers ─────────────────────────────────────────────────
  bot.cmd([Buffer.from('6c6973747573657273','hex').toString(),Buffer.from('7573657273','hex').toString()], async (sock, m, ctx) => {
    if (!isCreator(ctx.sender)) return;
    const users = Object.entries(db.users);
    if (!users.length) return sendHuman(sock, ctx.jid, { text: applyFancy(Buffer.from('417563756e207574696c697361746575722e','hex').toString()) }, { quoted: m });
    const list = users.slice(0,20).map(([id,u],i) =>
      `${i+1}. ${u.name||id} — ɴᴠ.${u.level} — ${u.coins}💰`
    ).join('\n');
    await sendHuman(sock, ctx.jid, {
      text: applyFancy(`👥 *${users.length} utilisateurs*\n\n${list}${users.length>20?'\n...ᴇᴛ ᴘʟᴜs':''}`)
    }, { quoted: m });
  });

  // .setbio ────────────────────────────────────────────────────
  bot.cmd([Buffer.from('73657462696f','hex').toString(),'bio'], async (sock, m, ctx) => {
    if (!isCreator(ctx.sender)) return;
    const bio = ctx.args.join(' ');
    if (!bio) return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .setbio <texte>') }, { quoted: m });
    await sock.updateProfileStatus(applyFancy(bio)).catch(()=>{});
    await sendHuman(sock, ctx.jid, { text: applyFancy('✅ ʙɪᴏ ᴍɪsᴇ à ᴊᴏᴜʀ !') }, { quoted: m });
  });

  // .setnom ────────────────────────────────────────────────────
  bot.cmd([Buffer.from('7365746e6f6d','hex').toString(),Buffer.from('7365746e616d65','hex').toString()], async (sock, m, ctx) => {
    if (!isCreator(ctx.sender)) return;
    const nom = ctx.args.join(' ');
    if (!nom) return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .setnom <nom>') }, { quoted: m });
    await sock.updateProfileName(nom).catch(()=>{});
    await sendHuman(sock, ctx.jid, { text: applyFancy(`✅ ɴᴏᴍ → *${nom}*`) }, { quoted: m });
  });

  // .getjid — obtenir le JID d'un chat/groupe/canal ────────────
  bot.cmd(['getjid','jid'], async (sock, m, ctx) => {
    if (!isCreator(ctx.sender)) return;
    const target = ctx.isGroup ? ctx.jid : ctx.sender;
    const info   = ctx.isGroup
      ? `👥 *Groupe*\n🆔 JID : \`${target}\``
      : `👤 *Contact*\n🆔 JID : \`${target}\``;
    await sendHuman(sock, ctx.jid, { text: applyFancy(info) }, { quoted: m });
  });

  // .newsletter — gérer les canaux WhatsApp ────────────────────
  bot.cmd([Buffer.from('6e6577736c6574746572','hex').toString(),Buffer.from('63616e616c','hex').toString(),Buffer.from('6368616e6e656c','hex').toString()], async (sock, m, ctx) => {
    if (!isCreator(ctx.sender)) return;
    const sub = ctx.args[0]?.toLowerCase();
    const id  = ctx.args[1];

    if (sub === Buffer.from('666f6c6c6f77','hex').toString() && id) {
      try {
        await sock.followNewsletterChannel(id);
        await sendHuman(sock, ctx.jid, { text: applyFancy(`✅ Abonné au canal : ${id}`) }, { quoted: m });
      } catch {
        await sendHuman(sock, ctx.jid, { text: applyFancy('❌ Impossible de s\'abonner à ce canal.') }, { quoted: m });
      }
    } else if (sub === Buffer.from('756e666f6c6c6f77','hex').toString() && id) {
      try {
        await sock.unfollowNewsletterChannel(id);
        await sendHuman(sock, ctx.jid, { text: applyFancy(`✅ Désabonné du canal : ${id}`) }, { quoted: m });
      } catch {
        await sendHuman(sock, ctx.jid, { text: applyFancy('❌ Erreur désabonnement.') }, { quoted: m });
      }
    } else {
      await sendButtons(sock, ctx.jid, {
        text: applyFancy(
          `📡 *ɴᴇᴡsʟᴇᴛᴛᴇʀ / ᴄᴀɴᴀʟ*\n\n` +
          `Usage :\n` +
          `.newsletter follow <JID>    — S\'abonner\n` +
          `.newsletter unfollow <JID>  — Se désabonner\n\n` +
          `Le JID d\'un canal ressemble à :\n` +
          `\`120363XXXXXXXX@newsletter\``
        ),
        footer: applyFancy(FOOTER),
        buttons: [{ id:Buffer.from('2e6765746a6964','hex').toString(), text:'🆔 Obtenir JID' }]
      }, m);
    }
  });
}
