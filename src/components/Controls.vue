<script setup>
import { reactive, ref } from 'vue'

import ControlButton from '#/components/ControlButton.vue'
import Modal from '#/components/Modal.vue'
import Stack from '#/components/Stack.vue'
import useObs from '#/composables/useObs'
import useToasts from '#/composables/useToasts'
import { log, watch } from '#/utils'

const { obs, isConnected } = useObs()
const { showToast } = useToasts()
const showBroadcastModal = ref(false)
const showRecordingModal = ref(false)
const controls = reactive({
  broadcastActive: false,
  recordingActive: false,
  replayActive: false,
})

watch(isConnected, async () => {
  log.debug('Setting up controls')
  if (isConnected.value) {
    const broadcastRest = await obs.value.call('GetStreamStatus')
    controls.broadcastActive = broadcastRest.outputActive

    const recordingRes = await obs.value.call('GetRecordStatus')
    controls.recordingActive = recordingRes.outputActive

    const replayRes = await obs.value.call('GetReplayBufferStatus')
    controls.replayActive = replayRes.outputActive
  }
})

async function toggle(control, type) {
  const res = await obs.value.call(type)
  controls[control] = res.outputActive
}

function toggleBroadcastModal() {
  showBroadcastModal.value = !showBroadcastModal.value
}

function toggleRecordingModal() {
  showRecordingModal.value = !showRecordingModal.value
}

async function saveReplay() {
  await obs.value.call('SaveReplayBuffer')
  showToast('Replay saved')
}
</script>

<template>
  <div class="controls">
    <h2>Controls</h2>
    <Stack gap="10px">
      <ControlButton :state="controls.broadcastActive ? 'success' : 'danger'" @click="toggleBroadcastModal">
        <span v-if="controls.broadcastActive">Stop Broadcast</span>
        <span v-else>Start Broadcast</span>
        <div>📡</div>
      </ControlButton>
      <ControlButton :state="controls.recordingActive ? 'success' : 'danger'" @click="toggleRecordingModal">
        <span v-if="controls.recordingActive">Stop Recording</span>
        <span v-else>Start Recording</span>
        <div>🔴</div>
      </ControlButton>
      <ControlButton
        :state="controls.replayActive ? 'success' : 'danger'"
        @click="toggle('replayActive', 'ToggleReplayBuffer')"
      >
        <span v-if="controls.replayActive">Stop Replay</span>
        <span v-else>Start Replay</span>
        <div>🔵</div>
      </ControlButton>
      <ControlButton :disabled="!controls.replayActive" @click="saveReplay">
        Save Replay
        <div>💾</div>
      </ControlButton>
    </Stack>
    <Modal :is-open="showBroadcastModal" :on-close="toggleBroadcastModal" :show-close-button="false">
      <h2>⚠️ Attention ⚠️</h2>
      <p>
        <span v-if="controls.broadcastActive"> Are you sure you want to <strong>end</strong> the broadcast?</span>
        <span v-else> Are you sure you want to <strong>start</strong> the broadcast?</span>
      </p>
      <Stack gap="10px">
        <button @click="toggleBroadcastModal">👈 Cancel</button>
        <button
          @click="
            async () => {
              await toggle('broadcastActive', 'ToggleStream')
              toggleBroadcastModal()
            }
          "
        >
          ✅ Yes, I'm sure
        </button>
      </Stack>
    </Modal>
    <Modal :is-open="showRecordingModal" :on-close="toggleRecordingModal" :show-close-button="false">
      <h2>⚠️ Attention ⚠️</h2>
      <p>
        <span v-if="controls.recordingActive">Are you sure you want to <strong>end</strong> the recording?</span>
        <span v-else>Are you sure you want to <strong>start</strong> the recording?</span>
      </p>
      <Stack gap="10px">
        <button @click="toggleRecordingModal">👈 Cancel</button>
        <button
          @click="
            async () => {
              await toggle('recordingActive', 'ToggleRecord')
              toggleRecordingModal()
            }
          "
        >
          ✅ Yes, I'm sure
        </button>
      </Stack>
    </Modal>
  </div>
</template>

<style scoped></style>
