<script setup>
import { computed, ref, watch } from 'vue'

import useSceneItems from '../composables/useSceneItems'
import { storage } from '../utils'
import ControlButton from './ControlButton.vue'
import Modal from './Modal.vue'
import Stack from './Stack.vue'

const { sceneItems, setSceneItemEnabled } = useSceneItems()
const controlledSceneItemNames = ref(storage.get('__controlled_sceneItems__', []))
const showSelectedDialog = ref(false)

const controlledSceneItems = computed(() => {
  return sceneItems.value.filter((sceneItem) => controlledSceneItemNames.value.includes(sceneItem.sourceName))
})

const uncontrolledSceneItems = computed(() => {
  return sceneItems.value.filter((sceneItem) => !controlledSceneItemNames.value.includes(sceneItem.sourceName))
})

watch(controlledSceneItemNames, () => {
  storage.set('__controlled_sceneItems__', controlledSceneItemNames.value)
})

function toggleSelectionDialog() {
  showSelectedDialog.value = !showSelectedDialog.value
}

function addControlledSceneItem(sceneItemName) {
  controlledSceneItemNames.value = [...controlledSceneItemNames.value, sceneItemName]
}

function removeControlledSceneItem(sceneItemName) {
  controlledSceneItemNames.value = controlledSceneItemNames.value.filter((itemName) => sceneItemName !== itemName)
}
</script>

<template>
  <div class="scene-items">
    <h2>Scenes Items</h2>
    <Stack gap="10px">
      <ControlButton
        v-for="sceneItem in controlledSceneItems"
        :state="sceneItem.sceneItemEnabled ? 'success' : 'danger'"
        @click="setSceneItemEnabled(sceneItem.parentSceneName, sceneItem.sceneItemId, !sceneItem.sceneItemEnabled)"
      >
        {{ sceneItem.sourceName }}
      </ControlButton>
      <ControlButton @click="toggleSelectionDialog"> + / - </ControlButton>
    </Stack>
    <Modal :is-open="showSelectedDialog" :on-close="toggleSelectionDialog" :show-close-button="true">
      <h3>Available Scene Items</h3>
      <button
        v-for="sceneItem in uncontrolledSceneItems"
        :style="{ margin: '0 10px 10px 0' }"
        @click="addControlledSceneItem(sceneItem.sourceName)"
      >
        {{ sceneItem.sourceName }}
      </button>
      <h3>Controlled Scene Items</h3>
      <button
        v-for="sceneItem in controlledSceneItems"
        :style="{ margin: '0 10px 10px 0' }"
        @click="removeControlledSceneItem(sceneItem.sourceName)"
      >
        {{ sceneItem.sourceName }}
      </button>
    </Modal>
  </div>
</template>

<style scoped></style>
