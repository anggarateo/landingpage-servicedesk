<script lang="ts" setup>
defineProps({
  content: {
    type: Object,
    default: null
  },
  contentFaq: {
    type: Array,
    default: null
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
  <div class="bg-white p-4 sm:px-28 py-20 flex flex-col gap-14">
    <div class="text-center">
      <h1 class="text-neutral-400 font-bold">
        {{ content?.section.toUpperCase() }}
      </h1>
      <h1 class="text-primary-500 font-bold text-4xl">
        {{ content?.title }}
      </h1>
      <h1 class="text-neutral-600 mt-4">
        {{ content?.content }}
      </h1>
    </div>
    <div class="space-y-6">
      <div
        v-for="(faq, i) in contentFaq"
        :key="i"
        class="rounded-xl border-l-4 border-secondary bg-primary p-6 text-neutral-100 space-y-6"
      >
        <div class="flex flex-row gap-2 items-center cursor-pointer" @click="toggleContent(i)">
          <div class="flex flex-col w-full">
            <h1 class="font-bold">
              {{ faq.title }}
            </h1>
          </div>
          <div class="w-fit">
            <svg v-if="hideContents.includes(i)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6.08001 15.8201L12.31 15.8201H17.92C18.88 15.8201 19.36 14.6601 18.68 13.9801L13.5 8.80007C12.67 7.97007 11.32 7.97007 10.49 8.80007L8.52001 10.7701L5.31001 13.9801C4.64001 14.6601 5.12001 15.8201 6.08001 15.8201Z" fill="white"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M17.9197 8.17993H11.6897H6.07975C5.11975 8.17993 4.63975 9.33993 5.31975 10.0199L10.4997 15.1999C11.3297 16.0299 12.6797 16.0299 13.5097 15.1999L15.4797 13.2299L18.6897 10.0199C19.3597 9.33993 18.8797 8.17993 17.9197 8.17993Z" fill="white"/>
            </svg>
          </div>
        </div>
        <Transition name="fade">
          <ChatBox
            v-if="hideContents.includes(i)"
            :value="faq.content"
            class-wrapper="bg-none"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>