import { Bike, Footprints, MountainSnow, Route, Trophy } from '@lucide/vue'
import type { Category, Parcours } from '../types'

export const CATEGORIES: Category[] = [
  { id: 'pedestre',  label: 'Pédestre', color: '#52c77a', icon: Footprints },
  { id: 'route',     label: 'Route',    color: '#2d8fef', icon: Bike },
  { id: 'vtt',       label: 'VTT/VAE',  color: '#e03a3a', icon: MountainSnow },
  { id: 'gravel',    label: 'Gravel',   color: '#f07800', icon: Route },
  { id: 'raid-vtt',  label: 'Raid VTT', color: '#b44aff', icon: Trophy },
]

export const APPS_CONFIG = [
  { id: 'strava', name: 'Strava',        sub: 'Segments & clubs', icon: '/icons/strava.png' },
  { id: 'garmin', name: 'Garmin Connect', sub: 'Montres Garmin',   icon: '/icons/garmin.png' },
  { id: 'igp',    name: 'iGPSport',       sub: 'Compteur GPS',     icon: '/icons/igp.png' },
] as const

const BASE_LOCATION = 'Stade de Lavolville, Rue de la Lawe, Bruay-la-Buissière'
const BASE_DATE = { day: '28', month: 'Juin' }

const mkParcours = (
  id: string,
  cat: Parcours['cat'],
  title: string,
  km: string,
  gpx: string | null,
  elev: number | null = null,
  stravaId?:string,
  garminId?:string,
  igpId?:string
): Parcours => ({
  id,
  cat,
  ...BASE_DATE,
  title,
  location: BASE_LOCATION,
  km,
  elev,
  gpx,
  strava: `https://www.strava.com/routes/${stravaId}`,
  garmin: `https://connect.garmin.com/modern/course/${garminId}`,
  igp:    `https://analyse.en.igpsport.com/new/my/road/book/share?routeId=${igpId}&language=fr`,
})

export const PARCOURS: Parcours[] = [
  // ── Pédestre ──────────────────────────────────────────
  mkParcours('pedestre-10', 'pedestre', 'Rando pédestre 10 km', '10 km', '/gpx/walk/Marche_10_KM_2026.gpx',null,undefined,undefined,'3615087'),
  mkParcours('pedestre-20', 'pedestre', 'Rando pédestre 20 km', '20 km', '/gpx/walk/Marche_22_KM_2026.gpx',null,undefined,undefined,'3650089'),
  mkParcours('pedestre-30', 'pedestre', 'Rando pédestre 30 km', '30 km', null),

  // ── Route ─────────────────────────────────────────────
  mkParcours('route-40', 'route', 'Rando route 40 km', '40 km', '/gpx/road/DJAKASS_40_2K26.gpx',null,undefined,undefined,'3615028'),
  mkParcours('route-60', 'route', 'Rando route 60 km', '60 km', '/gpx/road/DJAKASS_60_2K26.gpx',null,undefined,undefined,'3615024'),
  mkParcours('route-80', 'route', 'Rando route 80 km', '80 km', '/gpx/road/DJAKASS_80_2K26.gpx',null,undefined,undefined,'3615022'),
  // ── VTT / VAE ─────────────────────────────────────────
  mkParcours('vtt-30', 'vtt', 'Rando VTT/VAE 30 km', '30 km', '/gpx/vtt/VTT_2026_30_KM_CCBL.gpx'),
  mkParcours('vtt-37', 'vtt', 'Rando VTT/VAE 37 km', '37 km', '/gpx/vtt/VTT_2026_37_KM_CCBL.gpx'),
  mkParcours('vtt-43', 'vtt', 'Rando VTT/VAE 43 km', '43 km', '/gpx/vtt/VTT_2026_43_KM_CCBL.gpx'),
  mkParcours('vtt-62', 'vtt', 'Rando VTT/VAE 62 km', '62 km', '/gpx/vtt/VTT_2026_62_KM_CCBL.gpx'),

  // ── Gravel ────────────────────────────────────────────
  mkParcours('gravel-95',  'gravel', 'Raid Gravel 95 km',  '95 km',  '/gpx/gravel/Sortie_Gravel_95_KM_CCBL.gpx'),
  mkParcours('gravel-160', 'gravel', 'Raid Gravel 160 km', '160 km', '/gpx/gravel/Sortie_Gravel_160_KM_CCBL.gpx'),

  // ── Raid VTT / VAE ────────────────────────────────────
  mkParcours('raid-vtt-85',  'raid-vtt', 'Raid VTT/VAE 85 km',  '85 km',  '/gpx/road/DJAKASS_85_2K26.gpx'),
  mkParcours('raid-vtt-110', 'raid-vtt', 'Raid VTT/VAE 110 km', '110 km', '/gpx/road/DJAKASS_110_2K26.gpx'),
  mkParcours('raid-vtt-137', 'raid-vtt', 'Raid VTT/VAE 137 km', '137 km', '/gpx/road/DJAKASS_137_2K26.gpx'),
]
