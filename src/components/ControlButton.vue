<script setup>
defineProps([
  'state',
  'disabled',
])
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

  &:disabled {
    background-color: rgb(46, 46, 14);
    color: grey;
    cursor: not-allowed;
  }

  /* TODO: this will probably not work without changes */
  &.Plus {
    font-size: 32px;
  }

  &:deep(div) {
    font-size: 32px;
  }
}
</style>
