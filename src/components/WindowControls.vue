<template>
    <div>
        <svg @click="minimizeWindow" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
        <svg @click="closeWindow" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
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
