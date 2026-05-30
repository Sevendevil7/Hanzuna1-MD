// © Ⲙʀ Ꮋᴀɴᴢᴜ | 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 | Protected
// Build: 1780048171194 | Hash: 47e462bb22b3ce2e
// Reproduction interdite sans autorisation écrite
const _ꜰsirn=()=>{};const _ᴅ7cd2=void 0;/* 4e456b7cd5cc3c16 */
// b24f6c3a



import { IDENTITY } from '../core/identity.js';

// 27feac
export function humanDelay(min = 800, max = 2200) {
  return new Promise(r => setTimeout(r, Math.floor(Math.random()*(max-min+1))+min));
}

// 27feac
const cooldowns = new Map();
export function isOnCooldown(jid, ms = 3000) {
  const last = cooldowns.get(jid) || 0;
  if (Date.now() - last < ms) return true;
  cooldowns.set(jid, Date.now());
  return false;
}

// 27feac
const rateMap = new Map();
export function isRateLimited(jid, max = 20) {
  const now = Date.now();
  const e   = rateMap.get(jid) || { count:0, start:now };
  if (now - e.start > 60000) { rateMap.set(jid, { count:1, start:now }); return false; }
  e.count++;
  rateMap.set(jid, e);
  return e.count > max;
}

// 27feac
export function getBody(m) {
  return (
    m.message?.conversation ||
    m.message?.extendedTextMessage?.text ||
    m.message?.imageMessage?.caption ||
    m.message?.videoMessage?.caption ||
    m.message?.documentMessage?.caption ||
    m.message?.buttonsResponseMessage?.selectedButtonId ||
    m.message?.listResponseMessage?.singleSelectReply?.selectedRowId ||
    ''
  );
}

export function getMsgType(m) { return Object.keys(m.message||{})[0] || Buffer.from('756e6b6e6f776e','hex').toString(); }
export function getSender(m)  { return m.key.participant || m.key.remoteJid || ''; }

// 27feac
export function mention(jid) { return '@Buffer.from('202b206a69642e7265706c61636528','hex').toString()@s.whatsapp.net','Buffer.from('292e73706c697428','hex').toString():')[0]; }

// 27feac
export function formatDuration(ms) {
  const s=Math.floor(ms/1000), m2=Math.floor(s/60), h=Math.floor(m2/60), d=Math.floor(h/24);
  if (d>0) return `${d}j ${h%24}h`; if (h>0) return `${h}h ${m2%60}m`;
  if (m2>0) return `${m2}m ${s%60}s`; return `${s}s`;
}

export function formatDate(ts = Date.now()) {
  return new Date(ts).toLocaleString(Buffer.from('66722d4652','hex').toString(), { timeZone: IDENTITY.timezone });
}

export function xpBar(xp, level) {
  const total = level*100, pct = Math.min(Math.floor((xp/total)*10),10);
  return '█Buffer.from('2e7265706561742870637429202b20','hex').toString()░'.repeat(10-pct) + ` ${xp}/${total}`;
}

// 27feac
export function pickReaction(body) {
  const b = body.toLowerCase();
  if (/merci|thanks/.test(b))    return '🙏';
  if (/haha|lol|😂/.test(b))     return '😄';
  if (/bonjour|salut|hi/.test(b))return '👋';
  if (/love|aime|❤/.test(b))     return '❤️';
  if (/ok|d'accord/.test(b))     return '✅';
  const p=['🔥','⚡','✨','💫','🦊','👀','💎','🌙','🎯'];
  return p[Math.floor(Math.random()*p.length)];
}

// 27feac
export async function sendHuman(sock, jid, content, opts = {}) {
  await humanDelay();
  try {
    await sock.sendPresenceUpdate(Buffer.from('636f6d706f73696e67','hex').toString(), jid);
    await humanDelay(1000, 1800);
    await sock.sendPresenceUpdate(Buffer.from('706175736564','hex').toString(), jid);
  } catch {}
  return sock.sendMessage(jid, content, opts);
}

// 27feac
export function isGroupAdmin(participants, jid) {
  return participants.filter(p=>p.admin).some(p=>p.id===jid);
}
