<script lang="ts" setup>
import { useTicketStore } from '@/store/ticket'

useHead({ title: 'Catalogues' })
definePageMeta({
  alias: '/katalog'
})

const loading = ref(true)
const catalogues = ref()
const params = ref({
  lang: '',
  q: ''
})

const { $mitt, $api, $toast } = useNuxtApp()
$mitt.on('lang', (val: any) => {
  if (val.alias === '/katalog') {
    params.value.lang = val.value
    localStorage.setItem('lang', val.value)
  }
})

const getData = async () => {
  loading.value = true
  const {
    data,
    error,
    pending
  } = await $api.catalogue.getCatalogues(params.value)
  if (data.value) catalogues.value = data.value.data
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  loading.value = false
}
getData()
</script>
<template>
  <div>
    <LandingpageLayoutHeader name="Katalog Pengaduan" search-bar="Cari layanan" @search="params.q = $event, getData()" />
    <div class="bg-white p-10 lg:p-20 space-y-16">
      <div v-if="loading" class="flex flex-row gap-6">
        <SKeleton
          class="md:hidden w-full h-80 p-4 pt-6 flex flex-col items-center rounded-xl shadow-xl"
        />
        <SKeleton
          v-for="i in 3"
          :key="i"
          class="hidden md:block md:w-1/4 lg:hidden h-80 p-4 pt-6 flex flex-col items-center rounded-xl shadow-xl"
        />
        <SKeleton
          v-for="i in 5"
          :key="i"
          class="hidden lg:block lg:w-1/5 h-80 p-4 pt-6 flex flex-col items-center rounded-xl shadow-xl"
        />
      </div>
      <template v-else>
        <div
          v-for="(catalog, i) in catalogues"
          :key="i"
          class="flex flex-col gap-10"
        >
          <h1 class="text-2xl md:text-4xl font-bold text-primary-500">
            {{ catalog.name }}
          </h1>
          <div class="flex flex-wrap gap-6">
            <div v-for="(service, i) in catalog.service" :key="i" class="w-full md:w-1/4 lg:w-1/5 h-80 p-4 pt-6 flex flex-col items-center rounded-xl shadow-xl">
              <img v-if="service.photo_url" :src="service.photo_url" :alt="service.photo_url" width="62.083" height="50">
              <img v-else src="/b-care.png" alt="Logo B-CARE" class="opacity-50">
              <h1 class="text-xl font-semibold text-center mt-3 mb-4 leading-none">
                {{ service.name }}
              </h1>
              <h1 class="text-xs text-secondary-text text-left mb-auto line-clamp-4">
                {{ service.description }}
              </h1>
              <CButton
                class="w-full mt-6"
                text="Buat Tiket"
                @click="
                  $router.push('/ticket/create'),
                  useTicketStore().$patch({
                    detail: {
                      service_id: service.id,
                      service_category_id: catalog.id
                    }
                  })
                "
              />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>