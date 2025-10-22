<script setup>
import useScenes from '../composables/useScenes'
import Stack from './Stack.vue'
import ControlButton from './ControlButton.vue'

const { scenes, currentScene, setCurrentScene } = useScenes()
</script>

<template>
  <div class="Scenes">
    <h2>Scenes</h2>
    <Stack gap="10px">
      <ControlButton 
        v-for="scene in scenes"
        :state="currentScene === scene.sceneName ? 'success' : undefined"
        @click="setCurrentScene(scene.sceneName)"
      >
        {{ scene.sceneName }}
      </ControlButton>
    </Stack>
  </div>
</template>

<style scoped>

</style>
