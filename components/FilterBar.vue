<template>
  <div class="filters">
    <button
      class="filter-btn"
      :class="{ active: modelValue === 'tous' }"
      @click="emit('update:modelValue', 'tous')"
    >
      <component :is="LayoutGrid" :size="13" />
      Tous
    </button>

    <button
      v-for="cat in CATEGORIES"
      :key="cat.id"
      class="filter-btn"
      :class="{ active: modelValue === cat.id }"
      @click="emit('update:modelValue', cat.id)"
    >
      <component
        :is="cat.icon"
        :size="13"
        :style="{ color: modelValue === cat.id ? '#fff' : cat.color }"
      />
      {{ cat.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import * as lucideIcons from '@lucide/vue'
import { LayoutGrid } from '@lucide/vue'
import { CATEGORIES } from '../data/parcours'
import type { CategoryId } from '../types'

defineProps<{ modelValue: CategoryId | 'tous' }>()
const emit = defineEmits<{ 'update:modelValue': [value: CategoryId | 'tous'] }>()
</script>

<style scoped>
.filters {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--texte2);
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.filter-btn:hover {
  border-color: var(--orange);
  color: var(--orange);
}

.filter-btn.active {
  background: var(--orange);
  border-color: var(--orange);
  color: #fff;
}
</style>
