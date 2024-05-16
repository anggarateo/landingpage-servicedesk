<script lang="ts" setup>
import { useModal } from 'vue-final-modal'
import { getMessaging, onMessage } from 'firebase/messaging'
import ModalInfo from '@/components/ModalInfo.vue'

const { $api, $toast } = useNuxtApp()
const router = useRouter()

const modalLogout = useModal({
  component: ModalInfo,
  attrs: {
    title: 'Keluar?',
    info: true,
    type: 'yesOrNo',
    btnColor: 'error',
    onCloseInfo () {
      modalLogout.close()
    },
    onCloseAll () {
      let userLog
      if (localStorage.getItem('userLog')) userLog = localStorage.getItem('userLog')
      localStorage.clear()
      if (userLog) localStorage.setItem('userLog', userLog)
      useRouter().replace('/').then(() => {
        useRouter().go(0)
      })
      modalLogout.close()
    }
  },
  slots: {
    content: 'Apakah Anda yakin ingin keluar dari akun? Semua sesi yang sedang berjalan akan ditutup dan Anda akan dialihkan ke halaman login.'
  }
})
const user = ref()
const localAuth = localStorage.getItem('auth') || ''
const auth = ref()
localAuth ? auth.value = JSON.parse(localAuth) : auth.value = null
const popUp = ref(false)
const showNotif = ref(false)
const hasNotif = ref(false)

const getData = async () => {
  const {
    data,
    error
  } = await $api.profile.getProfile()
  if (data.value) {
    user.value = data.value.data
    localStorage.setItem('user', JSON.stringify(data.value.data))
  }
  if (error.value) { $toast.error(error.value.data.message) }
}
if (auth.value) { getData() }

const dataNotification: any = ref([])
const getNotif = async () => {
  const { data, error } = await $api.notification.getByUser(null, null)

  if (data.value) {
    dataNotification.value = data.value.data.slice(0, 3)
    console.log('data notif: ', dataNotification.value)
  }

  if (error.value) {
    $toast.error(error.value.data.message)
  }
}

const readNotif = async (v: any) => {
  const { data, error } = await $api.notification.readNotif(v)

  if (data.value) {
    getNotif()
    goToPage(v)
  }

  if (error.value) {
    console.log('Error!!!')
  }
}

const messaging = getMessaging()
onMessage(messaging, (payload) => {
  getNotif()
  hasNotif.value = true
})

const handleOpenNotif = () => {
  hasNotif.value = false
  showNotif.value = !showNotif.value
}

