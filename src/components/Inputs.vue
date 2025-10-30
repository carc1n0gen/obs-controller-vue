<script setup>
import { computed, ref, watch } from 'vue'

import ControlButton from '#/components/ControlButton.vue'
import Modal from '#/components/Modal.vue'
import Stack from '#/components/Stack.vue'
import useInputs from '#/composables/useInputs'
import { storage } from '#/utils'

const { inputs, setInputMuted } = useInputs()
const controlledInputNames = ref(storage.get('__controlled_inputs__', []))
const showSelectionDialog = ref(false)

const controlledInputs = computed(() => {
  return inputs.value.filter((input) => controlledInputNames.value.includes(input.inputName))
})

const uncontrolledInputs = computed(() => {
  return inputs.value.filter((input) => !controlledInputNames.value.includes(input.inputName))
})

watch(controlledInputNames, () => {
  storage.set('__controlled_inputs__', controlledInputNames.value)
})

function toggleSelectionDialog() {
  showSelectionDialog.value = !showSelectionDialog.value
}

function addControlledInput(inputName) {
  controlledInputNames.value = [...controlledInputNames.value, inputName]
}

function removeControlledInput(inputName) {
  controlledInputNames.value = controlledInputNames.value.filter(
    (controlledInputName) => inputName !== controlledInputName
  )
}
</script>

<template>
  <div class="inputs">
    <h2>Audio</h2>
    <Stack gap="10px">
      <ControlButton
        v-for="input in controlledInputs"
        :state="input.inputMuted ? 'danger' : 'success'"
        @click="setInputMuted(input.inputName, !input.inputMuted)"
      >
        {{ input.inputName }}
        <div>
          <span v-if="input.inputMuted">🙉</span>
          <span v-if="!input.inputMuted">🐵</span>
        </div>
      </ControlButton>
      <ControlButton @click="toggleSelectionDialog"> + / - </ControlButton>
    </Stack>
    <Modal :is-open="showSelectionDialog" :on-close="toggleSelectionDialog" :show-close-button="true">
      <h3>Available Inputs</h3>
      <button
        v-for="input in uncontrolledInputs"
        :style="{ margin: '0 10px 10px 0' }"
        @click="addControlledInput(input.inputName)"
      >
        {{ input.inputName }}
      </button>
      <h3>Controlled Inputs</h3>
      <button
        v-for="input in controlledInputs"
        :style="{ margin: '0 10px 10px 0' }"
        @click="removeControlledInput(input.inputName)"
      >
        {{ input.inputName }}
      </button>
    </Modal>
  </div>
</template>

<style scoped></style>
