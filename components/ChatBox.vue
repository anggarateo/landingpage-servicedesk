<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  position: { // left | right
    type: String,
    default: ''
  },
  files: {
    type: Array,
    default: () => []
  },
  classWrapper: {
    type: String,
    default: ''
  }
})
const content = useEditor({
  content: props.value,
  editable: false,
  extensions: [
    StarterKit,
    Underline,
    Image.configure({
      inline: true
    })
  ]
})
const wrapper = computed(() => {
  return props.classWrapper
})
</script>
<template>
  <div
    :class="[
      {
        'bg-primary-100': position === 'right',
        'bg-secondary-100': position === 'left'
      },
      wrapper ? wrapper : 'p-4 rounded-md max-w-xl text-sm space-y-2'
    ]"
  >
    <EditorContent :editor="content" />
    <div
      v-for="(file, i) in files"
      :key="i"
      class="flex flex-row gap-2 items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path opacity="0.4" d="M20.5 10.69H17.61C15.24 10.69 13.31 8.76 13.31 6.39V3.5C13.31 2.95 12.86 2.5 12.31 2.5H8.07C4.99 2.5 2.5 4.5 2.5 8.07V16.93C2.5 20.5 4.99 22.5 8.07 22.5H15.93C19.01 22.5 21.5 20.5 21.5 16.93V11.69C21.5 11.14 21.05 10.69 20.5 10.69Z" fill="#2953A1"/>
        <path d="M15.7997 2.71048C15.3897 2.30048 14.6797 2.58048 14.6797 3.15048V6.64048C14.6797 8.10048 15.9197 9.31048 17.4297 9.31048C18.3797 9.32048 19.6997 9.32048 20.8297 9.32048C21.3997 9.32048 21.6997 8.65048 21.2997 8.25048C19.8597 6.80048 17.2797 4.19048 15.7997 2.71048Z" fill="#2953A1"/>
        <path d="M11.5295 12.97L9.52945 10.97C9.51945 10.96 9.50945 10.96 9.50945 10.95C9.44945 10.89 9.36945 10.84 9.28945 10.8C9.27945 10.8 9.27945 10.8 9.26945 10.8C9.18945 10.77 9.10945 10.76 9.02945 10.75C8.99945 10.75 8.97945 10.75 8.94945 10.75C8.88945 10.75 8.81945 10.77 8.75945 10.79C8.72945 10.8 8.70945 10.81 8.68945 10.82C8.60945 10.86 8.52945 10.9 8.46945 10.97L6.46945 12.97C6.17945 13.26 6.17945 13.74 6.46945 14.03C6.75945 14.32 7.23945 14.32 7.52945 14.03L8.24945 13.31V17.5C8.24945 17.91 8.58945 18.25 8.99945 18.25C9.40945 18.25 9.74945 17.91 9.74945 17.5V13.31L10.4695 14.03C10.6195 14.18 10.8095 14.25 10.9995 14.25C11.1895 14.25 11.3795 14.18 11.5295 14.03C11.8195 13.74 11.8195 13.26 11.5295 12.97Z" fill="#2953A1"/>
      </svg>
      <NuxtLink
        :to="file.full_path"
        target="_blank"
        class="text-neutral-500 hover:underline"
      >
        <span class="text-primary-600">{{ file.filename }}</span> {{ file.size }} KB
      </NuxtLink>
    </div>
  </div>
</template>