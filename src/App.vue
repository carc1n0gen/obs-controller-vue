<script setup>
import Controls from '#/components/Controls.vue'
import Inputs from '#/components/Inputs.vue'
import SceneItems from '#/components/SceneItems.vue'
import Scenes from '#/components/Scenes.vue'
import Setup from '#/components/Setup.vue'
import Stack from '#/components/Stack.vue'
import Toasts from '#/components/Toasts.vue'
</script>

<template>
  <Stack is="main" gap="50px">
    <Stack direction="column" gap="50px">
      <Scenes />
      <SceneItems />
    </Stack>
    <Stack direction="column" gap="50px">
      <Inputs />
      <Controls />
    </Stack>
  </Stack>
  <Setup />
  <Toasts />
</template>

<style scoped></style>
