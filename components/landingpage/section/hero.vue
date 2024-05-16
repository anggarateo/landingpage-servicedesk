<script lang="ts" setup>
import { useTicketStore } from '@/store/ticket'
import ModalCodePin from '~/pages/ticket/components/ModalCodePin.vue'

const { $toast, $api, $isLoggedIn } = useNuxtApp()
const props = defineProps({
  content: {
    type: Object,
    default: null
  }
})
const search = ref('keyword')
const inputSearch = ref()
const router = useRouter()
const ticketStore = useTicketStore()
const emit = defineEmits(['search-keyword'])
const shownPin = ref(false)
const route = useRoute()

const searching = () => {
  if (search.value === 'ticket' && $isLoggedIn()) {
    ticketStore.$patch({ codeTicket: inputSearch.value })
    router.push('/ticket')
  } else if (search.value === 'ticket') {
    shownPin.value = true
  } else {
    router.push({ path: '/', query: { search: inputSearch.value }})
    emit('search-keyword', inputSearch.value)
  }
}
function goToTicket (e: any) {
  if (e) {
    useRouter().push(`/ticket/${codePinTicket.encrypt(e.code, e.pin)}/detail`)
  }
}

// onMounted(() => {
onBeforeMount(() => {
  if (route.query?.code_ticket) {
    search.value = 'ticket'
    inputSearch.value = route.query.code_ticket
    shownPin.value = true
  }
})
</script>
<template>
  <div class="bg-primary-500 lg:h-[calc(100vh-75px)] relative">
    <div class="flex flex-col md:flex-row z-10 relative">
      <div class="w-full md:w-2/3 lg:w-1/2 py-9 px-9 lg:px-20 md:pr-0 flex flex-col gap-6">
        <div class="space-y-4">
          <img class="hidden lg:block" src="/landingpage/3(9)1.png" alt="Logo B-CARE">
          <div class="flex flex-wrap">
            <h1
              v-for="(string, i) in content?.title.split(',')"
              :key="i"
              class="font-bold text-5xl text-white"
            >
              <span
                v-for="(char, j) in string"
                :key="j"
                :class="{ 'text-secondary': char === char.toUpperCase()}"
              >
                {{ char === char.toLowerCase() && j+1 === string.length && i+1 < content?.title.split(',').length ? `${char},&nbsp;` : char }}
              </span>
            </h1>
          </div>
        </div>
        <h1 class="text-white">
          {{ content?.content }}
        </h1>
        <div class="flex flex-col">
          <div class="flex flex-row">
            <div
              class="rounded-tl-2xl px-6 py-3.5 flex flex-row items-center gap-2"
              :class="search === 'keyword' ? 'bg-primary-100 text-primary-500' : 'bg-primary-400 text-primary-100 cursor-pointer hover:brightness-110'"
              @click="search = 'keyword'"
            >
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M8.625 16.25C12.56 16.25 15.75 13.06 15.75 9.125C15.75 5.18997 12.56 2 8.625 2C4.68997 2 1.5 5.18997 1.5 9.125C1.5 13.06 4.68997 16.25 8.625 16.25Z" fill="currentColor"/>
                <path d="M15.9749 17C15.8399 17 15.7049 16.9475 15.6074 16.85L14.2124 15.455C14.0099 15.2525 14.0099 14.9225 14.2124 14.7125C14.4149 14.51 14.7449 14.51 14.9549 14.7125L16.3499 16.1075C16.5524 16.31 16.5524 16.64 16.3499 16.85C16.2449 16.9475 16.1099 17 15.9749 17Z" fill="currentColor"/>
              </svg>
              <h1 class="font-medium">
                Pencarian
              </h1>
            </div>
            <div
              class="rounded-tr-2xl px-6 py-3.5 flex flex-row items-center gap-2"
              :class="search === 'ticket' ? 'bg-primary-100 text-primary-500' : 'bg-primary-400 text-primary-100 cursor-pointer hover:brightness-110'"
              @click="search = 'ticket'"
            >
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path :opacity="{ 0.4: search === 'ticket' }" d="M7.5 7.31V5.1875C7.1925 5.1875 6.9375 4.9325 6.9375 4.625V2.9375H5.25C1.9425 2.9375 0.9375 3.9425 0.9375 7.25V7.625C0.9375 7.9325 1.1925 8.1875 1.5 8.1875C2.22 8.1875 2.8125 8.78 2.8125 9.5C2.8125 10.22 2.22 10.8125 1.5 10.8125C1.1925 10.8125 0.9375 11.0675 0.9375 11.375V11.75C0.9375 15.0575 1.9425 16.0625 5.25 16.0625H6.9375V14.375C6.9375 14.0675 7.1925 13.8125 7.5 13.8125V11.69C7.1925 11.69 6.9375 11.435 6.9375 11.1275V7.8725C6.9375 7.565 7.1925 7.31 7.5 7.31Z" fill="currentColor"/>
                <path opacity="0.4" d="M15.1875 9.875C15.1875 10.595 15.78 11.1875 16.5 11.1875C16.8075 11.1875 17.0625 11.4425 17.0625 11.75C17.0625 15.0575 16.0575 16.0625 12.75 16.0625H8.0625V14.375C8.0625 14.0675 7.8075 13.8125 7.5 13.8125V11.69C7.8075 11.69 8.0625 11.435 8.0625 11.1275V7.8725C8.0625 7.565 7.8075 7.31 7.5 7.31V5.1875C7.8075 5.1875 8.0625 4.9325 8.0625 4.625V2.9375H12.75C16.0575 2.9375 17.0625 3.9425 17.0625 7.25V8C17.0625 8.3075 16.8075 8.5625 16.5 8.5625C15.78 8.5625 15.1875 9.155 15.1875 9.875Z" fill="currentColor"/>
              </svg>
              <h1 class="font-medium">
                Tracking Tiket
              </h1>
            </div>
          </div>
          <div class="flex flex-row rounded-r-2xl rounded-bl-2xl bg-primary-100 p-2.5 gap-10">
            <input
              v-model="inputSearch"
              type="text"
              class="ml-3.5 bg-transparent outline-none w-full placeholder:text-neutral-400"
              :placeholder="search === 'keyword' ? 'Masukkan kata kunci' : search === 'ticket' ? 'Masukkan nomor tiket Anda' : ''"
              @keypress.enter="searching"
            >
            <CButton
              text="Cari"
              color="secondary"
              icon-position="right"
              icon="material-symbols:arrow-forward"
              @click="searching"
            />
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2">
        <img src="/landingpage/mascot.png" alt="Mascot">
      </div>
    </div>
    <img src="/landingpage/landingpage-b.png" alt="Vector" class="absolute bottom-0">
    <ModalCodePin
      v-if="shownPin"
      v-model="shownPin"
      :code-ticket="inputSearch"
      :esc-to-close="false"
      type="code"
      title="Masukkan kode unik yang telah dikirim ke Email/Whatsapp saat pembuatan tiket"
      @success="goToTicket($event)"
    />
  </div>
</template>