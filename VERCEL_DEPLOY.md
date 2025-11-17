# 🚀 Guide de Déploiement sur Vercel - Centre Dentaire Benslimane

## 📋 Prérequis
- ✅ Repository GitHub : https://github.com/ghitabrahimi1/MedProject.git
- ✅ Compte Vercel (gratuit) : https://vercel.com/signup

## 🎯 Méthode 1 : Déploiement via Interface Web (RECOMMANDÉ)

### Étape 1 : Accéder à Vercel
1. Allez sur **https://vercel.com**
2. Cliquez sur **"Sign Up"** ou **"Log In"**
3. Connectez-vous avec votre compte **GitHub**

### Étape 2 : Importer le Projet
1. Cliquez sur **"Add New Project"** (ou **"New Project"**)
2. Dans la liste des repositories, trouvez **"ghitabrahimi1/MedProject"**
3. Cliquez sur **"Import"**

### Étape 3 : Configuration du Projet
Vercel détectera automatiquement Next.js. Les paramètres suivants seront pré-remplis :

**Configuration Automatique :**
- **Framework Preset**: Next.js ✅
- **Root Directory**: `./` (racine)
- **Build Command**: `npm run build` ou `pnpm build`
- **Output Directory**: `.next` (automatique)
- **Install Command**: `npm install` ou `pnpm install`

**⚠️ IMPORTANT - Modifier ces paramètres :**
1. Cliquez sur **"Settings"** ou **"Configure Project"**
2. Dans **"Build and Development Settings"** :
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (ou `pnpm build` si vous utilisez pnpm)
   - **Output Directory**: `.next` (laisser par défaut)
   - **Install Command**: `npm install` (ou `pnpm install`)

### Étape 4 : Variables d'Environnement
**Aucune variable d'environnement nécessaire** pour ce projet.

### Étape 5 : Déployer
1. Cliquez sur **"Deploy"**
2. Attendez 2-3 minutes que le build se termine
3. ✅ Votre site sera en ligne !

### Étape 6 : Accéder au Site
- URL de production : `https://med-project-xxx.vercel.app`
- Vous pouvez aussi ajouter un domaine personnalisé plus tard

---

## 🛠️ Méthode 2 : Déploiement via CLI Vercel

### Installation de Vercel CLI
```bash
npm install -g vercel
```

### Déploiement
```bash
# Aller dans le dossier du projet
cd "c:\Users\pc\Downloads\code (1)"

# Se connecter à Vercel
vercel login

# Déployer (première fois)
vercel

# Pour déployer en production
vercel --prod
```

---

## ✅ Vérifications Post-Déploiement

Après le déploiement, vérifiez :

1. ✅ **Page d'accueil** charge correctement
2. ✅ **Formulaire de rendez-vous** fonctionne
3. ✅ **Mode sombre/clair** fonctionne
4. ✅ **Changement de langue** (FR/EN) fonctionne
5. ✅ **Vidéos** se chargent (fifi.mp4, flowe.mp4)
6. ✅ **Images** s'affichent correctement
7. ✅ **Responsive mobile** fonctionne
8. ✅ **Navigation** entre les sections fonctionne

---

## 🔧 Configuration Technique

### Build Settings
- **Node.js Version**: 18.x ou 20.x (Vercel détecte automatiquement)
- **Package Manager**: npm ou pnpm (selon votre choix)

### Fichiers Importants
- ✅ `package.json` - Contient les scripts de build
- ✅ `next.config.mjs` - Configuration Next.js
- ✅ `/public` - Tous les fichiers statiques (vidéos, images)

### Structure du Projet
```
MedProject/
├── app/              # Pages Next.js App Router
├── components/       # Composants React
├── public/           # Fichiers statiques (vidéos, images)
├── lib/              # Utilitaires
└── package.json      # Dépendances
```

---

## 🐛 Résolution de Problèmes

### Erreur de Build
- Vérifiez les logs dans le dashboard Vercel
- Assurez-vous que `npm run build` fonctionne localement

### Vidéos ne se chargent pas
- Vérifiez que les fichiers sont dans `/public`
- Les vidéos doivent être accessibles via `/fifi.mp4`, `/flowe.mp4`, etc.

### Images ne s'affichent pas
- Vérifiez que les images sont dans `/public`
- Next.js optimise automatiquement les images

### Erreur 404
- Vérifiez que toutes les routes sont correctes
- Vérifiez le fichier `app/page.tsx`

---

## 📝 Notes Importantes

1. **Gratuit** : Le plan gratuit de Vercel est suffisant pour ce projet
2. **Déploiements automatiques** : Chaque push sur GitHub déclenche un nouveau déploiement
3. **Preview Deployments** : Chaque Pull Request crée un déploiement de prévisualisation
4. **Domaine personnalisé** : Vous pouvez ajouter votre propre domaine dans les paramètres

---

## 🔗 Liens Utiles

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentation Vercel**: https://vercel.com/docs
- **Documentation Next.js**: https://nextjs.org/docs
- **Repository GitHub**: https://github.com/ghitabrahimi1/MedProject

---

## 🎉 Félicitations !

Une fois déployé, votre site sera accessible 24/7 avec :
- ✅ HTTPS automatique
- ✅ CDN global pour des performances optimales
- ✅ Déploiements automatiques à chaque push
- ✅ Analytics intégrés (Vercel Analytics)

**Bon déploiement ! 🚀**

