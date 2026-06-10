<template>
  <header>
    <NuxtLink to="/" class="header-brand">
      <img
        src="/icons/djakass.png"
        alt="Les D'Jakass"
        class="header-logo"
        @error="hideOnError"
      />
      <span class="header-title">La Djakass</span>
    </NuxtLink>
    <span class="header-date">28 juin 2025</span>
  </header>
</template>

<script setup lang="ts">
function hideOnError(e: Event) {
  (e.target as HTMLImageElement).style.display = 'none'
}
</script>

<style scoped>
header {
  background: var(--noir2);
  border-bottom: 2px solid var(--orange);
  padding: 0.9rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.header-logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.header-title {
  font-size: 17px;
  font-weight: 800;
  color: var(--texte);
  letter-spacing: 0.02em;
}

.header-date {
  font-size: 12px;
  color: var(--orange2);
  font-weight: 600;
  white-space: nowrap;
}
</style>
