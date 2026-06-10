<template>
  <div>
    <div class="map-wrap">
      <div v-if="gpx.loading.value" class="map-loading">Chargement de la trace…</div>
      <div v-else-if="!gpxPath || gpx.error.value" class="map-pending">
        <span class="pending-dot" />
        Trace GPX en cours de préparation — disponible prochainement
      </div>
      <div ref="mapEl" class="leaflet-container" />
    </div>

    <div v-if="gpx.points.value.length" class="elevation-wrap">
      <canvas ref="elevEl" />
    </div>

    <div v-if="gpx.stats.value" class="stats-row">
      <div class="stat">
        <div class="stat-val">{{ gpx.stats.value.distanceKm }} km</div>
        <div class="stat-label">Distance</div>
      </div>
      <div class="stat">
        <div class="stat-val">D+ {{ gpx.stats.value.elevationUp }} m</div>
        <div class="stat-label">Dénivelé +</div>
      </div>
      <div class="stat">
        <div class="stat-val">{{ gpx.stats.value.altMax }} m</div>
        <div class="stat-label">Point haut</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Map, LayerGroup } from 'leaflet'
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import { useGpx } from '../composables/useGpx';

const props = defineProps<{
  gpxPath: string | null
  color: string
}>()

const mapEl = ref<HTMLDivElement>()
const elevEl = ref<HTMLCanvasElement>()
const gpx = useGpx()

let leafletMap: Map | null = null
let traceLayer: LayerGroup | null = null

function drawElevation() {
  const canvas = elevEl.value
  if (!canvas || !gpx.points.value.length) return

  const W = canvas.parentElement!.offsetWidth
  const H = 80
  canvas.width = W * devicePixelRatio
  canvas.height = H * devicePixelRatio
  canvas.style.width = `${W}px`
  canvas.style.height = `${H}px`

  const ctx = canvas.getContext('2d')!
  ctx.scale(devicePixelRatio, devicePixelRatio)

  const eles = gpx.points.value.map(p => p.ele)
  const minE = Math.min(...eles)
  const maxE = Math.max(...eles)
  const range = maxE - minE || 1
  const pad = { top: 6, bottom: 6, left: 4, right: 4 }

  ctx.fillStyle = '#2e2e2e'
  ctx.fillRect(0, 0, W, H)

  const sx = (i: number) => pad.left + (i / (gpx.points.value.length - 1)) * (W - pad.left - pad.right)
  const sy = (e: number) => pad.top + (1 - (e - minE) / range) * (H - pad.top - pad.bottom)

  ctx.beginPath()
  ctx.moveTo(sx(0), H)
  gpx.points.value.forEach((p, i) => ctx.lineTo(sx(i), sy(p.ele)))
  ctx.lineTo(sx(gpx.points.value.length - 1), H)
  ctx.closePath()

  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, props.color + '88')
  grad.addColorStop(1, props.color + '11')
  ctx.fillStyle = grad
  ctx.fill()

  ctx.beginPath()
  gpx.points.value.forEach((p, i) =>
    i === 0 ? ctx.moveTo(sx(i), sy(p.ele)) : ctx.lineTo(sx(i), sy(p.ele)),
  )
  ctx.strokeStyle = props.color
  ctx.lineWidth = 2
  ctx.stroke()
}

async function initMap() {
  if (!mapEl.value || !props.gpxPath) return

  const L = (await import('leaflet')).default

  if (!leafletMap) {
    leafletMap = L.map(mapEl.value, { zoomControl: true, attributionControl: false })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 17 }).addTo(leafletMap)
    L.control.attribution({ prefix: '© OpenStreetMap' }).addTo(leafletMap)
  }
  else {
    leafletMap.invalidateSize()
  }

  if (traceLayer) {
    leafletMap.removeLayer(traceLayer)
    traceLayer = null
  }

  await gpx.loadGpx(props.gpxPath)
  if (gpx.error.value || !gpx.points.value.length) return

  const latlngs = gpx.points.value.map(p => [p.lat, p.lon] as [number, number])
  traceLayer = L.layerGroup().addTo(leafletMap)

  L.polyline(latlngs, { color: props.color, weight: 4, opacity: 0.95 }).addTo(traceLayer)
  L.circleMarker(latlngs[0], { radius: 7, fillColor: '#fff', color: props.color, weight: 3, fillOpacity: 1 })
    .bindTooltip('Départ').addTo(traceLayer)
  L.circleMarker(latlngs[latlngs.length - 1], { radius: 7, fillColor: props.color, color: '#fff', weight: 2, fillOpacity: 1 })
    .bindTooltip('Arrivée').addTo(traceLayer)

  leafletMap.fitBounds(L.polyline(latlngs).getBounds(), { padding: [20, 20] })

  await nextTick()
  drawElevation()
}

onMounted(() => {
  setTimeout(initMap, 50)
})

onUnmounted(() => {
  if (leafletMap) {
    leafletMap.remove()
    leafletMap = null
    traceLayer = null
  }
  gpx.reset()
})
</script>

<style scoped>
.map-wrap {
  position: relative;
  height: 260px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border);
  margin-bottom: 0;
}

.leaflet-container { width: 100%; height: 100%; }

.map-loading,
.map-pending {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 13px;
  color: var(--texte2);
  background: var(--noir3);
  z-index: 10;
  border-radius: 10px;
}

.pending-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--gris2);
  flex-shrink: 0;
}

.elevation-wrap {
  border-radius: 8px;
  overflow: hidden;
  background: var(--noir3);
  height: 80px;
  margin-top: 8px;
  border: 1px solid var(--border);
}

.elevation-wrap canvas { display: block; }

.stats-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
  margin-bottom: 1rem;
}
</style>
