<template>
  <div>
    <transition 
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-100 ease-in"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
    <div v-show="isOpen" class="fixed overflow-auto inset-0 w-full flex items-center justify-center bg-semi-75 z-50">
      <transition
        enter-active-class="transition-all duration-200 ease-out"
        leave-active-class="transition-all duration-100 ease-in"
        enter-class="opacity-0 scale-90"
        enter-to-class="opacity-100 scale-100"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-90"
      >
        <div v-show="isOpen" class="transform origin-bottom absolute sm:static bottom-0 sm:bottom-auto p-4 w-full max-h-3/4 max-w-2xl">
          <div class="bg-white p-4 rounded-xl sm:rounded-lg shadow-lg" v-click-outside="handleClickOutside">
            <slot :close="close">
              <!-- Your content here -->
            </slot>
          </div>
        </div>
      </transition>
    </div>
    </transition>
    
    <div ref="activator">
      <slot name="activator" :on="on">
        <!-- Your button / activator here -->
      </slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from '@/directives/click-outside'

export default {
  directives: { ClickOutside },
  props: {
    value: {
      default: false
    }
  },
  created() {
    const onEscape = (e) => {
      if (this.isOpen && e.keyCode === 27) {
        this.close()
      }
    }

    document.addEventListener('keydown', onEscape)

    this.$once('hook:destroyed', () => {
      document.removeEventListener('keydown', onEscape)
    })
  },
  data() {
    return {
      on: {
        click: this.show,
      }
    }
  },
  computed: {
    isOpen() {
      return this.value === true
    }
  },
  methods: {
    show() {
      this.$emit('input', true)
    },

    handleClickOutside(e) {
      if (!this.$refs.activator.contains(e.target)) {
        this.close()
      }
    },

    close() {
      this.$emit('input', false)
      this.$emit('closed')
    }
  }
}
</script>