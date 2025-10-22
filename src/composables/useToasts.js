import { ref } from "vue"


const toasts = ref([])

function showToast(message, removeAfterMs = 3000) {
  const id = new Date().toISOString();
  toasts.value = [...toasts.value, { id, message }];
  setTimeout(() => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }, removeAfterMs);
}

export default function useToasts() {
  return {
    toasts,
    showToast,
  }
}
