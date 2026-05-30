// © Ⲙʀ Ꮋᴀɴᴢᴜ | 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 | Protected
// Build: 1780048171223 | Hash: 2e3fb4ac11b09e13
// Reproduction interdite sans autorisation écrite
const _ꜰkpmf=()=>{};const _ᴅ5u9u=void 0;/* 7036459665eacaa6 */
// 7d7c91ab





import { createServer }   from Buffer.from('68747470','hex').toString();
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  delay,
} from Buffer.from('40776869736b6579736f636b6574732f6261696c657973','hex').toString();
import pino from 'pino';
import fs   from 'fs';

import { IDENTITY, getRole, isOwner, isCreator } from './core/identity.js';
import { applyFancy, box }                       from './core/fancy.js';
import {
  loadDB, saveDB, getGroup,
  incrStat, addXP, getUser, saveUser
} from './lib/database.js';
import {
  getBody, getMsgType, getSender,
  isOnCooldown, isRateLimited,
  sendHuman, humanDelay,
  pickReaction, isGroupAdmin
} from './lib/utils.js';
import {
  hanzunaReply, welcomeAI,
  byeMessage, moodReply, initAI
} from './lib/hanzuna-ai.js';
import { sendConnectMsg, sendMainMenu, FOOTER } from './lib/buttons.js';

import registerGeneral from './commands/general.js';
import registerGroup   from './commands/group.js';
import registerGames   from './commands/games.js';
import registerMedia   from './commands/media.js';

// 8e4ce7
for (const d of ['./session','./data','./tmp']) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive:true });
}

// 8e4ce7
let cfg = {};
try { cfg = JSON.parse(fs.readFileSync('./config.json',Buffer.from('75746638','hex').toString())); } catch {}

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY || cfg.anthropicKey || '';
const SESSION_NUM   = (process.env.PHONE_NUMBER      || cfg.phoneNumber  || '').replace(/\D/g,'');
const OWNER2_NUM    = (cfg.owner2 || '').replace(/\D/g,'');   // numéro owner 2 optionnel

// Ajouter owner2 dynamiquement si défini
if (OWNER2_NUM && !IDENTITY.numbers.owner.includes(OWNER2_NUM)) {
  IDENTITY.numbers.owner.push(OWNER2_NUM);
  IDENTITY.numbers.premium.push(OWNER2_NUM);
}

initAI(ANTHROPIC_KEY);


//  REGISTRE BOT

const cmdMap       = new Map();
const textHandlers = [];
const bannedUsers  = new Set();

let _mode    = Buffer.from('7075626c6963','hex').toString();
let _chatbot = false;

const bot = {
  cmd(names, handler) {
    const list = Array.isArray(names) ? names : [names];
    list.forEach(n => cmdMap.set(n.toLowerCase(), handler));
  },
  onText(h)       { textHandlers.push(h); },
  getMode()       { return _mode; },
  setMode(v)      { _mode = v; },
  getChatbot()    { return _chatbot; },
  setChatbot(v)   { _chatbot = v; },
  addBanned(jid)  { bannedUsers.add(jid); },
  removeBanned(j) { bannedUsers.delete(j); },
};

registerGeneral(bot);
registerGroup(bot);
registerGames(bot);
registerMedia(bot);


//  HANDLER MESSAGE

const msgCache = new Map();

