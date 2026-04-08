# CLAUDE.md — Site Naturopathie Marie-Laure Ebrard

## Identité du projet

Ce dépôt contient le site vitrine de Marie-Laure Ebrard, naturopathe diplômée Euronature/FENA (1200h), installée à Cestas (33). Le site remplace un ancien site WordPress hébergé chez Ionos, et sera hébergé chez OVH (hébergement Pro mutualisé).

**Domaine cible :** mlebrard-naturopathe.fr (en cours de transfert vers OVH)
**Domaine temporaire pendant la construction :** naturo.sbe33.fr (sous-domaine)
**Hébergement :** OVH Pro mutualisé, accès SSH, déploiement via rsync

## Architecture du site

```
site-naturo/
├── index.html              ← Page d'accueil
├── naturopathie.html       ← Qu'est-ce que la naturopathie
├── consultations.html      ← Types de consultations et tarifs
├── menopause.html          ← Page spécialisation ménopause (PRIORITAIRE)
├── allaitement.html        ← Ateliers allaitement (présentiel + visio)
├── contact.html            ← Contact + intégration Cal.com
├── mentions-legales.html   ← Mentions légales (OBLIGATOIRE)
├── blog/
│   ├── index.html          ← Liste des articles
│   ├── articles.json       ← Index des articles {titre, date, résumé, slug, tags}
│   └── [slug].html         ← Articles individuels
├── assets/
│   ├── css/
│   │   └── style.css       ← Styles globaux
│   ├── js/
│   │   └── main.js         ← Menu mobile, scroll, interactions
│   └── images/
│       ├── ml-portrait.jpg ← Photo portrait Marie-Laure
│       ├── cabinet/        ← Photos du cabinet
│       └── blog/           ← Images des articles
├── CLAUDE.md               ← Ce fichier
├── deploy.sh               ← Script de déploiement rsync via SSH
└── .gitignore
```

## Charte graphique

Le site précédent (WordPress/Enfold) utilisait une palette douce et naturelle. On conserve l'esprit en l'améliorant.

**Palette de couleurs :**
- Vert sauge principal : #7A9E7E (nature, santé, confiance)
- Vert foncé texte/accents : #3D5A40
- Beige chaud fond : #F5F0EB (douceur, accueil)
- Blanc cassé contenus : #FEFCF8
- Texte principal : #2C2C2C (pas de noir pur)
- Texte secondaire : #6B6B6B
- Accent chaleureux : #C4956A (terre, bois — pour boutons et liens)

**Typographies (Google Fonts) :**
- Titres : Playfair Display (élégant, féminin, professionnel)
- Corps : Source Sans 3 (lisible, moderne, accessible)

**Ton visuel :** naturel, lumineux, aéré. Beaucoup d'espace blanc. Photos chaleureuses du cabinet et de Marie-Laure. Pas de stock photos artificielles.

## Charte éditoriale / Déontologie

**RÈGLES ABSOLUES pour tout contenu du site :**

1. La naturopathie ne se substitue JAMAIS à un suivi médical. Le mentionner explicitement sur chaque page qui parle de santé.
2. Pas de diagnostic, pas de prescription, pas de promesse de résultat.
3. Pas de termes médicaux non expliqués.
4. Vocabulaire : « accompagner », « soutenir », « aider à mieux vivre » — JAMAIS « guérir », « soigner », « traiter ».
5. Ton chaleureux, professionnel, accessible. Jamais vendeur, jamais coach de vie.

## Spécialisation — Axe périménopause / ménopause

Le site doit mettre en avant la **périménopause et la ménopause** comme spécialisation principale. La périménopause (période de transition, typiquement 45-52 ans) est le moment clé où les femmes cherchent activement des réponses — c'est là que Marie-Laure intervient en priorité.

La page `menopause.html` (qui couvre périménopause ET ménopause) est une page centrale du site — elle cible les femmes de 45-55 ans avec un contenu riche sur l'accompagnement naturopathique de cette transition hormonale et émotionnelle.

Le positionnement différenciant de Marie-Laure : sa double compétence naturopathie + RH lui permet d'accompagner les femmes dans cette période de double transition (corps + carrière). Ce message peut apparaître subtilement sans être le sujet central de chaque page.

Les ateliers allaitement restent proposés (page `allaitement.html`, en présentiel et en visio) comme spécialité complémentaire. Marie-Laure conserve cette corde à son arc — c'est une compétence acquise et une source de clients via le bouche-à-oreille entre mamans. Mais ce n'est plus l'axe principal de la communication.

## Blog — Convention d'ajout d'articles

Pour ajouter un article de blog :

1. Créer le fichier `blog/[slug].html` en suivant le template des articles existants
2. Mettre à jour `blog/articles.json` en ajoutant l'entrée :
```json
{
  "slug": "nom-de-l-article",
  "title": "Titre de l'article",
  "date": "2026-04-15",
  "summary": "Résumé en 1-2 phrases pour la page listing",
  "tags": ["ménopause", "alimentation"],
  "image": "assets/images/blog/nom-image.jpg"
}
```
3. Mettre à jour `blog/index.html` si nécessaire (normalement auto-généré depuis le JSON)

Tous les articles respectent la charte éditoriale ci-dessus.

## Déploiement

```bash
# Déployer vers le serveur OVH
./deploy.sh
```

Le script `deploy.sh` utilise rsync via SSH pour copier les fichiers modifiés vers le serveur OVH. Le mot de passe SSH est stocké dans un fichier `.env` (non versionné, listé dans .gitignore).

```bash
# Contenu de deploy.sh
#!/bin/bash
source .env
rsync -avz --delete \
  --exclude '.git' \
  --exclude '.env' \
  --exclude 'CLAUDE.md' \
  --exclude 'deploy.sh' \
  --exclude '.gitignore' \
  ./ $OVH_USER@$OVH_HOST:$OVH_PATH/
```

## Références

- Site actuel à analyser : https://mlebrard-naturopathe.fr (encore en ligne chez Ionos — s'en inspirer pour le contenu et les images, améliorer le design et la structure)
- Site bilan/orientation (projet séparé) : mlebrard-evolution.fr
- Email de contact : mlebrard@sbe33.fr
- Prise de RDV : Cal.com (intégré en iframe ou lien sur la page contact)

## Workflow Marie-Laure

Marie-Laure n'est pas développeuse. Quand elle veut modifier le site, elle ouvre Claude Code dans ce dossier et demande en langage naturel. Exemples :
- « Ajoute un article de blog sur les bienfaits du magnésium pendant la ménopause »
- « Change le tarif de la première consultation à 80€ »
- « Ajoute une photo du cabinet sur la page d'accueil »
- « Déploie les modifications »

Claude Code effectue les modifications, propose de prévisualiser dans le navigateur, puis déploie si Marie-Laure valide.
