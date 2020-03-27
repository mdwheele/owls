<template>
  <Modal v-model="open">
    <template v-slot:activator="{ on }">
      <button v-on="on" type="button" class="relative inline-flex items-center py-2 pl-2 pr-3 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700">
        <svg fill="currentColor" viewBox="0 0 20 20" class="w-4 h-4 mr-2"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
        Add Environment
      </button>
    </template>

    <template v-slot="modal">
      <h3 class="text-xl mb-4">Add Environment</h3>
      
      <form @submit.prevent="handleSubmit(modal)">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm mb-1" for="name">
            Name
          </label>
          <input v-model="form.name" class="transition duration-150 appearance-none border text-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text">
        </div>
        <div class="mb-8">
          <label class="block text-gray-700 text-sm mb-1" for="ip">
            IP Address
          </label>
          <input v-model="form.ip" class="transition duration-150 appearance-none border text-sm rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ip" type="text">
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

export default {
  name: 'AddEnvironmentModal',
  components: { Modal },
  data() {
    return {
      open: false,
      form: {
        name: '',
        ip: '',
      }
    }
  },

  methods: {
    handleSubmit(modal) {
      modal.close()
      this.$emit('saved', this.form)
      this.form.name = ''
      this.form.ip = ''
    }
  }
}
</script>