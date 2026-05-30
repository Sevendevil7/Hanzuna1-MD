# 🦊 HANZUNA MD
> **Bot WhatsApp Professionnel**
> © Ⲙʀ Ꮋᴀɴᴢᴜ | Tous droits réservés | v1.0.0

---

## ⚡ Démarrage rapide

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configurer `config.json`
```json
{
  "phoneNumber"  : "50912345678",
  "anthropicKey" : "sk-ant-...",
  "deployerName" : "MonNom",
  "owner2"       : "",
  "telegramToken": ""
}
```
> `phoneNumber` = ton numéro **SANS** le `+`
> `anthropicKey` = clé sur https://console.anthropic.com (gratuit pour commencer)

### 3. Lancer
```bash
npm start
```
Un **code de jumelage** apparaît dans le terminal.
Ouvre WhatsApp → ⋮ → **Appareils connectés** → **Lier avec numéro** → entre le code.

---

## ☁️ Déploiement 24h/24

### 🚂 Railway (recommandé — gratuit)
1. Crée un compte sur [railway.app](https://railway.app)
2. New Project → **Deploy from GitHub Repo**
3. Variables → ajoute :
   - `PHONE_NUMBER` = ton numéro
   - `ANTHROPIC_API_KEY` = ta clé
4. Deploy → le bot tourne 24h/24

### 🚀 Koyeb (gratuit)
1. [koyeb.com](https://koyeb.com) → Create Service → **Archive** (upload le zip)
2. Build command : `npm install`
3. Start command  : `node index.js`
4. Variables : `PHONE_NUMBER`, `ANTHROPIC_API_KEY`
5. Deploy

### 🎨 Render (gratuit)
1. [render.com](https://render.com) → New → **Web Service**
2. Connecte GitHub ou upload
3. Build : `npm install` | Start : `node index.js`
4. Environment → ajoute les variables
5. Deploy

### 🟣 Heroku
```bash
heroku create mon-hanzuna-bot
heroku config:set PHONE_NUMBER=50912345678
heroku config:set ANTHROPIC_API_KEY=sk-ant-...
git push heroku main
```

### 🔵 Replit
1. Nouveau Repl → **Node.js**
2. Upload tous les fichiers
3. Shell : `npm install`
4. Secrets → ajoute `PHONE_NUMBER` et `ANTHROPIC_API_KEY`
5. Run

### 🖥️ VPS / Serveur dédié (Ubuntu)
```bash
# Installer Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PM2 (gestionnaire de processus)
npm install -g pm2

# Lancer Hanzuna
pm2 start index.js --name hanzuna
pm2 save
pm2 startup  # Pour redémarrage auto au boot

# Voir les logs
pm2 logs hanzuna

# Redémarrer
pm2 restart hanzuna
```

### 🐳 Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
```
```bash
docker build -t hanzuna-md .
docker run -d \
  -e PHONE_NUMBER=50912345678 \
  -e ANTHROPIC_API_KEY=sk-ant-... \
  --name hanzuna hanzuna-md
```
---

## 🔗 Liens officiels
- 📢 Canal : https://whatsapp.com/channel/0029Vb7rJU87dmegtJ1sc71Y
- 👥 Groupe : https://chat.whatsapp.com/FeOUsejZohwHT0jXUZSFAj

---

> 🦊 **HANZUNA MD** — Créée par **Ⲙʀ Ꮋᴀɴᴢᴜ**
> © Tous droits réservés. Reproduction sans autorisation interdite.

---