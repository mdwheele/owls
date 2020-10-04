<template>
    <div>
        <button @click="minimizeWindow">MIN</button>
        <button @click="closeWindow">CLS</button>
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
