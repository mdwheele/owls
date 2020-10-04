<template>
    <div class="flex">
        <div>
            <button class="focus:outline-none">
                <svg @click="minimizeWindow" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a0aec0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
            </button>
        </div>
        <div>
            <button class="focus:outline-none">
                <svg @click="closeWindow" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#a0aec0"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
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
