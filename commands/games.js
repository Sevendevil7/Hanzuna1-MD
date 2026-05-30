// © Ⲙʀ Ꮋᴀɴᴢᴜ | 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 | Protected
// Build: 1780048171221 | Hash: 945146151ed77ca7
// Reproduction interdite sans autorisation écrite
const _ꜰkqet=()=>{};const _ᴅ51tl=void 0;/* 2f4a2583cb1968fb */
// 50eb2c6d



import { applyFancy, box } from '../core/fancy.js';
import { addXP, addCoins, getUser } from '../lib/database.js';
import { mention, sendHuman } from '../lib/utils.js';
import { sendButtons } from '../lib/buttons.js';
import { sendHanzunaSticker } from '../lib/stickers.js';

// f0edbd
const QUIZ_DB = [
  { q:'🌍 Capitale de la France ?',          a:Buffer.from('7061726973','hex').toString(),        h:'Ville lumière 🗼' },
  { q:'🔢 Combien font 13 × 13 ?',           a:'169Buffer.from('2c20202020202020202020683a','hex').toString()Carré de 13' },
  { q:'🌊 Océan le plus grand ?Buffer.from('2c20202020202020202020202020613a','hex').toString()pacifiqueBuffer.from('2c20202020683a','hex').toString()Côté Asie/Amériques' },
  { q:'🦁 Animal le plus rapide ?Buffer.from('2c2020202020202020202020613a','hex').toString()guépardBuffer.from('2c202020202020683a','hex').toString()Félin africain' },
  { q:'🎵 Roi de la pop ?Buffer.from('2c20202020202020202020202020202020202020613a','hex').toString()michael jacksonBuffer.from('2c20683a','hex').toString()Thriller 🎶' },
  { q:'⚽ Joueurs dans une équipe de foot ?Buffer.from('2c20613a','hex').toString()11Buffer.from('2c2020202020202020202020683a','hex').toString()Sur le terrain' },
  { q:'🌙 Planète la plus proche du Soleil?Buffer.from('2c20613a','hex').toString()mercureBuffer.from('2c202020202020683a','hex').toString()Très chaude ☀️' },
  { q:'💧 Formule chimique de l\Buffer.from('656175203f','hex').toString(),      a:'h2oBuffer.from('2c20202020202020202020683a','hex').toString()2H + 1O' },
  { q:'🦊 Animal emblème de Hanzuna ?Buffer.from('2c20202020202020613a','hex').toString()renardeBuffer.from('2c202020202020683a','hex').toString()Queue rouge~' },
  { q:'🏝️ Île la plus grande du monde ?Buffer.from('2c20202020613a','hex').toString()groenlandBuffer.from('2c20202020683a','hex').toString()Arctique ❄️' },
  { q:'🎨 Qui a peint la Joconde ?Buffer.from('2c202020202020202020613a','hex').toString()vinciBuffer.from('2c2020202020202020683a','hex').toString()Leonardo...' },
  { q:'📚 Qui a écrit Harry Potter ?Buffer.from('2c2020202020202020613a','hex').toString()rowlingBuffer.from('2c202020202020683a','hex').toString()J.K. ...' },
  { q:'🚀 Première planète du système solaire?Buffer.from('2c20613a','hex').toString()mercureBuffer.from('2c2020683a','hex').toString()La plus proche du soleil' },
  { q:'⚡ Combien font 8 × 7 ?Buffer.from('2c20202020202020202020202020613a','hex').toString()56Buffer.from('2c2020202020202020202020683a','hex').toString()Table de 8' },
  { q:'🌺 Capitale du Japon ?Buffer.from('2c2020202020202020202020202020613a','hex').toString()tokyoBuffer.from('2c2020202020202020683a','hex').toString()Land of the rising sun 🌅' },
];

// Mots pour le pendu
const MOTS_PENDU = [
  {mot:'hanzunaBuffer.from('2c20696e646963653a','hex').toString()Bot WhatsApp célèbre 🦊'},
  {mot:'renardeBuffer.from('2c20696e646963653a','hex').toString()Animal à queue rouge'},
  {mot:'musiqueBuffer.from('2c20696e646963653a','hex').toString()Art des sons'},
  {mot:'soleilBuffer.from('2c2020696e646963653a','hex').toString()Étoile de notre système'},
  {mot:'dragonBuffer.from('2c2020696e646963653a','hex').toString()Créature légendaire crachant du feu'},
  {mot:'galaxieBuffer.from('2c20696e646963653a','hex').toString()Ensemble d\'étoiles'},
  {mot:Buffer.from('6372797374616c','hex').toString(), indice:'Pierre précieuse transparente'},
  {mot:Buffer.from('74656d70657465','hex').toString(), indice:'Phénomène météo violent'},
];

const activeQuiz   = new Map();
const activeDefi   = new Map();
const activePendu  = new Map();
const activeCalcul = new Map();

export default function registerGames(bot) {

  // .quiz ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('7175697a','hex').toString(),Buffer.from('7175657374696f6e','hex').toString()], async (sock, m, ctx) => {
    if (activeQuiz.has(ctx.jid))
      return sendHuman(sock, ctx.jid, { text: applyFancy('⏳ Un quiz est en cours ! Réponds à la question.') }, { quoted: m });
    const q = QUIZ_DB[Math.floor(Math.random()*QUIZ_DB.length)];
    activeQuiz.set(ctx.jid, { answer:q.a, hint:q.h });
    await sendButtons(sock, ctx.jid, {
      text: applyFancy(`🎯 *QUIZ HANZUNA*\n\n${q.q}\n\n⏱ 30 secondes !`),
      footer: applyFancy('Tape ta réponse directement'),
      buttons: [{ id:Buffer.from('2e696e64696365','hex').toString(), text:'💡 Voir l\Buffer.from('696e64696365','hex').toString() }]
    }, m);
    const t = setTimeout(async () => {
      if (activeQuiz.has(ctx.jid)) {
        activeQuiz.delete(ctx.jid);
        await sock.sendMessage(ctx.jid, { text: applyFancy(`⌛ Temps écoulé ! Réponse : *${q.a}*`) });
      }
    }, 30000);
    activeQuiz.get(ctx.jid).timeout = t;
  });

  // .indice ────────────────────────────────────────────────────
  bot.cmd([Buffer.from('696e64696365','hex').toString(),Buffer.from('68696e74','hex').toString()], async (sock, m, ctx) => {
    const q = activeQuiz.get(ctx.jid);
    if (!q) return sendHuman(sock, ctx.jid, { text: applyFancy('❌ Pas de quiz en cours.') }, { quoted: m });
    await sendHuman(sock, ctx.jid, { text: applyFancy(`💡 Indice : *${q.hint}*`) }, { quoted: m });
  });

  // .calcul ─── jeu de calcul mental ───────────────────────────
  bot.cmd([Buffer.from('63616c63756c','hex').toString(),Buffer.from('6d617468','hex').toString()], async (sock, m, ctx) => {
    if (activeCalcul.has(ctx.jid))
      return sendHuman(sock, ctx.jid, { text: applyFancy('⏳ Un calcul est en cours !') }, { quoted: m });
    const a = Math.floor(Math.random()*20)+1;
    const b = Math.floor(Math.random()*20)+1;
    const ops = [
      { sym:'+', result:a+b },
      { sym:'-', result:a-b },
      { sym:'×', result:a*b },
    ];
    const op = ops[Math.floor(Math.random()*ops.length)];
    activeCalcul.set(ctx.jid, { answer: String(op.result) });
    await sendHuman(sock, ctx.jid, {
      text: applyFancy(`🔢 *CALCUL MENTAL*\n\nCombien font *${a} ${op.sym} ${b}* ?\n\n⏱ 15 secondes !`)
    }, { quoted: m });
    setTimeout(() => {
      if (activeCalcul.has(ctx.jid)) {
        activeCalcul.delete(ctx.jid);
        sock.sendMessage(ctx.jid, { text: applyFancy(`⌛ Temps écoulé ! Réponse : *${op.result}*`) });
      }
    }, 15000);
  });

  // .pendu ─────────────────────────────────────────────────────
  bot.cmd([Buffer.from('70656e6475','hex').toString(),Buffer.from('68616e676d616e','hex').toString()], async (sock, m, ctx) => {
    if (activePendu.has(ctx.jid))
      return sendHuman(sock, ctx.jid, { text: applyFancy(`⏳ Pendu en cours ! Tape une lettre.`) }, { quoted: m });
    const entry = MOTS_PENDU[Math.floor(Math.random()*MOTS_PENDU.length)];
    const state = {
      mot     : entry.mot,
      indice  : entry.indice,
      trouve  : Array(entry.mot.length).fill('_'),
      erreurs : [],
      vies    : 6,
    };
    activePendu.set(ctx.jid, state);
    await sendHuman(sock, ctx.jid, {
      text: applyFancy(
        `🪤 *PENDU*\n\n💡 Indice : ${entry.indice}\n\n` +
        `Mot : *${state.trouve.join(' ')}* (${entry.mot.length} lettres)\n` +
        `❤️ Vies : ${state.vies}/6\n\n` +
        `Envoie une lettre pour jouer !`
      )
    }, { quoted: m });
  });

  // .dé ────────────────────────────────────────────────────────
  bot.cmd(['dé','de',Buffer.from('64696365','hex').toString(),Buffer.from('726f6c6c','hex').toString()], async (sock, m, ctx) => {
    const faces  = Math.min(parseInt(ctx.args[0])||6, 100);
    const result = Math.floor(Math.random()*faces)+1;
    const xp     = addXP(ctx.sender, 5);
    let text = applyFancy(`🎲 Dé à *${faces}* faces → *${result}*`);
    if (xp.levelUp) text += applyFancy(`\n🌟 Level UP ! Tu es niveau *${xp.newLevel}* !`);
    await sendHuman(sock, ctx.jid, { text }, { quoted: m });
  });

  // .pile ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('70696c65','hex').toString(),Buffer.from('66616365','hex').toString(),Buffer.from('636f696e666c6970','hex').toString()], async (sock, m, ctx) => {
    const r = Math.random()>.5 ? '🪙 *PILE*' : '🪙 *FACE*';
    await sendHuman(sock, ctx.jid, { text: applyFancy(`🦊 *lance la pièce*\n\n...${r} !`) }, { quoted: m });
  });

  // .8ball ─────────────────────────────────────────────────────
  bot.cmd([Buffer.from('3862616c6c','hex').toString(),Buffer.from('626f756c65','hex').toString()], async (sock, m, ctx) => {
    const reps = [
      '✅ Absolument oui.','✅ C\Buffer.from('657374206365727461696e2e','hex').toString(),'✅ Sans aucun doute.',
      '🤔 Peut-être...','🤔 Difficile à dire.','🤔 Réessaie plus tard.',
      '❌ Non.','❌ Certainement pas.','❌ Mes sources disent non.',
      '🦊 *agite sa queue* Les signes sont flous...',
    ];
    const q = ctx.args.join(' ');
    if (!q) return sendHuman(sock, ctx.jid, { text: applyFancy(`⚙️ Usage : .8ball <question>`) }, { quoted: m });
    const rep = reps[Math.floor(Math.random()*reps.length)];
    await sendHuman(sock, ctx.jid, {
      text: applyFancy(`🎱 *MAGIC 8 BALL*\n\n❓ ${q}\n\n${rep}`)
    }, { quoted: m });
  });

  // .defi ──────────────────────────────────────────────────────
  bot.cmd([Buffer.from('64656669','hex').toString(),'défi',Buffer.from('6368616c6c656e6765','hex').toString()], async (sock, m, ctx) => {
    const target = m.message?.extendedTextMessage?.contextInfo?.participant || ctx.mentions?.[0];
    const word   = ctx.args.slice(1).join(' ');
    if (!target||!word)
      return sendHuman(sock, ctx.jid, { text: applyFancy(`⚙️ Usage : .defi @user <mot>`) }, { quoted: m });
    activeDefi.set(ctx.jid, { challenger:ctx.sender, target, word:word.toLowerCase() });
    await sendHuman(sock, ctx.jid, {
      text: applyFancy(`⚔️ *DÉFI !*\n\n${mention(ctx.sender)} défie ${mention(target)} !\n🔤 Épelle : *${word.toUpperCase()}*\n⏱ 20 secondes !`),
      mentions:[ctx.sender, target]
    }, { quoted: m });
    setTimeout(()=>{ if(activeDefi.has(ctx.jid)){ activeDefi.delete(ctx.jid); sock.sendMessage(ctx.jid,{text:applyFancy(`⌛ Temps écoulé ! Réponse : *${word}*`)}); }}, 20000);
  });

  // f0edbd
  bot.onText(async (sock, m, ctx) => {
    const body = ctx.body.toLowerCase().trim();

    // Quiz
    const quiz = activeQuiz.get(ctx.jid);
    if (quiz && body === quiz.answer) {
      clearTimeout(quiz.timeout); activeQuiz.delete(ctx.jid);
      const xp = addXP(ctx.sender,20); const coins = addCoins(ctx.sender,15);
      let t = applyFancy(`🎉 *BONNE RÉPONSE !* ${mention(ctx.sender)}\n+20 XP | +15 💰 (total: ${coins})`);
      if (xp.levelUp) t += applyFancy(`\n🌟 Level UP ! Niveau *${xp.newLevel}* !`);
      await sendHuman(sock, ctx.jid, { text:t, mentions:[ctx.sender] });
      await sendHanzunaSticker(sock, ctx.jid, 'win');
      return true;
    }

    // Calcul
    const calc = activeCalcul.get(ctx.jid);
    if (calc && body === calc.answer) {
      activeCalcul.delete(ctx.jid);
      const xp = addXP(ctx.sender,15); const coins = addCoins(ctx.sender,10);
      let t = applyFancy(`🎉 *CORRECT !* ${mention(ctx.sender)} +15 XP | +10 💰`);
      if (xp.levelUp) t += applyFancy(`\n🌟 Niveau *${xp.newLevel}* !`);
      await sendHuman(sock, ctx.jid, { text:t, mentions:[ctx.sender] });
      await sendHanzunaSticker(sock, ctx.jid, 'win');
      return true;
    }

    // Pendu
    const pendu = activePendu.get(ctx.jid);
    if (pendu && /^[a-z]$/.test(body)) {
      const lettre = body;
      if (pendu.erreurs.includes(lettre) || pendu.trouve.includes(lettre)) {
        await sendHuman(sock, ctx.jid, { text: applyFancy(`⚠️ Lettre déjà jouée : *${lettre.toUpperCase()}*`) });
        return true;
      }
      if (pendu.mot.includes(lettre)) {
        pendu.mot.split('').forEach((c,i) => { if(c===lettre) pendu.trouve[i]=lettre; });
        if (!pendu.trouve.includes('_')) {
          activePendu.delete(ctx.jid);
          const xp = addXP(ctx.sender,30);
          let t = applyFancy(`🎉 *BRAVO !* Tu as trouvé : *${pendu.mot.toUpperCase()}*\n+30 XP !`);
          if (xp.levelUp) t += applyFancy(`\n🌟 Niveau *${xp.newLevel}* !`);
          await sendHuman(sock, ctx.jid, { text:t });
          await sendHanzunaSticker(sock, ctx.jid, 'win');
        } else {
          await sendHuman(sock, ctx.jid, { text: applyFancy(`✅ Bonne lettre !\nMot : *${pendu.trouve.join(' ')}*\n❤️ Vies : ${pendu.vies}/6`) });
        }
      } else {
        pendu.erreurs.push(lettre); pendu.vies--;
        const viesEmoji = '❤️Buffer.from('2e7265706561742870656e64752e76696573292b','hex').toString()🖤'.repeat(6-pendu.vies);
        if (pendu.vies <= 0) {
          activePendu.delete(ctx.jid);
          await sendHuman(sock, ctx.jid, { text: applyFancy(`💀 *PERDU !* Le mot était : *${pendu.mot.toUpperCase()}*`) });
        } else {
          await sendHuman(sock, ctx.jid, { text: applyFancy(`❌ *${lettre.toUpperCase()}* — Erreurs : ${pendu.erreurs.join(', ')}\nMot : *${pendu.trouve.join(' ')}*\n${viesEmoji}`) });
        }
      }
      return true;
    }

    // Défi
    const defi = activeDefi.get(ctx.jid);
    if (defi && ctx.sender===defi.target && body===defi.word) {
      activeDefi.delete(ctx.jid);
      const xp = addXP(ctx.sender,15);
      let t = applyFancy(`🏆 ${mention(ctx.sender)} a relevé le défi ! Bien joué !`);
      if (xp.levelUp) t += applyFancy(`\n🌟 Niveau *${xp.newLevel}* !`);
      await sendHuman(sock, ctx.jid, { text:t, mentions:[ctx.sender] });
      await sendHanzunaSticker(sock, ctx.jid, 'win');
      return true;
    }

    return false;
  });
}
