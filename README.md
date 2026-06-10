# La Djakass 2025

Site de partage des traces GPS pour l'événement du Cyclo Club Bruay-Labuissière.

## Stack

- **Nuxt 3** — framework Vue avec routing automatique par fichiers
- **TypeScript** — typage strict
- **Leaflet** — carte interactive (chargée côté client uniquement)
- **Lucide Vue Next** — icônes SVG cohérentes cross-platform

## Démarrage

```bash
npm install
npm run dev
```

## Structure

```
pages/
  index.vue              → liste des parcours (?cat=route filtre par catégorie)
  parcours/[id].vue      → détail d'un parcours avec carte GPX

components/
  AppHeader.vue          → barre de navigation
  FilterBar.vue          → filtres par catégorie (v-model)
  ParcoursCard.vue       → carte cliquable dans la liste
  GpxMap.vue             → carte Leaflet + profil altimétrique
  AppsBtns.vue           → boutons Strava / Garmin / iGPSport + téléchargement GPX

composables/
  useGpx.ts              → fetch + parse du fichier GPX, calcul distance/dénivelé

data/
  parcours.ts            → toutes les données (parcours + catégories + apps)
                           👈 C'est ici que tu remplis tes vrais liens et dénivelés

types/
  index.ts               → interfaces TypeScript

public/assets/
  gpx/road/              → fichiers DJAKASS_40/60/80_2K26.gpx
  icons/                 → djakass.png, strava.png, garmin.png, igp.png
```

## Remplir les données

Tout se passe dans `data/parcours.ts` :

1. **Liens** — remplace `XXXXXXX` dans `strava`, `garmin`, `igp` par tes vrais IDs
2. **Dénivelé** — ajoute le `elev` (nombre en mètres) copié depuis Strava
3. **GPX manquants** — quand un fichier est prêt, renseigne le chemin dans `gpx`

## URLs QR codes

| QR code    | URL                       |
|------------|---------------------------|
| Tous       | `/`                       |
| Pédestre   | `/?cat=pedestre`          |
| Route      | `/?cat=route`             |
| VTT/VAE    | `/?cat=vtt`               |
| Gravel     | `/?cat=gravel`            |
| Raid VTT   | `/?cat=raid-vtt`          |
