import { ref } from 'vue'
import type { GpxPoint, GpxStats } from '../types'

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function useGpx() {
  const points = ref([] as GpxPoint[])
  const stats = ref<GpxStats | null>(null)
  const loading = ref(false)
  const error = ref(false)

  async function loadGpx(path: string) {
    loading.value = true
    error.value = false
    points.value = []
    stats.value = null

    try {
      const res = await fetch(path)
      if (!res.ok) throw new Error('Fichier introuvable')

      const text = await res.text()
      const xml = new DOMParser().parseFromString(text, 'application/xml')
      const trkpts = [...xml.querySelectorAll('trkpt,rtept')]
      if (!trkpts.length) throw new Error('Aucun point GPS')

      points.value = trkpts.map(pt => ({
        lat: parseFloat(pt.getAttribute('lat') ?? '0'),
        lon: parseFloat(pt.getAttribute('lon') ?? '0'),
        ele: parseFloat(pt.querySelector('ele')?.textContent ?? '0'),
      }))

      // Calcul des stats
      let dist = 0
      let elevUp = 0
      for (let i = 1; i < points.value.length; i++) {
        const prev = points.value[i - 1]
        const curr = points.value[i]
        dist += haversine(prev.lat, prev.lon, curr.lat, curr.lon)
        const d = curr.ele - prev.ele
        if (d > 0.5) elevUp += d
      }

      stats.value = {
        distanceKm: Math.round(dist / 100) / 10,
        elevationUp: Math.round(elevUp),
        altMax: Math.round(Math.max(...points.value.map(p => p.ele))),
      }
    }
    catch {
      error.value = true
    }
    finally {
      loading.value = false
    }
  }

  function reset() {
    points.value = []
    stats.value = null
    loading.value = false
    error.value = false
  }

  return { points, stats, loading, error, loadGpx, reset }
}
