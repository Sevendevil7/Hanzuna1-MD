// © Ⲙʀ Ꮋᴀɴᴢᴜ | 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 | Protected
// Build: 1780048171218 | Hash: 438ab3556ef6bb0a
// Reproduction interdite sans autorisation écrite
const _ꜰnqx3=()=>{};const _ᴅ2md0=void 0;/* e5cfcad3b0687e2b */
// 34652c34




import { isOwner }             from '../core/identity.js';
import { applyFancy, box }     from '../core/fancy.js';
import { getGroup, saveGroup, addWarn, getWarns, clearWarns } from '../lib/database.js';
import { mention, sendHuman, formatDate, isGroupAdmin } from '../lib/utils.js';
import { sendButtons, FOOTER } from '../lib/buttons.js';

const WARN_MAX = 3;

export default function registerGroup(bot) {

  const gOnly = (sock, m, ctx) => {
    if (!ctx.isGroup) { sendHuman(sock, ctx.jid, { text: applyFancy('❌ ɢʀᴏᴜᴘᴇs sᴇᴜʟᴇᴍᴇɴᴛ.') }, { quoted: m }); return false; }
    return true;
  };
  const adminOnly = (sock, m, ctx) => {
    if (!ctx.isAdmin && !isOwner(ctx.sender)) { sendHuman(sock, ctx.jid, { text: applyFancy('❌ ʀéséʀᴠé ᴀᴜx ᴀᴅᴍɪɴs.') }, { quoted: m }); return false; }
    return true;
  };
  const botAdm = (sock, m, ctx) => {
    if (!ctx.isBotAdmin) { sendHuman(sock, ctx.jid, { text: applyFancy('❌ Je dois être admin pour cette action.') }, { quoted: m }); return false; }
    return true;
  };

  // .kick ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('6b69636b','hex').toString(),Buffer.from('6578636c757265','hex').toString(),Buffer.from('7669726572','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx) || !botAdm(sock,m,ctx)) return;
    const target = m.message?.extendedTextMessage?.contextInfo?.participant || ctx.mentions?.[0];
    if (!target) return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .kick @user') }, { quoted: m });
    await sock.groupParticipantsUpdate(ctx.jid, [target], Buffer.from('72656d6f7665','hex').toString());
    await sendHuman(sock, ctx.jid, { text: applyFancy(`👢 ${mention(target)} a été exclu(e).`), mentions:[target] }, { quoted: m });
  });

  // .kickall — vider le groupe (ultra-rapide, parallèle) ───────
  bot.cmd([Buffer.from('6b69636b616c6c','hex').toString(),Buffer.from('76696467726f757065','hex').toString(),Buffer.from('636c65617267726f7570','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx) || !botAdm(sock,m,ctx)) return;

    const meta    = await sock.groupMetadata(ctx.jid);
    const botJid  = sock.user.id;

    // Membres à exclure (pas les admins, pas le bot)
    const toKick = meta.participants
      .filter(p => !p.admin && p.id !== botJid)
      .map(p => p.id);

    if (!toKick.length)
      return sendHuman(sock, ctx.jid, { text: applyFancy('✅ Aucun membre à exclure.') }, { quoted: m });

    await sendHuman(sock, ctx.jid, {
      text: applyFancy(`💥 *ᴋɪᴄᴋ ᴀʟʟ* — Exclusion de *${toKick.length}* membres...`)
    }, { quoted: m });

    // Envoi en lots de 20 en parallèle (max vitesse Baileys)
    const BATCH = 20;
    let done = 0;
    for (let i = 0; i < toKick.length; i += BATCH) {
      const batch = toKick.slice(i, i + BATCH);
      await Promise.all(
        batch.map(jid => sock.groupParticipantsUpdate(ctx.jid, [jid], Buffer.from('72656d6f7665','hex').toString()).catch(()=>{}))
      );
      done += batch.length;
    }

    await sendHuman(sock, ctx.jid, {
      text: applyFancy(`✅ *${done}* membres exclus du groupe.`)
    }, { quoted: m });
  });

  // .promote ───────────────────────────────────────────────────
  bot.cmd([Buffer.from('70726f6d6f7465','hex').toString(),Buffer.from('61646d696e','hex').toString(),Buffer.from('70726f6d6f','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx) || !botAdm(sock,m,ctx)) return;
    const target = m.message?.extendedTextMessage?.contextInfo?.participant || ctx.mentions?.[0];
    if (!target) return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .promote @user') }, { quoted: m });
    await sock.groupParticipantsUpdate(ctx.jid, [target], Buffer.from('70726f6d6f7465','hex').toString());
    await sendHuman(sock, ctx.jid, { text: applyFancy(`👑 ${mention(target)} est maintenant admin !`), mentions:[target] }, { quoted: m });
  });

  // .demote ────────────────────────────────────────────────────
  bot.cmd([Buffer.from('64656d6f7465','hex').toString(),Buffer.from('646561646d696e','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx) || !botAdm(sock,m,ctx)) return;
    const target = m.message?.extendedTextMessage?.contextInfo?.participant || ctx.mentions?.[0];
    if (!target) return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .demote @user') }, { quoted: m });
    await sock.groupParticipantsUpdate(ctx.jid, [target], Buffer.from('64656d6f7465','hex').toString());
    await sendHuman(sock, ctx.jid, { text: applyFancy(`⬇️ ${mention(target)} n'est plus admin.`), mentions:[target] }, { quoted: m });
  });

  // .mute / .unmute ────────────────────────────────────────────
  bot.cmd([Buffer.from('6d757465','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx) || !botAdm(sock,m,ctx)) return;
    await sock.groupSettingUpdate(ctx.jid, Buffer.from('616e6e6f756e63656d656e74','hex').toString());
    saveGroup(ctx.jid, { mute:true });
    await sendHuman(sock, ctx.jid, { text: applyFancy('🔇 ɢʀᴏᴜᴘᴇ ᴇɴ sɪʟᴇɴᴄᴇ.') }, { quoted: m });
  });

  bot.cmd([Buffer.from('756e6d757465','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx) || !botAdm(sock,m,ctx)) return;
    await sock.groupSettingUpdate(ctx.jid, Buffer.from('6e6f745f616e6e6f756e63656d656e74','hex').toString());
    saveGroup(ctx.jid, { mute:false });
    await sendHuman(sock, ctx.jid, { text: applyFancy('🔊 ɢʀᴏᴜᴘᴇ ʀéᴀᴄᴛɪᴠé.') }, { quoted: m });
  });

  // .lock / .unlock ────────────────────────────────────────────
  bot.cmd([Buffer.from('6c6f636b','hex').toString(),Buffer.from('766572726f75696c6c6572','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx) || !botAdm(sock,m,ctx)) return;
    await sock.groupSettingUpdate(ctx.jid, Buffer.from('6c6f636b6564','hex').toString());
    await sendHuman(sock, ctx.jid, { text: applyFancy('🔒 ɢʀᴏᴜᴘᴇ ᴠᴇʀʀᴏᴜɪʟʟé.') }, { quoted: m });
  });

  bot.cmd([Buffer.from('756e6c6f636b','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx) || !botAdm(sock,m,ctx)) return;
    await sock.groupSettingUpdate(ctx.jid, Buffer.from('756e6c6f636b6564','hex').toString());
    await sendHuman(sock, ctx.jid, { text: applyFancy('🔓 ɢʀᴏᴜᴘᴇ ᴅéᴠᴇʀʀᴏᴜɪʟʟé.') }, { quoted: m });
  });

  // .warn ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('7761726e','hex').toString(),Buffer.from('61766572746972','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx)) return;
    const target = m.message?.extendedTextMessage?.contextInfo?.participant || ctx.mentions?.[0];
    if (!target) return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .warn @user <raison>') }, { quoted: m });
    const reason = ctx.args.slice(1).join(' Buffer.from('29207c7c20','hex').toString()ɴᴏɴ sᴘéᴄɪғɪéᴇ';
    const count  = addWarn(target, reason);
    let text = applyFancy(
      `⚠️ *ᴀᴠᴇʀᴛɪssᴇᴍᴇɴᴛ* ⚠️\n\n` +
      `👤 ${mention(target)}\n` +
      `📝 ʀᴀɪsᴏɴ  : ${reason}\n` +
      `🔢 ᴡᴀʀɴs   : ${count}/${WARN_MAX}`
    );
    if (count >= WARN_MAX && ctx.isBotAdmin) {
      text += applyFancy('\n\n🚫 Limite atteinte — Exclusion automatique.');
      await sendHuman(sock, ctx.jid, { text, mentions:[target] }, { quoted: m });
      await sock.groupParticipantsUpdate(ctx.jid, [target], Buffer.from('72656d6f7665','hex').toString());
    } else {
      await sendHuman(sock, ctx.jid, { text, mentions:[target] }, { quoted: m });
    }
  });

  // .warns ─────────────────────────────────────────────────────
  bot.cmd([Buffer.from('7761726e73','hex').toString(),Buffer.from('6c6973747761726e','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx)) return;
    const target = m.message?.extendedTextMessage?.contextInfo?.participant || ctx.mentions?.[0] || ctx.sender;
    const warns  = getWarns(target);
    if (!warns.length)
      return sendHuman(sock, ctx.jid, { text: applyFancy(`✅ ${mention(target)} — aucun warn.`), mentions:[target] }, { quoted: m });
    const list = warns.map((w,i) => `${i+1}. ${w.reason} — ${formatDate(w.date)}`).join('\n');
    await sendHuman(sock, ctx.jid, { text: applyFancy(`📋 Warns de ${mention(target)} :\n\n${list}`), mentions:[target] }, { quoted: m });
  });

  // .clearwarn ─────────────────────────────────────────────────
  bot.cmd([Buffer.from('636c6561727761726e','hex').toString(),Buffer.from('72657365747761726e','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx)) return;
    const target = m.message?.extendedTextMessage?.contextInfo?.participant || ctx.mentions?.[0];
    if (!target) return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .clearwarn @user') }, { quoted: m });
    clearWarns(target);
    await sendHuman(sock, ctx.jid, { text: applyFancy(`🧹 Warns de ${mention(target)} effacés.`), mentions:[target] }, { quoted: m });
  });

  // .regles ────────────────────────────────────────────────────
  bot.cmd([Buffer.from('7265676c6573','hex').toString(),Buffer.from('72756c6573','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx)) return;
    const group = getGroup(ctx.jid);
    if (ctx.args.length && (ctx.isAdmin || isOwner(ctx.sender))) {
      saveGroup(ctx.jid, { rules: ctx.args.join(' ') });
      return sendHuman(sock, ctx.jid, { text: applyFancy('✅ Règles mises à jour !') }, { quoted: m });
    }
    if (!group.rules)
      return sendHuman(sock, ctx.jid, { text: applyFancy('📋 Aucune règle. Admin : .regles <texte>') }, { quoted: m });
    await sendHuman(sock, ctx.jid, { text: applyFancy(`📋 *ʀèɢʟᴇs*\n\n${group.rules}`) }, { quoted: m });
  });

  // .antilink ──────────────────────────────────────────────────
  bot.cmd([Buffer.from('616e74696c696e6b','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx)) return;
    const val = ctx.args[0]?.toLowerCase();
    if (!['on','off'].includes(val))
      return sendButtons(sock, ctx.jid, {
        text: applyFancy(`🔗 ᴀɴᴛɪ-ʟɪᴇɴ : *${getGroup(ctx.jid).antilink ? 'ON':'OFF'}*`),
        footer: applyFancy(FOOTER),
        buttons: [{ id:Buffer.from('2e616e74696c696e6b206f6e','hex').toString(), text:'✅ Activer' }, { id:Buffer.from('2e616e74696c696e6b206f6666','hex').toString(), text:'❌ Désactiver' }]
      }, m);
    saveGroup(ctx.jid, { antilink: val==='on' });
    await sendHuman(sock, ctx.jid, { text: applyFancy(`🔗 ᴀɴᴛɪ-ʟɪᴇɴ : *${val.toUpperCase()}*`) }, { quoted: m });
  });

  // .tagall ────────────────────────────────────────────────────
  bot.cmd([Buffer.from('746167616c6c','hex').toString(),Buffer.from('65766572796f6e65','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx)) return;
    const meta    = await sock.groupMetadata(ctx.jid);
    const members = meta.participants.map(p => p.id);
    const txt     = ctx.args.join(' Buffer.from('29207c7c20','hex').toString()📢 ᴀᴛᴛᴇɴᴛɪᴏɴ ᴛᴏᴜᴛ ʟᴇ ᴍᴏɴᴅᴇ !';
    const tags    = members.map(j => `@${j.split('@')[0]}`).join(' ');
    await sendHuman(sock, ctx.jid, { text: applyFancy(`${txt}\n\n${tags}`), mentions: members }, { quoted: m });
  });

  // .infogroupe ────────────────────────────────────────────────
  bot.cmd([Buffer.from('696e666f67726f757065','hex').toString(),Buffer.from('67726f7570696e666f','hex').toString(),'gi'], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx)) return;
    const meta   = await sock.groupMetadata(ctx.jid);
    const admins = meta.participants.filter(p=>p.admin).length;
    await sendButtons(sock, ctx.jid, {
      text: applyFancy(
        `${box(Buffer.from('494e464f2047524f555045','hex').toString(),'👥')}\n\n` +
        `📛 ɴᴏᴍ      : ${meta.subject}\n` +
        `👤 ᴍᴇᴍʙʀᴇs  : ${meta.participants.length}\n` +
        `👑 ᴀᴅᴍɪɴs   : ${admins}\n` +
        `📅 ᴄʀéé     : ${new Date(meta.creation*1000).toLocaleDateString(Buffer.from('66722d4652','hex').toString())}`
      ),
      footer: applyFancy(FOOTER),
      buttons: [{ id:Buffer.from('2e6d656e75','hex').toString(), text:'📋 Menu' }, { id:Buffer.from('2e7265676c6573','hex').toString(), text:'📋 Règles' }]
    }, m);
  });

  // .link ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('6c696e6b','hex').toString(),Buffer.from('6c69656e67726f757065','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx) || !botAdm(sock,m,ctx)) return;
    try {
      const code = await sock.groupInviteCode(ctx.jid);
      await sendHuman(sock, ctx.jid, {
        text: applyFancy(`🔗 *ʟɪᴇɴ ᴅ'ɪɴᴠɪᴛᴀᴛɪᴏɴ*\n\nhttps://chat.whatsapp.com/${code}`)
      }, { quoted: m });
    } catch {
      await sendHuman(sock, ctx.jid, { text: applyFancy('❌ Impossible de récupérer le lien.') }, { quoted: m });
    }
  });

  // .resetlink ─────────────────────────────────────────────────
  bot.cmd([Buffer.from('72657365746c696e6b','hex').toString(),Buffer.from('7265766f6b656c696e6b','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx) || !botAdm(sock,m,ctx)) return;
    try {
      const code = await sock.groupRevokeInvite(ctx.jid);
      await sendHuman(sock, ctx.jid, {
        text: applyFancy(`🔄 Nouveau lien :\nhttps://chat.whatsapp.com/${code}`)
      }, { quoted: m });
    } catch {
      await sendHuman(sock, ctx.jid, { text: applyFancy('❌ Impossible de réinitialiser.') }, { quoted: m });
    }
  });

  // .sondage ───────────────────────────────────────────────────
  bot.cmd([Buffer.from('736f6e64616765','hex').toString(),Buffer.from('706f6c6c','hex').toString(),Buffer.from('766f7465','hex').toString()], async (sock, m, ctx) => {
    if (!gOnly(sock,m,ctx) || !adminOnly(sock,m,ctx)) return;
    const parts = ctx.args.join(' Buffer.from('292e73706c697428','hex').toString()|').map(s=>s.trim()).filter(Boolean);
    if (parts.length < 3)
      return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .sondage Question | Option1 | Option2') }, { quoted: m });
    const [question, ...options] = parts;
    try {
      await sock.sendMessage(ctx.jid, { poll: { name: question, values: options, selectableCount: 1 } });
    } catch {
      const opts = options.map((o,i)=>`${['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'][i]||`${i+1}.`} ${o}`).join('\n');
      await sendHuman(sock, ctx.jid, { text: applyFancy(`📊 *sᴏɴᴅᴀɢᴇ*\n\n❓ ${question}\n\n${opts}`) }, { quoted: m });
    }
  });

  // .ban / .unban ──────────────────────────────────────────────
  bot.cmd(['ban'], async (sock, m, ctx) => {
    if (!isOwner(ctx.sender)) return;
    const target = ctx.mentions?.[0] || (ctx.args[0] && ctx.args[0]+Buffer.from('40732e77686174736170702e6e6574','hex').toString());
    if (!target) return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .ban @user') }, { quoted: m });
    bot.addBanned(target);
    await sendHuman(sock, ctx.jid, { text: applyFancy(`🚫 ${mention(target)} banni.`), mentions:[target] }, { quoted: m });
  });

  bot.cmd([Buffer.from('756e62616e','hex').toString()], async (sock, m, ctx) => {
    if (!isOwner(ctx.sender)) return;
    const target = ctx.mentions?.[0] || (ctx.args[0] && ctx.args[0]+Buffer.from('40732e77686174736170702e6e6574','hex').toString());
    if (!target) return sendHuman(sock, ctx.jid, { text: applyFancy('⚙️ Usage : .unban @user') }, { quoted: m });
    bot.removeBanned(target);
    await sendHuman(sock, ctx.jid, { text: applyFancy(`✅ ${mention(target)} débanni.`), mentions:[target] }, { quoted: m });
  });
}
