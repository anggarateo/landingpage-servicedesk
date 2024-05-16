<script lang="ts" setup>
import { useTicketStore } from '@/store/ticket'
import Highlighter from 'vue-highlight-words'

useHead({
  title: 'Beranda'
})

definePageMeta({
  alias: '/landingpage',
  components: {
    Highlighter
  }
})

const lang = ref<String>(localStorage.getItem('lang') || 'id')

const { $api, $toast, $mitt } = useNuxtApp()
$mitt.on('lang', (val: any) => {
  if (val.alias === '/landingpage') {
    lang.value = val.value
    localStorage.setItem('lang', val.value)
    getData()
  }
})
const loading = ref(false)
const landingpage = ref()
const params = ref({
  q: '',
  page: 1,
  per_page: 5
})
const keywords = ref({
  data: Array(),
  meta: {},
  links: {}
})

const getData = async () => {
  loading.value = true
  const {
    data,
    error,
    pending
  } = await $api.global.getContent({ lang: lang.value })
  if (data.value) landingpage.value = data.value.data
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  loading.value = false
}
getData()
const searching = async () => {
  loading.value = true
  const {
    data,
    error,
    pending
  } = await $api.global.searchKeyword({ lang: lang.value, ...params.value })
  if (data.value) {
    keywords.value.data.push(...data.value.data)
    keywords.value.links = data.value.links
    keywords.value.meta = data.value.meta
  }
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  loading.value = false
}

watch(() => useRoute().query, (val) => {
  if (val.search) {
    params.value.q = val.search
    keywords.value.data = []
    searching()
  }
}, {
  deep: true
})
onMounted(() => {
  const q = useRoute().query.search
  if (useRoute().query && q) {
    params.value.q = q
    keywords.value.data = []
    searching()
  }
})

const loadMore = () => {
  params.value.page += 1
  searching()
}
</script>
<template>
  <div>
    <div v-if="$route?.query?.search">
      <LandingpageLayoutHeader :name="$route?.query?.search" :search-result="keywords.meta.total || 'tidak ada'" />
      <div class="py-20 px-28 space-y-8">
        <NuxtLink
          v-for="(keyword, i) in keywords.data"
          :key="i"
          :to="keyword.is_faq ? `/faq/${keyword.service_category_id}/${keyword.id}` : '/ticket/create'"
          class="py-6 px-4 shadow rounded-lg flex flex-col gap-4 text-xs hover:bg-stroke"
          @click="keyword.is_faq ? null : useTicketStore().$patch({
            detail: {
              service_id: keyword.id,
              service_category_id: keyword.service_category_id
            }
          })"
        >
          <div class="space-y-1">
            <div class="flex flex-row gap-2">
              <img v-if="keyword.photo" :src="keyword.photo" :alt="keyword.photo" width="24" height="24">
              <img v-else src="@/assets/img/doctext.svg" alt="@/assets/img/doctext.svg" width="24" height="24">
              <Highlighter
                class="text-xl font-semibold"
                highlightClassName="bg-secondary-200"
                :searchWords="[$route.query.search]"
                :textToHighlight="keyword.name"
              />
            </div>
            <Highlighter
              class="pl-8 text-secondary-text"
              highlightClassName="bg-secondary-200"
              :searchWords="[$route.query.search]"
              :textToHighlight="keyword.category"
            />
          </div>
          <Highlighter
            class="line-clamp-2"
            highlightClassName="bg-secondary-200"
            :searchWords="[$route.query.search]"
            :textToHighlight="keyword.description"
          />
        </NuxtLink>
        <div v-if="keywords.links.next" class="flex flex-row justify-center">
          <CButton
            text="Tampilkan hasil lainnya"
            type="text"
            rounded
            @click="loadMore"
          />
        </div>
      </div>
    </div>
    <template v-else>
      <!-- <LandingpageSectionHero :content="landingpage?.data_contents.find(el => el.code === 'section_hero')" @search-keyword="params.q = $event, searching()" /> -->
      <LandingpageSectionHero :content="landingpage?.data_contents.find(el => el.code === 'section_hero')" />
      <div v-if="loading" class="py-20 px-14">
        <div class="bg-primary border-t-4 border-secondary w-full h-full rounded-3xl py-16 px-10 flex flex-row gap-6">
          <SKeleton
            v-for="i in 5"
            :key="i"
            class="w-1/5 h-80 p-4 pt-6 flex flex-col items-center rounded-xl shadow-xl"
          />
        </div>
      </div>
      <LandingpageSectionService v-else :content="landingpage?.data_contents.find(el => el.code === 'section_layanan')" :content-services="landingpage?.data_services?.filter(el => el.services.length)" />
      <LandingpageSectionAbout :content="landingpage?.data_contents.find(el => el.code === 'section_tentang')" :content-about="landingpage?.data_content_about"/>
      <LandingpageSectionFaq :content="landingpage?.data_contents.find(el => el.code === 'section_faq')" :content-faq="landingpage?.data_knowledge_base" />
      <LandingpageSectionBannerLogin :content="landingpage?.data_contents.find(el => el.code === 'section_banner_login')" />
      <LandingpageSectionReviews :content="landingpage?.rating" />
    </template>
  </div>
</template>