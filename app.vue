<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'

const config = useRuntimeConfig()

useHead({
  titleTemplate: '%s - ' + config.public.title
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="4" color="#FCB700" />
    
    <NuxtPage />
    
    <ModalsContainer />
  </NuxtLayout>
</template>
