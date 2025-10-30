<script setup>
import OBSWebSocket from 'obs-websocket-js'
import { onMounted, ref } from 'vue'

import useObs from '../composables/useObs'
import { storage } from '../utils'
import Modal from './Modal.vue'
import Stack from './Stack.vue'

const { connect } = useObs()
const host = ref('localhost')
const port = ref('4455')
const password = ref('')
const testStatus = ref()

async function testConnection() {
  try {
    const obs = new OBSWebSocket()
    await obs.connect(`ws://${host.value}:${port.value}`, password.value)
    testStatus.value = 'success'
    await obs.disconnect()
  } catch {
    testStatus.value = 'fail'
  }
}

async function doConnect() {
  await connect(host.value, port.value, password.value)
  storage.set('__connection_details__', {
    host: host.value,
    port: port.value,
    password: password.value,
  })
}

onMounted(() => {
  const { host, port, password } = storage.get('__connection_details__', {})
  if (host && port && password) {
    connect(host, port, password)
  }
})
</script>

<template>
  <Modal is-open :show-close-button="false">
    <h2>Setup</h2>
    <p>Enter your OBS websocket connection details to continue.</p>
    <Stack direction="column" gap="5px" :style="{ margin: '0 0 20px 0' }">
      <label>Host/IP</label>
      <input type="text" v-model="host" />
    </Stack>

    <Stack direction="column" gap="5px" :style="{ margin: '0 0 20px 0' }">
      <label>Port</label>
      <input type="text" v-model="port" />
    </Stack>

    <Stack direction="column" gap="5px" :style="{ margin: '0 0 20px 0' }">
      <label>Password</label>
      <input type="password" v-model="password" />
    </Stack>
    <Stack direction="column">
      <p v-if="testStatus === 'success'">Connected successfully</p>
      <p v-if="testStatus === 'fail'">Connection failed</p>
    </Stack>
    <Stack gap="20px" :style="{ margin: '10px 0 0 0' }">
      <Stack direction="column" gap="10px">
        <button @click="testConnection()">Test connection</button>
      </Stack>
      <Stack direction="column" gap="10px">
        <button :disabled="testStatus !== 'success'" @click="doConnect">Save and connect</button>
      </Stack>
    </Stack>
  </Modal>
</template>

<style scoped></style>
