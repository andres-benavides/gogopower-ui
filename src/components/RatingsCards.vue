<template>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="item in store.ratings"
      :key="item.ticker + item.time"
      class="p-4 rounded-xl shadow border transition duration-300"
      :class="item.is_advisable ? 'bg-green-100/50 border-green-300' : 'bg-white'"
    >
      <div class="flex justify-between items-center mb-2">
        <div class="text-lg font-semibold">{{ item.company }}</div>
        <div class="text-sm text-gray-500">{{ item.ticker }}</div>
      </div>
      <div class="text-sm text-gray-600 mb-2">
        {{ item.action }} <strong>{{ item.brokerage }}</strong><br />
        <span class="text-xs">{{ formatDate(item.time) }}</span>
      </div>
      <div class="text-sm mb-2">
        🎯 <strong>{{ item.target_from }}</strong> → <strong>{{ item.target_to }}</strong><br />
        📈 <strong>{{ item.rating_from }}</strong> → <strong>{{ item.rating_to }}</strong>
      </div>
      <div class="text-right">
        <span v-if="item.is_advisable" class="text-green-600 font-bold text-xl">Advisable</span>
        <span v-else class="text-gray-300">—</span>
      </div>
    </div>
  <div class="flex justify-between mt-4">
      <button @click="store.prevPage" class="px-3 py-1 border rounded" :disabled="store.page === 1">← Previous</button>
      <span>Page {{ store.page }}</span>
      <button @click="store.nextPage" class="px-3 py-1 border rounded">Next →</button>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { useRatingsStore } from '@/stores/ratings'

const store = useRatingsStore()

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleString('en-GB', {
    timeZone: 'UTC',
    dateStyle: 'short',
    timeStyle: 'medium',
  })
}
</script>
