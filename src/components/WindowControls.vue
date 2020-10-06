<template>
  <div class="flex space-x-2">
    <button class="focus:outline-none" @click="minimizeWindow">
      <!-- https://heroicons.com (minus-sm) -->
      <svg class="w-5 h-5 text-gray-500 hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
      </svg>
    </button>
    <button class="focus:outline-none" @click="closeWindow">
      <!-- https://heroicons.com (x) -->
      <svg class="w-5 h-5 text-gray-500 hover:text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'WindowControls',
  methods: {
    minimizeWindow() {
      this.$emit('minimized')
    },
    closeWindow() {
      this.$emit('closed')
    }
  }
}
</script>

<style scoped>
svg:hover {
  stroke: #4a5568
}
</style>
