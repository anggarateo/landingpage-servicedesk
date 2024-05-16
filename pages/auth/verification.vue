<script lang="ts" setup>
definePageMeta({
  layout: 'custom'
})

const { $api, $toast } = useNuxtApp()
const loading = ref(false)

async function verification () {
  loading.value = true
  const {
    data,
    error,
    pending
  } = await $api.auth.verifyAccount({ token: useRoute().query.token })
  if (data.value) {
    loading.value = false
    await delay(3000)
    useRouter().push('/auth/login')
  }
  if (error.value) $toast.error(error.value.data.message, { onClose: () => useRouter().push('/auth/login') })
  if (pending.value) loading.value = pending.value
  loading.value = false
}
verification()

function delay (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
</script>
<template>
  <div class="min-h-screen bg-primary flex flex-row items-center justify-center">
    <div class="bg-white p-8 rounded-xl w-1/3">
      <div class="flex justify-between">
        <template v-if="loading">
          <Icon name="eos-icons:loading" class="text-primary text-4xl w-1/4" />
          <div class="space-y-2">
            <h1 class="text-2xl font-semibold">
              Proses verifikasi akun
            </h1>
            <h1 class="text-sm">
              Mohon tidak membuka tab lain/menutup tab ini saat proses verifikasi
            </h1>
          </div>
        </template>
        <template v-else>
          <Icon name="mdi:checkbox-marked-circle-outline" class="text-success-500 text-4xl w-1/4" />
          <div class="space-y-2">
            <h1 class="text-2xl text-success-500 font-semibold">
              Verifikasi akun berhasil
            </h1>
            <h1 class="text-sm">
              Halaman akan dialihkan
              <icon name="eos-icons:three-dots-loading" class="text-lg" />
              <br>Silahkan login menggunakan akun yang telah diverifikasi
            </h1>
            <NuxtLink
              to="/auth/login"
              class="hover:underline text-xs text-primary"
            >
              klik disini jika halaman tidak dialihkan otomatis
            </NuxtLink>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>