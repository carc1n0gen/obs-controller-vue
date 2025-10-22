<script setup>
const {
  direction = 'row',
  gap = '0',
} = defineProps({
  direction: String,
  justify: String,
  items: String,
  gap: String,
})
</script>

<template>
  <div class="stack" :style="{flexDirection: direction, gap}">
    <slot />
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}
</style>