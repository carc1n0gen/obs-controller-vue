import { ref } from 'vue'

import { log, watch } from '../utils'
import useObs from './useObs'

const scenes = ref([])
const currentScene = ref(null)

export default function useScenes() {
  const { obs, isConnected } = useObs()

  async function setCurrentScene(sceneName) {
    await obs.value.call('SetCurrentProgramScene', { sceneName })
    currentScene.value = sceneName
  }

  watch(isConnected, async () => {
    if (isConnected.value) {
      log.debug('Fetching scenes')
      const sceneRes = await obs.value.call('GetSceneList')
      scenes.value = sceneRes.scenes.reverse()

      const currentSceneRes = await obs.value.call('GetCurrentProgramScene')
      currentScene.value = currentSceneRes.sceneName
    }
  })

  return {
    scenes,
    currentScene,
    setCurrentScene,
  }
}
