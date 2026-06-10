<template>
  <NuxtLink :to="`/parcours/${parcours.id}`" class="card" :style="{ borderLeftColor: cat.color }">
    <!-- Date -->
    <div class="date-block">
      <span class="date-day">{{ parcours.day }}</span>
      <span class="date-month">{{ parcours.month }}</span>
    </div>

    <!-- Infos -->
    <div class="info">
      <div class="name">{{ parcours.title }}</div>
      <div class="tags">
        <span class="tag" :style="{ background: cat.color }">
          <component :is="cat.icon" :size="11" />
          {{ cat.label }}
        </span>
        <span class="tag tag-km">{{ parcours.km }}</span>
        <span v-if="parcours.elev" class="tag tag-km">D+ {{ parcours.elev }} m</span>
      </div>
    </div>

    <ChevronRight :size="18" class="arrow" />
  </NuxtLink>
</template>

<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { computed } from 'vue';
import { CATEGORIES } from '../data/parcours'
import type { Category, Parcours } from '../types'

const props = defineProps<{ parcours: Parcours }>()
const cat = computed<Category>(() => CATEGORIES.find(c => c.id === props.parcours.cat)!)
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0.9rem 1.1rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-left: 4px solid transparent;
  border-radius: 10px;
  margin-bottom: 7px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s, background 0.15s;
}

.card:hover {
  background: var(--noir3);
  border-color: var(--orange);
}

.card:hover .arrow { color: var(--orange); }

.date-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 38px;
  background: var(--noir3);
  border-radius: 6px;
  padding: 6px 8px;
  flex-shrink: 0;
}

.date-day {
  font-size: 18px;
  font-weight: 900;
  color: var(--orange);
  line-height: 1;
}

.date-month {
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--gris3);
  margin-top: 2px;
  letter-spacing: 0.06em;
}

.info { flex: 1; min-width: 0; }

.name {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--texte);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
}

.tag-km {
  background: rgba(240, 120, 0, 0.15);
  color: var(--orange2);
}

.arrow {
  color: var(--gris2);
  flex-shrink: 0;
  transition: color 0.15s;
}
</style>
