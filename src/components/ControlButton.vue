<script setup>
const { state = null, disabled = false } = defineProps({
  state: String,
  disabled: Boolean,
})
</script>

<template>
  <button :disabled="disabled" :data-variant="state">
    <slot />
  </button>
</template>

<style scoped>
button {
  font-size: 12px;
  width: 100px;
  height: 100px;

  /* TODO: this will probably not work without changes */
  &.Plus {
    font-size: 32px;
  }

  &:deep(div) {
    font-size: 32px;
  }
}
</style>
