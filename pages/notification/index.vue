<script setup>
useHead({ title: 'Notifikasi' })
definePageMeta({
  alias: '/notifikasi'
})

const { $api, $toast } = useNuxtApp()
const router = useRouter()

const dataNotification = ref([])

const getNotif = async () => {
  const { data, error } = await $api.notification.getByUser(null, null)

  if (data.value) {
    dataNotification.value = data.value.data
    console.log('data notif: ', dataNotification.value)
  }

  if (error.value) {
    $toast.error(error.value.data.message)
  }
}
const readNotif = async (v) => {
  const { data, error } = await $api.notification.readNotif(v)

  if (data.value) {
    getNotif()
    goToPage(v)
  }

  if (error.value) {
    console.log('Error!!!')
  }
}

const goToPage = (obj) => {
  router.push('/ticket/')
  console.log(obj)
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

onMounted(() => {
  getNotif()
})
</script>

<template>
  <div>
    <LandingpageLayoutHeader name="Notifikasi" />
    <div class="p-4 space-y-4">
      <div class="w-full h-full shadow rounded-lg">
        <div class="flex p-4">
          <div class="flex flex-col w-full">
            <div class=" font-bold text-2xl">
              Notifikasi
            </div>
            <div class="flex flex-col overflow-y-scroll gap-4" style="height: 479px;">
              <div
                v-for="(v, i) in dataNotification"
                :key="i"
                class="inline-flex items-center justify-center gap-[10px] px-[20px] py-[16px] shadow-md cursor-pointer"
                @click="readNotif(v)"
              >
                <div class=" w-8 h-8">
                  <div class=" w-full h-full bg-neutral-300 rounded-full">
                    <div class=" w-full h-full flex justify-center items-center">
                      <Icon name="carbon:notification" color="black" size="18" />
                    </div>
                  </div>
                </div>
                <div class=" w-full" style="flex: 1 1 0; flex-direction: column; justify-content: center; align-items: flex-start; display: inline-flex">
                  <div style="color: #444444; font-size: 16px; font-family: Poppins; font-weight: 600; line-height: 26px; word-wrap: break-word">
                    Your card has been viewed
                  </div>
                  <div style="align-self: stretch; height: 25px; color: #ABA5A2; font-size: 14px; font-family: Poppins; font-weight: 400; line-height: 25.20px; word-wrap: break-word">
                    {{ v.title }}
                  </div>
                </div>
                <div class=" flex-col justify-end items-end inline-flex gap-2">
                  <div style="color: #444444; font-size: 14px; font-family: Poppins; font-weight: 600; line-height: 25.20px; word-wrap: break-word">
                    {{ waktuYangLalu(v.created_at) }}
                  </div>
                  <div v-show="!v.is_read" style="width: 10px; height: 10px; background: #C01048; border-radius: 9999px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
