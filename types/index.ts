import { LucideIcon } from '@lucide/vue'
import { Component } from 'nuxt/schema'

export type CategoryId = 'pedestre' | 'route' | 'vtt' | 'gravel' | 'raid-vtt'

export interface Category {
  id: CategoryId
  label: string
  color: string
  icon: LucideIcon
}

export interface Parcours {
  id: string
  cat: CategoryId
  day: string
  month: string
  title: string
  location: string
  km: string
  elev: number | null
  gpx: string | null
  strava: string
  garmin: string
  igp: string
}

export interface GpxStats {
  distanceKm: number
  elevationUp: number
  altMax: number
}

export interface GpxPoint {
  lat: number
  lon: number
  ele: number
}
