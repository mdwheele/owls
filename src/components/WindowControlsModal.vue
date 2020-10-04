<template>
  <Modal>
    <template v-slot:activator="{ on }">
      <slot :on="on">
        <!-- Placeholders, will use proper SVG -->
        <p @click="minimizeWindow">MIN</p>
        <p @click="maximizeWindow">MAX</p>
        <p @click="closeWindow">CLS</p>
      </slot>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  name: 'WindowControlsModal',
  components: { Modal },
  methods: {
    minimizeWindow() {
      this.$emit('minimized')
    },
    maximizeWindow() {
      this.$emit('maximized')
    },
    closeWindow() {
      this.$emit('closed')
    }
  }
}
</script>
