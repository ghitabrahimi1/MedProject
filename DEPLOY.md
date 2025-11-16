# Guide de Déploiement sur Vercel

## Prérequis
- Un compte GitHub/GitLab/Bitbucket
- Un compte Vercel (gratuit) : https://vercel.com

## Méthode 1 : Déploiement via l'interface Vercel (Recommandé)

### Étape 1 : Préparer le projet
1. Assurez-vous que votre code est sur GitHub/GitLab/Bitbucket
2. Si ce n'est pas le cas, créez un nouveau repository :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <URL_DE_VOTRE_REPO>
   git push -u origin main
   ```

### Étape 2 : Déployer sur Vercel
1. Allez sur https://vercel.com et connectez-vous
2. Cliquez sur **"Add New Project"**
3. Importez votre repository GitHub/GitLab/Bitbucket
4. Vercel détectera automatiquement Next.js
5. Les paramètres par défaut sont généralement corrects :
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (ou `pnpm build`)
   - **Output Directory**: `.next`
   - **Install Command**: `npm install` (ou `pnpm install`)
6. Cliquez sur **"Deploy"**

### Étape 3 : Configuration (si nécessaire)
- **Node.js Version**: 18.x ou 20.x (Vercel le détecte automatiquement)
- **Environment Variables**: Aucune nécessaire pour ce projet

## Méthode 2 : Déploiement via CLI Vercel

### Installation de Vercel CLI
```bash
npm install -g vercel
```

### Déploiement
```bash
# Dans le dossier du projet
cd "c:\Users\pc\Downloads\code (1)"

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Pour un déploiement en production
vercel --prod
```

## Vérifications Post-Déploiement

1. ✅ Vérifiez que le site charge correctement
2. ✅ Testez le formulaire de rendez-vous
3. ✅ Vérifiez le mode sombre/clair
4. ✅ Testez le changement de langue
5. ✅ Vérifiez les vidéos et images
6. ✅ Testez sur mobile

## Configuration Recommandée

### Variables d'Environnement
Aucune variable d'environnement n'est nécessaire pour ce projet.

### Build Settings
- **Build Command**: `npm run build` ou `pnpm build`
- **Output Directory**: `.next`
- **Install Command**: `npm install` ou `pnpm install`

## Notes Importantes

- Les fichiers dans `/public` sont automatiquement servis
- Les vidéos (`fifi.mp4`, `flowe.mp4`, etc.) doivent être dans `/public`
- Vercel optimise automatiquement les images Next.js
- Le site sera accessible via une URL Vercel (ex: `votre-projet.vercel.app`)

## Support

En cas de problème :
1. Vérifiez les logs de build dans le dashboard Vercel
2. Assurez-vous que tous les fichiers sont commités
3. Vérifiez que `package.json` contient le script `build`

