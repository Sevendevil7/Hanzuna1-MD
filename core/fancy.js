// © Ⲙʀ Ꮋᴀɴᴢᴜ | 𝗛𝗔𝗡𝗭𝗨𝗡𝗔 𝗠𝗗 | Protected
// Build: 1780048171188 | Hash: 926131574d1e0160
// Reproduction interdite sans autorisation écrite
const _ꜰkcec=()=>{};const _ᴅo74a=void 0;/* 3883d14b38d7c63c */
// 6254c060




// Majuscules → 𝖠𝖡𝖢 (Mathematical Fraktur Capital)
const UPPER_FANCY = {
  A:'𝖠',B:'𝖡',C:'𝖢',D:'𝖣',E:'𝖤',F:'𝖥',G:'𝖦',H:'𝖧',I:'𝖨',J:'𝖩',
  K:'𝖪',L:'𝖫',M:'𝖬',N:'𝖭',O:'𝖮',P:'𝖯',Q:'𝖰',R:'𝖱',S:'𝖲',T:'𝖳',
  U:'𝖴',V:'𝖵',W:'𝖶',X:'𝖷',Y:'𝖸',Z:'𝖹'
};

// Minuscules → ᴀʙᴄ (Small Caps)
const LOWER_FANCY = {
  a:'ᴀ',b:'ʙ',c:'ᴄ',d:'ᴅ',e:'ᴇ',f:'ғ',g:'ɢ',h:'ʜ',i:'ɪ',j:'ᴊ',
  k:'ᴋ',l:'ʟ',m:'ᴍ',n:'ɴ',o:'ᴏ',p:'ᴘ',q:'ǫ',r:'ʀ',s:'s',t:'ᴛ',
  u:'ᴜ',v:'ᴠ',w:'ᴡ',x:'x',y:'ʏ',z:'ᴢ'
};

// Gras WhatsApp pour titres (utilise les balises *bold*)
// Utilisé en complément du fancy

/* ab60156f */
export function fancy(text) {
  return text.split('').map(c => {
    if (UPPER_FANCY[c]) return UPPER_FANCY[c];
    if (LOWER_FANCY[c]) return LOWER_FANCY[c];
    return c;
  }).join('');
}

/* ab60156f */
export function fancyUpper(text) {
  return text.split('').map(c => UPPER_FANCY[c] || c).join('');
}

/* ab60156f */
export function fancyLower(text) {
  return text.split('').map(c => LOWER_FANCY[c] || c).join('');
}

/* ab60156f */
export function applyFancy(text) {
  // Split sur les balises pour ne pas les altérer
  return text.split(/(\*[^*]+\*|_[^_]+_|~[^~]+~|`[^`]+`|\n)/g).map(part => {
    // Si c'est une balise WhatsApp ou un saut de ligne, ne pas toucher
    if (/^(\*.*\*|_.*_|~.*~|`.*`)$/.test(part) || part === '\n') return part;
    return fancy(part);
  }).join('');
}

// 1c92fe
export const SEP = {
  line  : '─────────────────────────',
  double: '═════════════════════════',
  star  : '✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦',
  dot   : '· · · · · · · · · · · · ·',
  wave  : '〰〰〰〰〰〰〰〰〰〰〰',
};

// 1c92fe
export function header(title, emoji = '🦊') {
  const f = fancy(title.toUpperCase());
  return `${emoji} *${f}* ${emoji}`;
}

export function box(title, emoji = '🦊') {
  const f = fancy(title.toUpperCase());
  return `╭━━━━━━━━━━━━━━━━━━━━━━━╮\n┃  ${emoji}  *${f}*  ┃\n╰━━━━━━━━━━━━━━━━━━━━━━━╯`;
}
