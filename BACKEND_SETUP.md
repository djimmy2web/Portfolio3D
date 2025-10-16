# Configuration Backend pour Vercel avec Nodemailer

## 📧 Configuration Nodemailer avec Gmail

Le backend utilise Nodemailer avec Gmail pour l'envoi d'emails.

### Configuration Gmail

1. **Activez l'authentification à 2 facteurs** sur votre compte Gmail
2. **Générez un mot de passe d'application** :
   - Allez dans Paramètres Google → Sécurité
   - Activez l'authentification à 2 facteurs
   - Générez un "Mot de passe d'application" pour "Mail"
3. **Ajoutez les variables d'environnement** dans Vercel :
   ```
   GMAIL_USER=votre_email@gmail.com
   GMAIL_PASS=votre_mot_de_passe_application
   ```

## 🚀 Déploiement sur Vercel

1. **Connectez votre repository GitHub à Vercel**
2. **Ajoutez les variables d'environnement** dans les paramètres Vercel
3. **Déployez** - Vercel détectera automatiquement les API routes

## 📁 Structure des fichiers

```
api/
├── contact.ts          # API simple (sans envoi d'email)
└── send-email.ts       # API avec envoi d'email réel
```

## 🔧 Variables d'environnement nécessaires

Ajoutez ces variables dans Vercel :

```bash
GMAIL_USER=votre_email@gmail.com
GMAIL_PASS=votre_mot_de_passe_application
```

## 📝 Test de l'API

Une fois déployé, testez avec :

```bash
curl -X POST https://votre-domaine.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "message": "Message de test"
  }'
```

## 🛠️ Développement local

Pour tester en local, créez un fichier `.env.local` :

```bash
RESEND_API_KEY=votre_api_key_ici
```

Puis lancez :
```bash
npm run dev
```
