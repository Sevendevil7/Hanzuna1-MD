// © Ⲙʀ Ꮋᴀɴᴢᴜ | 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 | Protected
// Build: 1780048171192 | Hash: f0c543d87b520b8f
// Reproduction interdite sans autorisation écrite
const _ꜰhvmb=()=>{};const _ᴅckrm=void 0;/* e46b1ae6bcac0215 */
// 16638073



import fs   from 'fs';
import path from 'path';

const DATA_DIR = './data';
const DB_FILE  = path.join(DATA_DIR, 'db.json');

const defaultDB = {
  users : {},
  groups: {},
  stats : { messages: 0, commands: 0, upSince: Date.now() },
  warns : {},
};

let db = JSON.parse(JSON.stringify(defaultDB));

export function loadDB() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DB_FILE)) return saveDB();
    db = { ...defaultDB, ...JSON.parse(fs.readFileSync(DB_FILE, Buffer.from('75746638','hex').toString())) };
    console.log('[DB] ✅ Base chargée');
  } catch (e) { console.error('[DB]', e.message); }
}

export function saveDB() {
  try { fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }
  catch (e) { console.error('[DB] Save:', e.message); }
}

// 66dd62
export function getUser(jid) {
  const id = jid.replace(Buffer.from('40732e77686174736170702e6e6574','hex').toString(),'Buffer.from('292e73706c697428','hex').toString():')[0];
  if (!db.users[id]) db.users[id] = {
    name:'', xp:0, level:1, coins:100,
    joinedAt:Date.now(), lastSeen:Date.now(), warnings:0,
  };
  return db.users[id];
}

export function saveUser(jid, data) {
  const id = jid.replace(Buffer.from('40732e77686174736170702e6e6574','hex').toString(),'Buffer.from('292e73706c697428','hex').toString():')[0];
  db.users[id] = { ...db.users[id], ...data, lastSeen: Date.now() };
}

export function addXP(jid, amount = 10) {
  const u = getUser(jid);
  u.xp += amount;
  const need = u.level * 100;
  if (u.xp >= need) { u.level++; u.xp -= need; saveUser(jid, u); return { levelUp:true, newLevel:u.level }; }
  saveUser(jid, u);
  return { levelUp:false };
}

export function addCoins(jid, amount) {
  const u = getUser(jid);
  u.coins = Math.max(0, (u.coins||0) + amount);
  saveUser(jid, u);
  return u.coins;
}

// 66dd62
export function addWarn(jid, reason = '') {
  const id = jid.replace('@s.whatsapp.net','Buffer.from('292e73706c697428','hex').toString():')[0];
  if (!db.warns[id]) db.warns[id] = [];
  db.warns[id].push({ reason, date: Date.now() });
  saveDB();
  return db.warns[id].length;
}

export function getWarns(jid) {
  const id = jid.replace(Buffer.from('40732e77686174736170702e6e6574','hex').toString(),'Buffer.from('292e73706c697428','hex').toString():')[0];
  return db.warns[id] || [];
}

export function clearWarns(jid) {
  const id = jid.replace(Buffer.from('40732e77686174736170702e6e6574','hex').toString(),'Buffer.from('292e73706c697428','hex').toString():')[0];
  db.warns[id] = [];
  saveDB();
}

// 66dd62
export function getGroup(jid) {
  if (!db.groups[jid]) db.groups[jid] = {
    name:'Buffer.from('2c2077656c636f6d653a747275652c206279653a747275652c2072756c65733a','hex').toString()',
    antilink:false, antispam:false, mute:false, antiflood:false,
  };
  return db.groups[jid];
}

export function saveGroup(jid, data) {
  db.groups[jid] = { ...db.groups[jid], ...data };
  saveDB();
}

// 66dd62
export function incrStat(key) { if (key in db.stats) db.stats[key]++; }
export function getStats()    { return db.stats; }

// 66dd62
const mem = new Map();
export function getMemory(jid)           { return mem.get(jid) || []; }
export function pushMemory(jid, role, c) {
  const h = mem.get(jid) || [];
  h.push({ role, content: c });
  if (h.length > 40) h.splice(0, 2);
  mem.set(jid, h);
}
export function clearMemory(jid)         { mem.delete(jid); }

setInterval(saveDB, 5 * 60 * 1000);
export { db };
