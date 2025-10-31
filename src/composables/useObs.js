import OBSWebSocket from 'obs-websocket-js'
import { computed, ref } from 'vue'

import { log } from '#/utils'

const obs = ref()
const isConnected = computed(() => !!obs.value)

async function connect(ip, port, password) {
  log.debug('Setting up OBSWebsocket')
  const newObs = new OBSWebSocket()
  await newObs.connect(`ws://${ip}:${port}`, password)
  obs.value = newObs
  log.debug('OBSWebsocket connection successful')
}

export default function useObs() {
  return { obs, isConnected, connect }
}
