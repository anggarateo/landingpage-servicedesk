<script lang="ts" setup>
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useTicketStore } from '@/store/ticket'

defineComponent({
  Carousel,
  Slide,
  Navigation
})

const props = defineProps({
  content: {
    type: Object,
    default: null
  },
  contentServices: {
    type: Array,
    default: null
  }
})

const slides = ref([
  ...props.contentServices,
  {
    category: 'Lapor',
    title: 'Layanan Aspirasi dan Pengaduan Online Rakyat',
    description: 'Sampaikan laporan Anda langsung kepada instansi pemerintah berwenang',
    services: []
  }
])
const carousel = ref()
const widthScreen = ref(window.innerWidth)
const shownChild = ref(
  slides.value[0].services.length >= 5 && widthScreen.value < 1028
    ? 1.35 : slides.value[0].services.length >= 5
      ? 4.25 : slides.value[0].services.length
)

const sliding = (data: any) => {
  if (slides.value[data.slidingToIndex].services.length && slides.value[data.slidingToIndex].services.length + slides.value[data.slidingToIndex + 1].services.length <= 4 && slides.value[data.slidingToIndex + 1].services.length) {
    if (
      slides.value[data.slidingToIndex].services.length >= 5 || !slides.value[data.slidingToIndex].services.length ||
      slides.value[data.slidingToIndex + 1].services.length >= 5 || !slides.value[data.slidingToIndex + 1].services.length
      ) {
      shownChild.value = widthScreen.value < 1280 ? 1.35 : 4.25
    } else {
      shownChild.value = slides.value[data.slidingToIndex].services.length > 1 && widthScreen.value < 1280
        ? 1.35 : 1
    }
  } else {
    if (slides.value[data.slidingToIndex].services.length >= 5 || !slides.value[data.slidingToIndex].services.length) {
      shownChild.value = widthScreen.value < 1280 ? 1.35 : 4.25
    } else {
      shownChild.value = slides.value[data.slidingToIndex].services.length > 1 && widthScreen.value < 1280
        ? 1.35 : 1
    }
  }
}

function lapor () {
  window.open('https://www.lapor.go.id/', '_blank')
}

// function handleResize () {
//   widthScreen.value = window.innerWidth
// }

// onBeforeMount(() => {
//   window.addEventListener('resize', handleResize)
// })
// onMounted(() => {
//   if (widthScreen.value < 1028) {
//     shownChild.value = 1
//   }
//   console.log('ws', widthScreen.value)
//   console.log('sc', shownChild.value)
// })
// onUnmounted(() => {
//   window.removeEventListener('resize', handleResize)
// })

// watch(() => widthScreen.value, (val) => {
//   console.log('val', val)
//   if (val < 1028) {
//     shownChild.value = 1
//   }
// })
</script>
<template>
  <div class="bg-white py-4 sm:p-10 md:py-20 md:px-14 flex flex-col gap-10">
    <div class="text-center px-2">
      <h1 class="text-neutral-400 font-bold">
        {{ content?.section.toUpperCase() }}
      </h1>
      <h1 class="text-primary-500 font-bold text-4xl">
        {{ content?.title }}
      </h1>
    </div>
    <Carousel
      ref="carousel"
      :mouse-drag="false"
      :touch-drag="false"
      @slide-start="sliding"
    >
      <Slide v-for="(slide, i) in slides" :key="i" class="px-10">
        <div
          v-if="slide.category === 'Lapor'"
          style="background-image: url('/landingpage/bg-lapor.png')"
          class="p-16 space-y-8 text-white bg-cover bg-center rounded-3xl text-left"
        >
          <img src="/landingpage/icon-lapor.png" alt="Logo Lapor.go.id">
          <h1 class="font-bold text-4xl">
            {{ slide.title }}
          </h1>
          <h1>
            {{ slide.description }}
          </h1>
          <CButton
            text="Selengkapnya"
            color="neutral"
            text-color="text-error"
            @click="lapor()"
          />
        </div>
        <div v-else class="bg-primary border-t-4 border-secondary w-full h-full rounded-3xl py-16 px-10 space-y-8">
          <h1 class="text-white text-2xl font-bold">
            {{ slide.name }}
          </h1>
          <Carousel :items-to-show="shownChild || slide.services.length">
            <Slide v-for="(service, j) in slide.services" :key="j">
              <div class="p-4 pt-6 flex flex-col items-center rounded-xl shadow-xl mx-3 bg-white h-80 w-64">
                <img v-if="service.photo_url" :src="service.photo_url" :alt="service.photo_url" width="62.083" height="50">
                <img v-else src="/b-care.png" alt="Logo B-CARE" class="opacity-50">
                <h1 class="text-xl font-semibold text-center mt-3 mb-4 leading-none">
                  {{ service.name }}
                </h1>
                <h1 :title="service.description" class="text-xs text-secondary-text text-left mb-auto line-clamp-4">
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
                        service_category_id: slide.id
                      }
                    })
                  "
                />
              </div>
            </Slide>
          </Carousel>
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
