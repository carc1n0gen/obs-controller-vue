<script setup>
import { onMounted } from 'vue'

import Stack from './components/Stack.vue'
import Scenes from './components/Scenes.vue'
import SceneItems from './components/SceneItems.vue'
import Inputs from './components/Inputs.vue'
import Controls from './components/Controls.vue'
import Toasts from './components/Toasts.vue'
import useObs from './composables/useObs'

const { connect } = useObs()

onMounted(() => {
  const obsIp = import.meta.env.VITE_OBS_IP || 'localhost'
  const obsPort = import.meta.env.VITE_OBS_PORT || '4455'
  const obsPassword = import.meta.env.VITE_OBS_PASSWORD || ''
  connect(obsIp, obsPort, obsPassword)
})
</script>

<template>
  <Stack gap="50px">
    <Stack direction="column" gap="50px">
      <Scenes />
      <SceneItems />
    </Stack>
    <Stack direction="column" gap="50px">
      <Inputs />
      <Controls />
    </Stack>
  </Stack>
  <Toasts />
</template>

<style scoped>

</style>
