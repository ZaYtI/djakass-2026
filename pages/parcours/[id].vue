<template>
  <main class="container">
    <!-- Retour -->
    <NuxtLink :to="backUrl" class="back-btn">
      <ChevronLeft :size="16" />
      Tous les parcours
    </NuxtLink>

    <!-- Parcours non trouvé -->
    <div v-if="!parcours" class="not-found">Parcours introuvable.</div>

    <template v-else>
      <!-- En-tête -->
      <div class="parcours-header">
        <!-- Badge catégorie -->
        <span class="cat-badge" :style="{ background: cat.color }">
          <component :is="cat.icon" :size="12" />
          {{ cat.label }}
        </span>

        <h1 class="parcours-title">{{ parcours.title }}</h1>

        <p class="parcours-location">
          <MapPin :size="13" style="vertical-align: -2px; margin-right: 4px" />
          {{ parcours.location }}
        </p>

        <!-- Stats statiques (depuis les données) -->
        <div v-if="parcours.km || parcours.elev" class="stats-row">
          <div class="stat">
            <div class="stat-val">{{ parcours.km }}</div>
            <div class="stat-label">Distance</div>
          </div>
          <div v-if="parcours.elev" class="stat">
            <div class="stat-val">D+ {{ parcours.elev }} m</div>
            <div class="stat-label">Dénivelé</div>
          </div>
        </div>

        <!-- Carte GPX + profil + stats calculées -->
        <GpxMap :gpx-path="parcours.gpx" :color="cat.color" />
      </div>

      <!-- Boutons applis + téléchargement -->
      <AppsBtns :parcours="parcours" />
    </template>
  </main>
</template>

<script setup lang="ts">
import * as lucideIcons from '@lucide/vue'
import { ChevronLeft, MapPin } from '@lucide/vue'
import { PARCOURS, CATEGORIES } from '../../data/parcours'
import { useHead, useRoute } from 'nuxt/app'
import { computed } from 'vue'

const route = useRoute()
const id = computed(() => route.params.id as string)

const parcours = computed(() => PARCOURS.find(p => p.id === id.value) ?? null)
const cat = computed(() => CATEGORIES.find(c => c.id === parcours.value?.cat)!)

// Lien retour qui conserve le filtre de catégorie
const backUrl = computed(() =>
  parcours.value ? `/?cat=${parcours.value.cat}` : '/',
)

useHead(() => ({
  title: parcours.value ? `${parcours.value.title} — La Djakass 2026` : 'La Djakass 2026',
}))
</script>

<style scoped>
.container {
  max-width: 680px;
  margin: 0 auto;
  padding: 1.25rem 1rem;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: var(--orange);
  text-decoration: none;
  margin-bottom: 1.25rem;
  letter-spacing: 0.02em;
}

.back-btn:hover { text-decoration: underline; }

.not-found {
  text-align: center;
  padding: 3rem;
  color: var(--texte2);
}

.parcours-header {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
}

.cat-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 10px;
  letter-spacing: 0.05em;
}

.parcours-title {
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 5px;
  color: var(--texte);
}

.parcours-location {
  font-size: 12px;
  color: var(--texte2);
  margin-bottom: 14px;
}

.stats-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}
</style>
