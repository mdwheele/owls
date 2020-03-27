
export default {
  bind(el, binding, vnode) {
    el._handleOutsideClick = (e) => {
      e.stopPropagation()

      if (e.target !== el && !el.contains(e.target)) {
        const handler = binding.value

        if (typeof handler === 'function') {
          handler.bind(vnode.context)(e)
        }
      }
    }

    document.addEventListener('click', el._handleOutsideClick)
    document.addEventListener('touchstart', el._handleOutsideClick)
  },

  unbind(el) {
    if (!el._handleOutsideClick) {
      return
    }

    document.removeEventListener('click', el._handleOutsideClick)
    document.removeEventListener('touchstart', el._handleOutsideClick)

    delete el._handleOutsideClick
  }
}