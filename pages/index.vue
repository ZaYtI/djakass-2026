<template>
  <main class="container">
    <!-- Hero -->
    <div class="hero">
      <p class="hero-label">Cyclo Club Bruay-Labuissière · Édition 2025</p>
      <h1 class="hero-title">La Djakass</h1>
      <p class="hero-sub">Sélectionnez votre parcours pour récupérer la trace GPS</p>
    </div>

    <!-- Filtres — v-model synchro avec ?cat= dans l'URL -->
    <FilterBar v-model="activeFilter" />

    <!-- Liste groupée par catégorie -->
    <template v-for="cat in visibleCats" :key="cat.id">
      <div class="section-label">
        <component :is="cat.icon" :size="13" :style="{ color: cat.color }" />
        {{ cat.label }}
      </div>
      <ParcoursCard
        v-for="p in groupedParcours[cat.id]"
        :key="p.id"
        :parcours="p"
      />
    </template>

    <p v-if="!visibleCats.length" class="empty">Aucun parcours dans cette catégorie.</p>
  </main>
</template>

<script setup lang="ts">
import * as lucideIcons from '@lucide/vue'
import { PARCOURS, CATEGORIES } from '../data/parcours'
import type { CategoryId } from '../types'
import { useHead, useRoute, useRouter } from 'nuxt/app'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const activeFilter = computed<CategoryId | 'tous'>({
  get: () => (route.query.cat as CategoryId) || 'tous',
  set: (val) => {
    router.push({ query: val === 'tous' ? {} : { cat: val } })
  },
})

const groupedParcours = computed(() => {
  const filtered = activeFilter.value === 'tous'
    ? PARCOURS
    : PARCOURS.filter(p => p.cat === activeFilter.value)

  return Object.fromEntries(
    CATEGORIES.map(c => [c.id, filtered.filter(p => p.cat === c.id)]),
  )
})

const visibleCats = computed(() =>
  CATEGORIES.filter(c => groupedParcours.value[c.id]?.length > 0),
)

useHead({ title: 'La Djakass 2026 — Parcours GPS' })
</script>

<style scoped>
.container {
  max-width: 680px;
  margin: 0 auto;
  padding: 1.25rem 1rem;
}

.hero {
  background: var(--noir2);
  border: 1px solid var(--border);
  border-left: 4px solid var(--orange);
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -30px; right: -30px;
  width: 120px; height: 120px;
  background: var(--orange);
  opacity: 0.05;
  border-radius: 50%;
}

.hero-label {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--orange);
  margin-bottom: 8px;
}

.hero-title {
  font-size: 28px;
  font-weight: 900;
  color: var(--texte);
  margin-bottom: 4px;
  letter-spacing: -0.02em;
}

.hero-sub {
  font-size: 13px;
  color: var(--texte2);
}

.section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--gris3);
  margin: 1.25rem 0 0.6rem;
}

.section-label::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

.empty {
  text-align: center;
  padding: 2.5rem 1rem;
  color: var(--texte2);
  font-size: 14px;
}
</style>