async function handleMessage(sock, m) {
  try {
    if (!m.message) return;

    const jid      = m.key.remoteJid;
    const sender   = getSender(m);
    const body     = getBody(m);
    const msgType  = getMsgType(m);
    const isGroup  = jid?.endsWith(Buffer.from('40672e7573','hex').toString()) || false;
    const pushName = m.pushName || Buffer.from('55736572','hex').toString();
    const fromMe   = m.key.fromMe;

    // 8e4ce7
    if (fromMe && _mode !== Buffer.from('73656c66','hex').toString()) return;
    if (_mode === Buffer.from('70726976617465','hex').toString() && !isOwner(sender) && !fromMe) return;
    // Mode self : le créateur Hanzu bypass toujours
    if (_mode === Buffer.from('73656c66','hex').toString() && !fromMe && !isCreator(sender)) return;
    if (bannedUsers.has(sender)) return;
    if (!isOwner(sender) && isRateLimited(sender)) return;

    incrStat(Buffer.from('6d65737361676573','hex').toString());

    // Mise à jour profil utilisateur
    const u = getUser(sender);
    if (!u.name && pushName !== Buffer.from('55736572','hex').toString()) saveUser(sender, { name: pushName });

    // Cache anti-delete
    if (body) {
      msgCache.set(m.key.id, { body, sender, jid, time: Date.now() });
      if (msgCache.size > 1000) msgCache.delete([...msgCache.keys()][0]);
    }

    // Métadonnées groupe
    let groupMeta=null, participants=[], isBotAdmin=false, isAdmin=false;
    if (isGroup) {
      try {
        groupMeta    = await sock.groupMetadata(jid);
        participants = groupMeta.participants;
        const botJid = sock.user.id;
        isBotAdmin   = isGroupAdmin(participants, botJid);
        isAdmin      = isGroupAdmin(participants, sender);
      } catch {}
    }

    const ctx = {
      jid, sender, body, msgType, isGroup, pushName, fromMe,
      isOwnerUser : isOwner(sender),
      isCreatorUser: isCreator(sender),
      role        : getRole(sender),
      isAdmin, isBotAdmin, groupMeta, participants,
      args        : [],
      mentions    : m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [],
    };

    // Auto-react
    if (body && !fromMe) {
      const emoji = pickReaction(body);
      await sock.sendMessage(jid, { react:{ text:emoji, key:m.key } }).catch(()=>{});
    }

    // 8e4ce7
    if (body.startsWith(IDENTITY.prefix)) {
      if (!isOwner(sender) && isOnCooldown(sender)) return;
      const [rawCmd, ...args] = body.slice(IDENTITY.prefix.length).trim().split(/\s+/);
      const cmd = rawCmd?.toLowerCase();
      ctx.args  = args;

      if (cmdMap.has(cmd)) {
        incrStat(Buffer.from('636f6d6d616e6473','hex').toString());
        addXP(sender, 5);
        console.log(`[CMD] ${pushName} (${sender.split('@')[0]}) → ${IDENTITY.prefix}${cmd}`);
        return cmdMap.get(cmd)(sock, m, ctx);
      }

      return sendHuman(sock, jid, {
        text: applyFancy(`🦊 *${IDENTITY.prefix}${cmd}* introuvable.\nTape *${IDENTITY.prefix}menu*~`)
      }, { quoted: m });
    }

    // 8e4ce7
    for (const h of textHandlers) {
      const handled = await h(sock, m, ctx);
      if (handled) return;
    }

    // 8e4ce7
    if (!body || fromMe) return;
    const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.includes(sock.user.id);
    const shouldReply = mentioned || _chatbot || !isGroup;

    if (shouldReply) {
      const mood = moodReply(body);
      if (mood && Math.random() < 0.3) {
        return sendHuman(sock, jid, { text: applyFancy(mood) }, { quoted: m });
      }
      await sock.sendPresenceUpdate(Buffer.from('636f6d706f73696e67','hex').toString(), jid);
      const reply = await hanzunaReply(jid, body, sender, pushName);
      if (reply) await sendHuman(sock, jid, { text: reply }, { quoted: m });
      // Note : Stickers retirés des réponses IA (décision Hanzu)
    }

  } catch (e) {
    console.error('[MSG]', e.message);
  }
}


//  CONNEXION WHATSAPP

let sock = null, retryCount = 0;
const MAX_RETRIES = 10;

