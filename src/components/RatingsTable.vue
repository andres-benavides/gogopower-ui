<template>
  <div>
    <table class="min-w-full table-auto border rounded shadow-md bg-white">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 cursor-pointer" @click="store.setSort('company')">Company</th>
          <th class="p-2 cursor-pointer" @click="store.setSort('ticker')">Ticker</th>
          <th class="p-2">Target</th>
          <th class="p-2">Rating</th>
          <th class="p-2">Action</th>
          <th class="p-2">Brokerage</th>
          <th class="p-2 cursor-pointer" @click="store.setSort('time')">Time</th>
          <th class="p-2">Advisable</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.ratings" :key="item.ticker + item.time" class="border-t">
          <td class="p-2">{{ item.company }}</td>
          <td class="p-2">{{ item.ticker }}</td>
          <td class="p-2">{{ item.target_from }} → {{ item.target_to }}</td>
          <td class="p-2">{{ item.rating_from }} → {{ item.rating_to }}</td>
          <td class="p-2">{{ item.action }}</td>
          <td class="p-2">{{ item.brokerage }}</td>
          <td class="p-2">{{ formatDate(item.time) }}</td>
          <td class="p-2 text-center">
            <span v-if="item.is_advisable" class="text-green-600 font-bold">😄</span>
            <span v-else class="text-gray-400">—</span>
          </td>
        </tr>
      </tbody>
    </table>

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
