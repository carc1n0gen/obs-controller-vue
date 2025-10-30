<script setup>
const {
  is = 'div',
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  gap = '0px',
} = defineProps({
  is: String,
  direction: String,
  justify: String,
  align: String,
  gap: String,
})
</script>

<template>
  <component
    :is="is"
    :style="{
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      gap,
    }"
    class="stack"
  >
    <slot />
  </component>
</template>

<style scoped>
.stack {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}
</style>