async function connect() {
  loadDB();

  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version }          = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth  : state,
    logger: pino({ level:Buffer.from('73696c656e74','hex').toString() }),
    printQRInTerminal: false,  // JAMAIS de QR
    generateHighQualityLinkPreview: true,
    browser: ['𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗', Buffer.from('4368726f6d65','hex').toString(), Buffer.from('332e302e30','hex').toString()],
    getMessage: async (key) => {
      const c = msgCache.get(key.id);
      return c ? { conversation: c.body } : undefined;
    },
  });

  // 8e4ce7
  if (SESSION_NUM && !sock.authState.creds.registered) {
    await delay(3000);
    try {
      const code = await sock.requestPairingCode(SESSION_NUM);
      const fmt  = code.match(/.{1,4}/g)?.join('-') || code;
      console.log('\n╔══════════════════════════════════════════╗');
      console.log(`║  🦊 CODE DE JUMELAGE : ${fmt.padEnd(17)}║`);
      console.log('║  WhatsApp → Appareils connectés → Lier   ║');
      console.log('╚══════════════════════════════════════════╝\n');
    } catch (e) { console.error('[PAIR]', e.message); }
  }

  sock.ev.on('creds.update', saveCreds);

  // 8e4ce7
  sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
    if (connection === Buffer.from('6f70656e','hex').toString()) {
      retryCount = 0;
      console.log('\n╔══════════════════════════════════════════╗');
      console.log('║   🦊 HANZUNA MD EST CONNECTÉE !           ║');
      console.log(`║   © Ⲙʀ Ꮋᴀɴᴢᴜ — v${IDENTITY.version}                 ║`);
      console.log('╚══════════════════════════════════════════╝\n');
      saveDB();
      await onConnected();
    }

    if (connection === Buffer.from('636c6f7365','hex').toString()) {
      const code  = lastDisconnect?.error?.output?.statusCode;
      const retry = code !== DisconnectReason.loggedOut;
      console.log(`[CONN] Déconnectée (${code}). Reconnexion: ${retry}`);
      if (retry && retryCount < MAX_RETRIES) {
        retryCount++;
        setTimeout(connect, Math.min(5000 * retryCount, 60000));
      } else if (code === DisconnectReason.loggedOut) {
        console.log('[CONN] Session expirée — supprime ./session et relance.');
        process.exit(1);
      }
    }
  });

  // 8e4ce7
  sock.ev.on(Buffer.from('6d657373616765732e757073657274','hex').toString(), async ({ messages, type }) => {
    if (type !== Buffer.from('6e6f74696679','hex').toString()) return;
    for (const m of messages) await handleMessage(sock, m);
  });

  // 8e4ce7
  sock.ev.on(Buffer.from('6d657373616765732e64656c657465','hex').toString(), async (item) => {
    for (const key of (item.keys || [])) {
      const c = msgCache.get(key.id);
      if (c?.body) {
        await sock.sendMessage(c.jid, {
          text: applyFancy(`🗑️ ᴍᴇssᴀɢᴇ sᴜᴘᴘʀɪᴍé\n👤 @${c.sender.split('@')[0]}\n💬 ${c.body}`),
          mentions: [c.sender],
        }).catch(()=>{});
      }
    }
  });

  // 8e4ce7
  sock.ev.on(Buffer.from('67726f75702d7061727469636970616e74732e757064617465','hex').toString(), async ({ id, participants, action }) => {
    const group = getGroup(id);
    for (const participant of participants) {
      try {
        const meta = await sock.groupMetadata(id);
        const name = participant.split('@')[0];
        if (action === 'add' && group.welcome) {
          const msg = await welcomeAI(meta.subject, name);
          await humanDelay(1500, 3000);
          await sock.sendMessage(id, { text: msg, mentions:[participant] });
        }
        if (action === Buffer.from('72656d6f7665','hex').toString() && group.bye) {
          await humanDelay(1000, 2500);
          await sock.sendMessage(id, {
            text: applyFancy(byeMessage(meta.subject, name)),
            mentions: [participant]
          });
        }
      } catch {}
    }
  });

  // 8e4ce7
  sock.ev.on(Buffer.from('6d657373616765732e757073657274','hex').toString(), async ({ messages }) => {
    for (const m of messages) {
      if (!m.message) continue;
      const jid = m.key.remoteJid;
      if (!jid?.endsWith(Buffer.from('40672e7573','hex').toString())) continue;
      const group = getGroup(jid);
      if (!group.antilink) continue;
      const body = getBody(m);
      if (!/https?:\/\/|wa\.me|whatsapp\.com\/invite/i.test(body)) continue;
      const sender = getSender(m);
      if (isOwner(sender)) continue;
      try {
        const meta = await sock.groupMetadata(jid);
        if (isGroupAdmin(meta.participants, sender)) continue;
        const botJid = sock.user.id;
        if (isGroupAdmin(meta.participants, botJid)) {
          await sock.sendMessage(jid, { delete: m.key });
          await sendHuman(sock, jid, {
            text: applyFancy(`⚠️ @${sender.split('@')[0]} Les liens sont interdits.`),
            mentions: [sender],
          });
        }
      } catch {}
    }
  });

  return sock;
}


