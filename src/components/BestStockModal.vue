<template>
  <div v-if="open" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
      <h2 class="text-xl font-bold mb-4">📈 Best Stock Recommendation</h2>
      <div v-if="data">
        <p><strong>Company:</strong> {{ data.rating.company }} ({{ data.rating.ticker }})</p>
        <p><strong>Target:</strong> {{ data.rating.target_from }} → {{ data.rating.target_to }}</p>
        <p><strong>Rating:</strong> {{ data.rating.rating_from }} → {{ data.rating.rating_to }}</p>
        <p><strong>Increase:</strong> {{ (data.increase_pct * 100).toFixed(2) }}%</p>
        <p><strong>date:</strong> {{ formatDate(data.rating.time) }}</p>
      </div>
      <div class="text-right mt-4">
        <button @click="$emit('close')" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils/utils'

defineProps<{
  open: boolean
  data: any
}>()
</script>
