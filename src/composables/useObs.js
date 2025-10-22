import OBSWebSocket from "obs-websocket-js"
import { ref } from "vue"

import { log } from "../utils"

const obs = ref()
const isConnected = ref(false)

async function connect(ip, port, password) {
  log.debug('Setting up OBSWebsocket')
  const newObs = new OBSWebSocket()
  newObs.connect(`ws://${ip}:${port}`, password).then(() => {
    obs.value = newObs
    isConnected.value = true
    log.debug('OBSWebsocket connection successful')
  })
}

export default function useObs() {
  return { obs, isConnected, connect }
}