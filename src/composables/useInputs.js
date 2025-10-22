import { ref } from "vue"

import useObs from "./useObs"
import { watch, log } from "../utils"

const inputs = ref([])

export default function useInputs() {
  const { obs, isConnected } = useObs()

  async function setInputMuted(inputName, inputMuted) {
    await obs.value.call('SetInputMute', {inputName, inputMuted})
    inputs.value = inputs.value.map((input) => {
      if (input.inputName === inputName) {
        return { ...input, inputMuted }
      }

      return input
    })
  }

  watch(isConnected, async () => {
    if (isConnected.value) {
      log.debug('Fetching inputs')
      const res = await obs.value.call('GetInputList')
      inputs.value = await Promise.all(res.inputs.map(async (input) => {
        try {
          const muteRes = await obs.value.call('GetInputMute', {inputName: input.inputName});
          return { ...input, inputMuted: muteRes.inputMuted };
        } catch (err) {
          return input;
        }
      }))
    }
  })

  return {
    inputs,
    setInputMuted,
  }
}