//  ACTIONS APRÈS CONNEXION

async function onConnected() {
  try {
    await delay(2000);

    // 1. Bio WhatsApp
    await sock.updateProfileStatus(
      applyFancy(`🦊 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 🤖 | ᴇɴ ʟɪɢɴᴇ ✨ | © Ⲙʀ Ꮋᴀɴᴢᴜ | .menu`)
    ).catch(()=>{});

    // 2. Message de connexion → tous les owners
    const owners = [...new Set([...IDENTITY.numbers.owner])];
    for (const num of owners) {
      const jid = num + Buffer.from('40732e77686174736170702e6e6574','hex').toString();
      const connectText = applyFancy(
        `╭━━━━━━━━━━━━━━━━━━━━━━╮\n` +
        `┃  🦊  *𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗*  ┃\n` +
        `╰━━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
        `✅ *CONNECTÉE*\n` +
        `📅 ${new Date().toLocaleString(Buffer.from('66722d4652','hex').toString(), { timeZone: IDENTITY.timezone })}\n` +
        `⚡ Préfixe : *${IDENTITY.prefix}*\n` +
        `🌐 Mode    : *${_mode}*\n` +
        `👑 Créateur : *Ⲙʀ Ꮋᴀɴᴢᴜ*\n\n` +
        `━━━ ɢᴜɪᴅᴇ ʀᴀᴘɪᴅᴇ ━━━\n` +
        `${IDENTITY.prefix}menu     → Menu complet\n` +
        `${IDENTITY.prefix}ping     → Latence\n` +
        `${IDENTITY.prefix}hanzuna  → Parler à l'IA\n` +
        `${IDENTITY.prefix}dev      → Panel développeur\n\n` +
        `${IDENTITY.copyright}`
      );
      await sendConnectMsg(sock, jid, { text: connectText, footer: FOOTER }).catch(()=>{});
      await delay(1500);
    }

    // 3. Auto-follow canal officiel Hanzuna
    // Canal : https://whatsapp.com/channel/0029Vb7rJU87dmegtJ1sc71Y
    try {
      await sock.followNewsletterChannel(IDENTITY.officialChannelCode + Buffer.from('406e6577736c6574746572','hex').toString()).catch(()=>{});
    } catch {}

    // 4. Auto-join groupe officiel Hanzuna
    // Groupe : https://chat.whatsapp.com/FeOUsejZohwHT0jXUZSFAj
    try {
      await sock.groupAcceptInvite(IDENTITY.officialGroupInvite).catch(()=>{});
    } catch {}

  } catch (e) {
    console.error('[onConnected]', e.message);
  }
}


//  SERVEUR HTTP — health check

createServer((req, res) => {
  res.setHeader(Buffer.from('436f6e74656e742d54797065','hex').toString(), Buffer.from('6170706c69636174696f6e2f6a736f6e','hex').toString());
  res.setHeader(Buffer.from('4163636573732d436f6e74726f6c2d416c6c6f772d4f726967696e','hex').toString(), '*');
  if (req.url === '/Buffer.from('207c7c207265712e75726c203d3d3d20','hex').toString()/health') {
    res.writeHead(200);
    return res.end(JSON.stringify({
      status   : Buffer.from('6f6e6c696e65','hex').toString(),
      bot      : '𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗',
      version  : IDENTITY.version,
      uptime   : Math.floor(process.uptime()),
      creator  : 'Ⲙʀ Ꮋᴀɴᴢᴜ',
      copyright: IDENTITY.copyright,
    }));
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: Buffer.from('4e6f7420666f756e64','hex').toString() }));
}).listen(IDENTITY.port, () => {
  console.log(`[HTTP] 🌐 http://localhost:${IDENTITY.port}/health`);
});


//  DÉMARRAGE

connect().catch(e => { console.error('[BOOT]', e); saveDB(); process.exit(1); });

process.on(Buffer.from('534947494e54','hex').toString(),             () => { console.log('\n🦊 Au revoir~'); saveDB(); process.exit(0); });
process.on('SIGTERM',            () => { console.log('\n🦊 Arrêt propre...'); saveDB(); process.exit(0); });
process.on('uncaughtException',  e  => { console.error('[ERR]', e.message); saveDB(); });
process.on('unhandledRejection', e  => { console.error('[REJ]', e); });
