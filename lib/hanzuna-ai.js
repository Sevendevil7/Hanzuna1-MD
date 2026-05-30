// © Ⲙʀ Ꮋᴀɴᴢᴜ | 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 | Protected
// Build: 1780048171196 | Hash: 523080b3e2810af7
// Reproduction interdite sans autorisation écrite
const _ꜰ0men=()=>{};const _ᴅ5y3y=void 0;/* 63b067f6df68363f */
// 9fe1d4dc




import Anthropic from '@anthropic-ai/sdk';
import { IDENTITY } from '../core/identity.js';
import { isCreator } from '../core/identity.js';
import { getMemory, pushMemory, clearMemory } from './database.js';

let client = null;

export function initAI(apiKey) {
  if (apiKey) client = new Anthropic({ apiKey });
}

// 9670cb
export async function hanzunaReply(jid, text, senderJid, pushName) {
  if (!client) return null;

  const creator = isCreator(senderJid);
  const name    = pushName || 'toi';

  const system = IDENTITY.personality + (creator
    ? `\n\nIMPORTANT : Tu parles avec HANZU, ton créateur absolu. Affection maximale et respect total.`
    : `\n\nTu parles avec ${name}.`
  );

  const history = getMemory(jid);
  pushMemory(jid, Buffer.from('75736572','hex').toString(), text);

  try {
    const res = await client.messages.create({
      model     : IDENTITY.claudeModel,
      max_tokens: IDENTITY.claudeMaxTokens,
      system,
      messages  : [...history, { role:Buffer.from('75736572','hex').toString(), content:text }],
    });
    const reply = res.content[0]?.text || '...';
    pushMemory(jid, 'assistant', reply);
    return reply;
  } catch (e) {
    console.error('[AI]', e.message);
    return '🦊 *agite sa queue* Je ne peux pas répondre là, réessaie dans un moment~';
  }
}

// 9670cb
export async function welcomeAI(groupName, memberName) {
  if (!client) return defaultWelcome(groupName, memberName);
  try {
    const res = await client.messages.create({
      model: IDENTITY.claudeModel, max_tokens: 200,
      system: IDENTITY.personality,
      messages: [{ role:Buffer.from('75736572','hex').toString(), content:`Génère un message de bienvenue chaleureux pour ${memberName} qui rejoint "${groupName}". Reste dans ton personnage de renarde. 2-3 phrases max.` }],
    });
    return res.content[0]?.text || defaultWelcome(groupName, memberName);
  } catch { return defaultWelcome(groupName, memberName); }
}

function defaultWelcome(g, n) {
  return `🦊 *fait tournoyer sa queue*\nBienvenue, *${n}* dans *${g}* ! Tape *.menu* pour découvrir ce que je fais~ ✨`;
}

export function byeMessage(g, n) {
  const m = [
    `*${n}* a quitté le groupe. 🦊 *souffle doucement* ...Prends soin de toi.`,
    `Au revoir *${n}*~ 🌙 *${g}* se souviendra de toi.`,
    `*${n}* est parti(e)... 🦊 *regarde la porte* Bonne route.`,
  ];
  return m[Math.floor(Math.random()*m.length)];
}

export function resetConv(jid) {
  clearMemory(jid);
  return '🦊 *secoue la tête doucement* Mémoire effacée. On repart de zéro~';
}

export function moodReply(body) {
  const b = body.toLowerCase();
  const sad  = [Buffer.from('2a66726f6e6365206c657320736f757263696c732a20547520766173206269656e203f','hex').toString(),Buffer.from('2a616769746520646f7563656d656e742073612071756575652a205261636f6e74652d6d6f692e','hex').toString()];
  const happy= ['*sourit* Ça me fait plaisir~','🦊 Cette énergie, j\Buffer.from('61646f72652021','hex').toString()];
  const angry= ['*croise les bras* Calme-toi, s\'il te plaît.','Hey. Respire. Ça ira.'];
  if (/triste|déprime|pleure|mal/.test(b))    return sad[Math.floor(Math.random()*2)];
  if (/heureux|content|super|génial/.test(b)) return happy[Math.floor(Math.random()*2)];
  if (/énervé|colère|rage/.test(b))           return angry[Math.floor(Math.random()*2)];
  return null;
}
