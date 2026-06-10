<template>
  <div>
    <p class="section-title">Ouvrir dans votre application</p>
    <div class="apps-grid">
      <a
        v-for="app in APPS_CONFIG"
        :key="app.id"
        :href="parcours[app.id as keyof typeof parcours] as string"
        target="_blank"
        rel="noopener"
        class="app-btn"
      >
        <img
          :src="app.icon"
          :alt="app.name"
          class="app-icon"
          @error="hideOnError"
        />
        <span class="app-name">{{ app.name }}</span>
        <span class="app-sub">{{ app.sub }}</span>
      </a>
    </div>

    <p class="section-title" style="margin-top: 1.25rem">Fichier GPX</p>
    <a
      class="gpx-btn"
      :class="{ disabled: !parcours.gpx }"
      :href="parcours.gpx ?? '#'"
      :download="parcours.gpx ? parcours.gpx.split('/').pop() : undefined"
    >
      <div class="gpx-icon">
        <Download :size="20" />
      </div>
      <div class="gpx-text">
        <div class="gpx-title">Télécharger le fichier GPX</div>
        <div class="gpx-sub">
          {{ parcours.gpx ? 'Compatible avec toutes les montres et applications GPS' : 'Fichier bientôt disponible' }}
        </div>
      </div>
      <ChevronRight :size="18" class="arrow" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { Download, ChevronRight } from '@lucide/vue'
import { APPS_CONFIG } from '../data/parcours'
import type { Parcours } from '../types'

defineProps<{ parcours: Parcours }>()

function hideOnError(e: Event) {
  (e.target as HTMLImageElement).style.display = 'none'
}
</script>

<style scoped>
.apps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 1rem;
}

.app-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 1rem 0.5rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s;
}

.app-btn:hover { border-color: var(--orange); }

.app-icon { width: 48px; height: 48px; border-radius: 12px; object-fit: cover; }
.app-name { font-size: 11px; font-weight: 700; text-align: center; color: var(--texte); }
.app-sub  { font-size: 10px; color: var(--texte2); text-align: center; }

.gpx-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 1rem 1.25rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s;
}

.gpx-btn:hover:not(.disabled) { border-color: var(--orange); }
.gpx-btn.disabled { opacity: 0.35; pointer-events: none; }

.gpx-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--orange);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
}

.gpx-text { flex: 1; }
.gpx-title { font-size: 14px; font-weight: 700; color: var(--texte); }
.gpx-sub   { font-size: 11px; color: var(--texte2); margin-top: 2px; }
.arrow     { color: var(--gris2); }
</style>
