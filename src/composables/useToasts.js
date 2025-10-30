import { ref } from 'vue'

import { sleep } from '../utils'

const toasts = ref([])

async function showToast(message, removeAfterMs = 3000) {
  const id = new Date().toISOString()
  toasts.value = [...toasts.value, { id, message }]
  await sleep(removeAfterMs)
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

export default function useToasts() {
  return {
    toasts,
    showToast,
  }
}
