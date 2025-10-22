<script setup>
import useToasts from '../composables/useToasts';

const { toasts } = useToasts()
</script>

<template>
  <div class="toasts">
    <div class="toast" v-for="toast in toasts">{{ toast.message }}</div>
  </div>
</template>

<style scoped>
.toasts {
  position: absolute;
  bottom: 25px;
  right: 25px;

  .toast {
    padding: 10px 25px;
    border-radius: 6px;
    background-color: var(--color-success);
  }
}
</style>