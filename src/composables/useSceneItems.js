import { ref } from "vue"
import SceneItems from "../components/SceneItems.vue"
import { watch } from "../utils"
import useObs from "./useObs"
import useScenes from "./useScenes"


const sceneItems = ref([])

export default function useSceneItems() {
  const { obs, isConnected } = useObs()
  const { currentScene } = useScenes()

  async function setSceneItemEnabled(sceneName, sceneItemId, sceneItemEnabled) {
    await obs.value.call('SetSceneItemEnabled', { sceneName, sceneItemId, sceneItemEnabled });
    sceneItems.value = sceneItems.value.map((sceneItem) => {
      if (sceneItem.parentSceneName === sceneName && sceneItem.sceneItemId === sceneItemId) {
        return {...sceneItem, sceneItemEnabled};
      }

      return sceneItem;
    })
  }

  watch([isConnected, currentScene], async () => {
    if (isConnected.value && currentScene.value) {
      const res = await obs.value.call('GetSceneItemList', { sceneName: currentScene.value })
      sceneItems.value = await res?.sceneItems.reduce(async (prevP, current) => {
        const prev = await prevP
        const activeRes = await obs.value.call('GetSceneItemEnabled', { sceneName: currentScene.value, sceneItemId: current.sceneItemId })
        const sceneItem = { ...current, parentSceneName: currentScene.value, ...activeRes }

        if (current.isGroup) {
          const groupRes = await obs.value.call('GetGroupSceneItemList', { sceneName: current.sourceName })
          const groupSceneItems = groupRes.sceneItems.map((groupSceneItem) => {
            return { ...groupSceneItem, parentSceneName: sceneItem.sourceName }
          });
          return [ ...prev, sceneItem, ...groupSceneItems ]
        }

        return [ ...prev, sceneItem ]
      }, Promise.resolve([]))
    }
  })

  return {
    sceneItems,
    setSceneItemEnabled,
  }
}
