<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

const hideContents = ref(Array())
const toggleContent = (id: String | Number) => {
  if (hideContents.value.includes(id)) {
    const i = hideContents.value.indexOf(id)
    if (i !== -1) hideContents.value.splice(i, 1)
  } else {
    hideContents.value.push(id)
  }
}
</script>
<template>
  <div
    v-for="(faq, i) in data"
    :key="i"
    class="w-full"
  >
    <div
      class="bg-neutral-200/20 border border-stroke py-4 px-8 flex flex-row items-center justify-between cursor-pointer"
      @click="toggleContent(i)"
    >
      <h1 class="text-2xl text-primary-500 font-bold">
        {{ faq.name }} ({{ faq.count_content }})
      </h1>
      <div class="w-fit">
        <svg v-if="hideContents.includes(i)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M17.9197 8.17993H11.6897H6.07975C5.11975 8.17993 4.63975 9.33993 5.31975 10.0199L10.4997 15.1999C11.3297 16.0299 12.6797 16.0299 13.5097 15.1999L15.4797 13.2299L18.6897 10.0199C19.3597 9.33993 18.8797 8.17993 17.9197 8.17993Z" fill="#2953A1"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6.08001 15.8201L12.31 15.8201H17.92C18.88 15.8201 19.36 14.6601 18.68 13.9801L13.5 8.80007C12.67 7.97007 11.32 7.97007 10.49 8.80007L8.52001 10.7701L5.31001 13.9801C4.64001 14.6601 5.12001 15.8201 6.08001 15.8201Z" fill="#2953A1"/>
        </svg>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="!hideContents.includes(i)" class="p-8 space-y-4 rounded-b-xl shadow">
        <NuxtLink
          v-for="(content, j) in faq.content"
          :key="j"
          class="flex flex-row gap-2"
          :to="`/faq/${faq.id}/${content.id}`"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path opacity="0.4" d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z" fill="#2953A1"/>
            <path d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z" fill="#2953A1"/>
            <path d="M13.5 13.75H7.5C7.09 13.75 6.75 13.41 6.75 13C6.75 12.59 7.09 12.25 7.5 12.25H13.5C13.91 12.25 14.25 12.59 14.25 13C14.25 13.41 13.91 13.75 13.5 13.75Z" fill="#2953A1"/>
            <path d="M11.5 17.75H7.5C7.09 17.75 6.75 17.41 6.75 17C6.75 16.59 7.09 16.25 7.5 16.25H11.5C11.91 16.25 12.25 16.59 12.25 17C12.25 17.41 11.91 17.75 11.5 17.75Z" fill="#2953A1"/>
          </svg>
          <div>
            <h1 class="hover:underline">
              {{ content.title }}
            </h1>
            <h1 class="text-neutral-400 text-sm">
              {{ content.created_at }}
            </h1>
          </div>
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>