<template>
  <Modal v-model="open" @closed="reset">
    <template v-slot:activator="{ on }">
      <slot :on="on">
        <svg v-on="on" fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5 text-gray-500 hover:text-gray-600 cursor-pointer"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
      </slot>
    </template>

    <template v-slot="modal">
      <h3 class="text-xl mb-4">Add Project</h3>
      
      <form @submit.prevent="handleSubmit(modal)">
        <div class="mb-8">
          <label class="block text-gray-700 text-sm mb-1" for="hostname">
            Hostname
          </label>
          <input v-model="form.hostname" class="transition duration-150 appearance-none border text-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="hostname" type="text">
          <p class="text-red-700 text-sm mt-1">{{ errorMessage }}</p>
        </div>
        <div class="flex items-center justify-end">
          <button type="submit" class="relative inline-flex items-center py-2 pl-2 pr-3 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700">
            Save
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'
import { parse, getHostname } from 'tldts'


export default {
  name: 'AddProjectModal',
  components: { Modal },
  data() {
    return {
      open: false,
      form: {
        hostname: '',
      },
      errorMessage: ''
    }
  },

  methods: {
    handleSubmit(modal) {
      const result = parse(this.form.hostname)

      if (result.hostname === null) {
        this.errorMessage = 'Please enter a valid hostname.'
        return
      }
      
      this.$emit('saved', this.form)
      modal.close()
    },

    reset() {
      this.form.hostname = ''
      this.errorMessage = ''
    }
  }
}
</script>