<script lang="ts" setup>
const props = defineProps({
  avatar: {
    type: String,
    default: null
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  textClass: {
    type: String,
    default: null
  }
})

const sizing = computed(() => {
  return `w-${props.size} h-${props.size}`
})
const textclass = computed(() => {
  return props.textClass
})
const imgError = ref(false)
</script>
<template>
  <div
    class="rounded-full"
    :class="[
      sizing,
      avatar && !imgError ? 'bg-cover bg-center' : `${textclass} bg-secondary text-neutral-100 font-semibold flex items-center justify-center`
    ]"
    :style="{ 'background-image': `url(${$config.public.apiBaseUrl.replace('/api/', '') + avatar})`}"
  >
    <h1 v-if="!avatar || imgError">
      {{ name.charAt(0).toUpperCase() }}
    </h1>
    <img hidden :src="avatar ? $config.public.apiBaseUrl.replace('/api/', '') + avatar : ''" :alt="avatar" @error="imgError = true">
  </div>
</template>