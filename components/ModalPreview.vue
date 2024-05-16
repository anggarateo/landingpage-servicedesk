<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'

defineProps({
  file: {
    type: Object,
    default: {
      full_path: null,
      filename: null
    }
  }
})
</script>

<template>
  <VueFinalModal
    class="flex flex-row justify-center bg-neutral-500/50"
    content-class="h-fit max-h-screen w-fit flex flex-col items-center gap-4 overflow-auto py-8"
    content-transition="vfm-fade"
    @closed="$emit('closeInfo')"
  >
    <Icon
      name="material-symbols:close"
      class="fixed text-white right-5 top-5 cursor-pointer hover:text-stroke text-2xl"
      @click="$emit('closeInfo')"
    />
    <h1 class="text-white">
      {{ file.filename }}
    </h1>
    <div class="bg-white border rounded-lg p-4">
      <embed
        :src="file.full_path" :class="{ 'w-[calc(100vw-5rem)] h-[calc(100vh-8rem)]': file.type.toLowerCase() === 'pdf' }">
    </div>
  </VueFinalModal>
</template>
