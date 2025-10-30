<script setup>
import { useTemplateRef, watch } from 'vue'

const {
  width = '480px',
  isOpen = false,
  onClose = () => {},
  showCloseButton = true,
} = defineProps({
  width: String,
  isOpen: Boolean,
  onClose: Function,
  showCloseButton: Boolean,
})

const dialog = useTemplateRef('dialog')

watch(
  [() => isOpen, dialog],
  ([isOpenValue, dialogValue]) => {
    if (isOpenValue) {
      dialogValue?.showModal()
    } else {
      dialogValue?.close()
    }
  },
  { immediate: true }
)
</script>

<template>
  <dialog ref="dialog" @cancel="onClose" :data-show-close="showCloseButton" :style="{ width }">
    <button v-if="showCloseButton" data-size="small" @click="onClose" class="close-modal-button">×</button>
    <slot />
  </dialog>
</template>

<style scoped>
dialog {
  width: 768px;
  border: none;
  background-color: #464646;

  &::backdrop {
    background-color: rgba(46, 46, 46, 0.5);
  }

  &[data-show-close='true'] {
    padding-top: 30px;
  }

  &:deep(.close-modal-button) {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
