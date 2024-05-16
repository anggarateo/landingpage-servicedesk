<script lang="ts" setup>
useHead({ title: 'Detail FAQ' })
definePageMeta({
  alias: '/basis_pengetahuan'
})

const search = ref('')
const { $api, $toast } = useNuxtApp()
const route = useRoute()
const faqCategory = ref()
const faqDetail = ref()
const loading = ref(true)

const getData = async () => {
  const {
    data,
    error,
    pending
  } = await $api.faq.getFaq({ 'service_category_id[]': route.params.categoryId })
  if (data.value) {
    faqCategory.value = data.value.data[0]
    faqDetail.value = faqCategory.value.content.filter((el: { id: String }) => el.id === route.params.id)[0]
  }
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  loading.value = false
}
getData()
</script>
<template>
  <div>
    <LandingpageLayoutHeader name="FAQ" detail />
    <div class="p-10 lg:p-20 lg:space-y-16 md:space-y-8 space-y-4">
      <template v-if="loading">
        <SKeleton class="h-20 w-full"/>
        <div class="flex flex-row gap-16">
          <SKeleton class="h-40 w-full"/>
          <SKeleton class="hidden md:block h-40 w-1/3"/>
        </div>
      </template>
      <template v-else>
        <div class="space-y-2">
          <h1 class="text-2xl md:text-4xl text-primary-500 font-bold">
            {{ faqDetail.title }}
          </h1>
          <h1 class="text-secondary-text">
            {{ faqDetail.info }}
          </h1>
        </div>
        <div class="flex flex-col gap-8 lg:flex-row lg:gap-16">
          <ChatBox class-wrapper="py-9 px-8 space-y-8 rounded-xl shadow-lg w-full" :value="faqDetail.content" />
          <div class="flex flex-col p-8 gap-8 shadow-lg rounded-xl w-full md:w-max text-neutral-600 h-full">
            <ReInputText
              v-model="search"
              class="w-full md:w-max"
              type="text"
              placeholder="Cari FAQ"
              icon="left"
              :require="false"
            >
              <template #icon>
                <Icon name="circum:search" color="black" size="22" />
              </template>
            </ReInputText>
            <h1 class="font-semibold">
              {{ faqCategory.name }} ({{ faqCategory.count_content }})
            </h1>
            <div class="space-y-4">
              <NuxtLink
                v-for="(other, i) in faqCategory.content.filter(el => el.id !== faqDetail.id && el.title.toLowerCase().includes(search.toLowerCase()))"
                :key="i"
                class="flex flex-row gap-2 hover:underline cursor-pointer"
                :to="`/faq/${faqCategory.id}/${other.id}`"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path opacity="0.4" d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z" fill="#2953A1"/>
                  <path d="M15.7997 2.20999C15.3897 1.79999 14.6797 2.07999 14.6797 2.64999V6.13999C14.6797 7.59999 15.9197 8.80999 17.4297 8.80999C18.3797 8.81999 19.6997 8.81999 20.8297 8.81999C21.3997 8.81999 21.6997 8.14999 21.2997 7.74999C19.8597 6.29999 17.2797 3.68999 15.7997 2.20999Z" fill="#2953A1"/>
                  <path d="M13.5 13.75H7.5C7.09 13.75 6.75 13.41 6.75 13C6.75 12.59 7.09 12.25 7.5 12.25H13.5C13.91 12.25 14.25 12.59 14.25 13C14.25 13.41 13.91 13.75 13.5 13.75Z" fill="#2953A1"/>
                  <path d="M11.5 17.75H7.5C7.09 17.75 6.75 17.41 6.75 17C6.75 16.59 7.09 16.25 7.5 16.25H11.5C11.91 16.25 12.25 16.59 12.25 17C12.25 17.41 11.91 17.75 11.5 17.75Z" fill="#2953A1"/>
                </svg>
                <h1>
                  {{ other.title }}
                </h1>
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>