function waktuYangLalu (waktu) {
  const waktuObj = new Date(waktu)
  const selisih = new Date() - waktuObj
  const detik = Math.floor(selisih / 1000)

  if (detik < 60) {
    return detik + ' detik yang lalu'
  } else if (detik < 3600) {
    const menit = Math.floor(detik / 60)
    return menit + (menit > 1 ? ' menit yang lalu' : ' menit yang lalu')
  } else if (detik < 86400) {
    const jam = Math.floor(detik / 3600)
    return jam + (jam > 1 ? ' jam yang lalu' : ' jam yang lalu')
  } else if (detik < 604800) {
    const hari = Math.floor(detik / 86400)
    return hari + (hari > 1 ? ' hari yang lalu' : ' hari yang lalu')
  } else if (detik < 2419200) { // 4 minggu
    const minggu = Math.floor(detik / 604800)
    return minggu + (minggu > 1 ? ' minggu yang lalu' : ' minggu yang lalu')
  } else {
    return waktuObj.toLocaleString()
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const goToPage = (obj) => {
  router.push('/ticket/')
  console.log(obj)
}

onMounted(() => {
  if (localStorage.getItem('auth')) {
    getNotif()
  }
})

const showNav = ref(false)
</script>
<template>
  <div class="relative space-y-2">
    <nav class="flex flex-row justify-between fixed border w-full h-[75px] py-4 px-4 sm:px-10 items-center bg-white top-0 z-50 select-none">
      <div class="flex flex-row items-center gap-8">
        <img class="hidden lg:block" src="/landingpage/bpbatam.png" alt="Logo BP BATAM" width="105.263" height="25">
        <img class="hidden sm:block" src="/b-care.png" alt="Logo B-CARE">
        <button class="block md:hidden" @click="showNav = !showNav">
          <Icon name="zondicons:stroke-width" color="black" size="24" />
        </button>
      </div>
      <div class="flex-row items-center gap-4 hidden md:flex">
        <NuxtLink to="/" class="opacity-80 hover:opacity-100">
          Beranda
        </NuxtLink>
        <NuxtLink to="/faq" class="opacity-80 hover:opacity-100">
          FAQ
        </NuxtLink>
        <NuxtLink to="/catalog" class="opacity-80 hover:opacity-100">
          Katalog Pengaduan
        </NuxtLink>
      </div>
      <div class="flex flex-row items-center justify-end gap-3">
        <div class="relative mx-3 cursor-pointer" @click="handleOpenNotif">
          <Icon name="mdi:notifications" size="24px" class="text-primary" />
          <div
            class="absolute inline-flex items-center justify-center w-3 h-3 border-2 border-white rounded-full top-[1px] -end-[1px]"
            :class="{ 'animate-ping bg-orange-500': hasNotif, 'hidden': !hasNotif }"
          />
        </div>
        <CButton text="Buat Tiket" :type="auth ? 'filled' : 'outlined'" @click="$router.push('/ticket/create')" />
        <div
          v-if="auth && user"
          class="flex flex-row border py-1.5 px-4 rounded-lg gap-6 items-center cursor-pointer max-w-[calc(100vh/3)] truncate"
          @mouseenter="popUp = true"
          @click="popUp = !popUp"
        >
          <div class="flex flex-row gap-2 items-center">
            <!-- <div
              class="rounded-full h-7 w-7"
              :class="user.avatar ? 'bg-cover bg-center' : 'bg-secondary text-neutral-100 font-semibold flex items-center justify-center'"
              :style="{ 'background-image': `url(https://b-care.manggalatechnology.com${user.avatar})`}"
            >
              <h1 v-if="!user.avatar">
                {{ user.fullname.charAt(0).toUpperCase() }}
              </h1>
            </div> -->
            <Avatar
              :avatar="user.avatar"
              :name="user.fullname"
              :size="7"
            />
            <h1 class="hidden lg:block">
              {{ user.fullname }}
            </h1>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M12.4465 5.95337H8.29317H4.55317C3.91317 5.95337 3.59317 6.7267 4.0465 7.18004L7.49983 10.6334C8.05317 11.1867 8.95317 11.1867 9.5065 10.6334L10.8198 9.32004L12.9598 7.18004C13.4065 6.7267 13.0865 5.95337 12.4465 5.95337Z" fill="#696969" />
          </svg>
        </div>
        <CButton v-else text="Login" @click="$router.push('/auth/login')" />
      </div>
    </nav>
    <nav
      v-if="showNav"
      class="flex gap-4 fixed border w-full py-4 px-10 items-center bg-white z-50 select-none !my-0"
      @mouseleave="showNav = false"
    >
      <NuxtLink to="/" class="opacity-80 hover:opacity-100">
        Beranda
      </NuxtLink>
      <NuxtLink to="/faq" class="opacity-80 hover:opacity-100">
        FAQ
      </NuxtLink>
      <NuxtLink to="/catalog" class="opacity-80 hover:opacity-100">
        Katalog Pengaduan
      </NuxtLink>
    </nav>
    <div
      v-if="auth && popUp"
      class="fixed bg-neutral-100 p-6 rounded-xl right-10 z-50 shadow-md"
      @mouseleave="popUp = false"
    >
      <svg
        class="absolute right-4 -top-1.5"
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="8"
        viewBox="0 0 23 8"
        fill="none"
      >
        <path d="M11.5 0.5L22.016 8H0.983982L11.5 0.5Z" fill="white" />
      </svg>
      <div class="flex flex-col text-sm">
        <NuxtLink
          to="/ticket"
          class="flex flex-row p-4 gap-2 hover:bg-primary-100/20 rounded-lg"
        >
          <div class="w-6 h-6 flex items-center justify-center bg-primary-500 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
              <path d="M13.5833 6.27075C13.8225 6.27075 14.0208 6.07242 14.0208 5.83325V5.24992C14.0208 2.67742 13.2391 1.89575 10.6666 1.89575H7.02079V3.20825C7.02079 3.44742 6.82246 3.64575 6.58329 3.64575C6.34413 3.64575 6.14579 3.44742 6.14579 3.20825V1.89575H4.83329C2.26079 1.89575 1.47913 2.67742 1.47913 5.24992V5.54159C1.47913 5.78075 1.67746 5.97909 1.91663 5.97909C2.47663 5.97909 2.93746 6.43992 2.93746 6.99992C2.93746 7.55992 2.47663 8.02075 1.91663 8.02075C1.67746 8.02075 1.47913 8.21909 1.47913 8.45825V8.74992C1.47913 11.3224 2.26079 12.1041 4.83329 12.1041H6.14579V10.7916C6.14579 10.5524 6.34413 10.3541 6.58329 10.3541C6.82246 10.3541 7.02079 10.5524 7.02079 10.7916V12.1041H10.6666C13.2391 12.1041 14.0208 11.3224 14.0208 8.74992C14.0208 8.51075 13.8225 8.31242 13.5833 8.31242C13.0233 8.31242 12.5625 7.85159 12.5625 7.29159C12.5625 6.73159 13.0233 6.27075 13.5833 6.27075ZM7.02079 8.26575C7.02079 8.50492 6.82246 8.70325 6.58329 8.70325C6.34413 8.70325 6.14579 8.50492 6.14579 8.26575V5.73409C6.14579 5.49492 6.34413 5.29659 6.58329 5.29659C6.82246 5.29659 7.02079 5.49492 7.02079 5.73409V8.26575Z" fill="#F6F8FB" />
            </svg>
          </div>
          <div>
            <h1 class="font-semibold">
              Daftar Tiket
            </h1>
            <h1 class="text-xs text-neutral-500">
              Daftar tiket yang pernah dibuat
            </h1>
          </div>
        </NuxtLink>
        <NuxtLink
          to="/profile"
          class="flex flex-row p-4 gap-2 hover:bg-primary-100/20 rounded-lg"
        >
          <div class="w-6 h-6 flex items-center justify-center bg-primary-500 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
              <path d="M12.475 5.37838C11.4192 5.37838 10.9875 4.63171 11.5125 3.71588C11.8159 3.18504 11.635 2.50838 11.1042 2.20504L10.095 1.62754C9.63419 1.35338 9.03919 1.51671 8.76502 1.97754L8.70085 2.08838C8.17585 3.00421 7.31252 3.00421 6.78169 2.08838L6.71752 1.97754C6.45502 1.51671 5.86002 1.35338 5.39919 1.62754L4.39002 2.20504C3.85919 2.50838 3.67835 3.19088 3.98169 3.72171C4.51252 4.63171 4.08085 5.37838 3.02502 5.37838C2.41835 5.37838 1.91669 5.87421 1.91669 6.48671V7.51338C1.91669 8.12004 2.41252 8.62171 3.02502 8.62171C4.08085 8.62171 4.51252 9.36838 3.98169 10.2842C3.67835 10.815 3.85919 11.4917 4.39002 11.795L5.39919 12.3725C5.86002 12.6467 6.45502 12.4834 6.72919 12.0225L6.79335 11.9117C7.31835 10.9959 8.18169 10.9959 8.71252 11.9117L8.77669 12.0225C9.05085 12.4834 9.64585 12.6467 10.1067 12.3725L11.1159 11.795C11.6467 11.4917 11.8275 10.8092 11.5242 10.2842C10.9934 9.36838 11.425 8.62171 12.4809 8.62171C13.0875 8.62171 13.5892 8.12588 13.5892 7.51338V6.48671C13.5834 5.88004 13.0875 5.37838 12.475 5.37838ZM7.75002 8.89588C6.70585 8.89588 5.85419 8.04421 5.85419 7.00004C5.85419 5.95588 6.70585 5.10421 7.75002 5.10421C8.79419 5.10421 9.64585 5.95588 9.64585 7.00004C9.64585 8.04421 8.79419 8.89588 7.75002 8.89588Z" fill="#F6F8FB" />
            </svg>
          </div>
          <div>
            <h1 class="font-semibold">
              Pengaturan Profil
            </h1>
            <h1 class="text-xs text-neutral-500">
              Mengatur informasi profil Anda
            </h1>
          </div>
        </NuxtLink>
        <div
          class="flex flex-row p-4 gap-2 hover:bg-primary-100/20 rounded-lg cursor-pointer"
          @click="modalLogout.open()"
        >
          <div class="w-6 h-6 flex items-center justify-center bg-primary-500 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
              <path d="M10.55 1.16663H9.03333C7.16667 1.16663 6 2.33329 6 4.19996V6.56246H9.64583C9.885 6.56246 10.0833 6.76079 10.0833 6.99996C10.0833 7.23913 9.885 7.43746 9.64583 7.43746H6V9.79996C6 11.6666 7.16667 12.8333 9.03333 12.8333H10.5442C12.4108 12.8333 13.5775 11.6666 13.5775 9.79996V4.19996C13.5833 2.33329 12.4167 1.16663 10.55 1.16663Z" fill="#F6F8FB" />
              <path d="M3.41003 6.56245L4.61753 5.35495C4.70503 5.26745 4.74586 5.15662 4.74586 5.04578C4.74586 4.93495 4.70503 4.81828 4.61753 4.73662C4.44836 4.56745 4.16836 4.56745 3.99919 4.73662L2.04503 6.69078C1.87586 6.85995 1.87586 7.13995 2.04503 7.30912L3.99919 9.26328C4.16836 9.43245 4.44836 9.43245 4.61753 9.26328C4.78669 9.09412 4.78669 8.81412 4.61753 8.64495L3.41003 7.43745H6.00003V6.56245H3.41003Z" fill="#F6F8FB" />
            </svg>
          </div>
          <div>
            <h1 class="font-semibold">
              Keluar
            </h1>
            <h1 class="text-xs text-neutral-500">
              Keluar dari akun dan mengakhiri sesi Anda saat ini
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showNotif"
      class="fixed bg-neutral-100 px-6 pt-10 rounded-xl top-20 z-50 max-w-md shadow-md"
      :class="auth ? 'right-[28.7%]' : 'right-[21%]'"
      @mouseleave="showNotif = false"
    >
      <h1 class="font-bold text-2xl">
        Notifikasi
      </h1>
      <div class="flex flex-col pt-4 text-sm divide-y">
        <div
          v-for="(v, i) in dataNotification"
          :key="i"
          class="p-4 space-y-2 hover:bg-primary-100/20 cursor-pointer"
          :class="{'opacity-70': i === 2}"
          @click="readNotif(v), v.is_read = false"
        >
          <div class="flex flex-row gap-6 items-center">
            <div v-show="!v.is_read" class="text-base">
              <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.5" width="7" height="7" rx="3.5" fill="#2953A1" />
              </svg>
            </div>
            <!-- eslint-disable vue/no-v-html -->
            <h1 v-html="v.title" />
          </div>
          <h1 class="pl-8 text-neutral-300">
            {{ waktuYangLalu(v.created_at) }}
          </h1>
        </div>
      </div>
      <div class="p-3 text-center text-sm">
        <NuxtLink to="/notification" class="hover:underline">
          View All
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.router-link-exact-active, .router-link-active {
  @apply text-primary font-medium opacity-100;
}
</style>
