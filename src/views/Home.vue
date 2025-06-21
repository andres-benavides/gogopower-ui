<template>
  <div class="p-4">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
      <h1 class="text-2xl font-bold">📈 Stock Ratings</h1>

      <!-- SWITCH VIEW -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-700">View as</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" class="sr-only peer" v-model="isCardView">
          <div
            class="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors"
          ></div>
          <div
            class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"
            :class="{ 'translate-x-full': isCardView }"
          ></div>
        </label>
        <span class="text-sm text-gray-700">{{ isCardView ? 'Cards' : 'Table' }}</span>
      </div>
    </div>

    <!-- MESSAGES -->
    <div v-if="store.loading" class="text-gray-600 mb-2">🔄 Loading data...</div>
    <div v-if="store.error" class="text-red-500 mb-2">{{ store.error }}</div>

    <!-- ACTIONS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <button
        @click="getBestStock"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
        :disabled="getInfo.loadingNewData || store.loading"
      >
        🌟 Best Stock
      </button>
      <button
        @click="getNewInfo"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
        :disabled="getInfo.loadingNewData"
      >
        🔄 Get New Information
      </button>
    </div>

    <!-- LOADER -->
    <div v-if="getInfo.loadingNewData" class="flex justify-center items-center min-h-[200px]">
      <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>

    <!-- TYPE VIEW-->
    <BestStockModal :open="showModal" :data="store.best" @close="showModal = false" />
    <component :is="viewComponent" v-if="!getInfo.loadingNewData" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRatingsStore } from '@/stores/ratings'
import { useGetInfo } from '@/stores/getInfo'
import RatingsTable from '@/components/RatingsTable.vue'
import RatingsCards from '@/components/RatingsCards.vue'
import BestStockModal from '@/components/BestStockModal.vue'

const store = useRatingsStore()
const getInfo = useGetInfo()

onMounted(() => {
  store.fetchRatings()
})


const showModal = ref(false)

const isCardView = ref(false)
const viewComponent = computed(() => (isCardView.value ? RatingsCards : RatingsTable))
watch(isCardView, (cardMode) => {
  if (cardMode) {
    store.fetchRatings(9)
  } else {
    store.fetchRatings()
  }
})

async function getBestStock() {
  const ok = await store.fetchBestStock()
  if (ok) showModal.value = true
  else alert('No recommendation found today.')
}

async function getNewInfo() {
  await getInfo.getAndStoreRatings()
  await store.fetchRatings()
}
</script>
