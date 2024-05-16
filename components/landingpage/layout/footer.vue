<script lang="ts" setup>
const { $mitt } = useNuxtApp()
const lang = ref<String>(localStorage.getItem('lang') || 'id')
const language = (val: String) => {
  $mitt.emit('lang', { value: val, alias: useRoute().meta.alias })
  lang.value = val
}
</script>
<template>
  <div style="background-image: url('/landingpage/footer.png')" class="bg-cover min-h-[550px] px-10 lg:px-28 pt-36 pb-10 text-neutral-100 space-y-7">
    <div class="flex flex-col md:flex-row md:items-center pb-4 justify-between border-b-2">
      <div class="text-2xl md:text-4xl font-bold leading-relaxed">
        <h1>
          Ensuring Satisfying
        </h1>
        <h1>
          Solution
        </h1>
      </div>
      <div class="flex justify-end">
        <CButton text="Buat Tiket" color="neutral" rounded @click="$router.push('/ticket/create')" />
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-10 lg:gap-20">
      <div class="flex flex-col justify-between">
        <h1 class="text-lg font-semibold">
          About B-CARE
        </h1>
        <h1>
          B-CARE merupakan layanan Service Desk terintegrasi yang ada di Badan Pengusahaan Batam.
        </h1>
        <div title="Pilih Bahasa" class="flex flex-row gap-4">
          <div
            class="flex flex-row items-center gap-2.5 cursor-pointer"
            :class="{ 'opacity-40': lang === 'en' }"
            title="English"
            @click="language('en')"
          >
            <img src="/landingpage/lang-en.png" alt="English">
            <h1 class="text-white text-xs font-bold">
              EN
            </h1>
          </div>
          <svg width="1" height="31" viewBox="0 0 1 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.5" y1="30.355" x2="0.5" y2="0.35498" stroke="#C4C4C4"/>
          </svg>
          <div
            class="flex flex-row items-center gap-2.5 cursor-pointer"
            :class="{ 'opacity-40': lang === 'id' }"
            title="Bahasa Indonesia"
            @click="language('id')"
          >
            <img src="/landingpage/lang-id.png" alt="Bahasa Indonesia">
            <h1 class="text-white text-xs font-bold">
              ID
            </h1>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4 w-full md:w-2/5">
        <h1 class="text-lg font-semibold">
          Halaman
        </h1>
        <NuxtLink to="/faq" class="hover:underline">
          FAQ
        </NuxtLink>
        <NuxtLink to="/catalog" class="hover:underline">
          Katalog Pengaduan
        </NuxtLink>
      </div>
      <div class="space-y-4 w-full md:w-2/5">
        <h1 class="text-lg font-semibold">
          Link Terkait
        </h1>
        <NuxtLink to="https://www.lapor.go.id/" target="_blank" class="hover:underline">
          Layanan Aspirasi dan Pengaduan Online Rakyat
        </NuxtLink>
        <h1 class="hover:underline cursor-pointer" @click="$emit('wa')">
          WhatsApp B-CARE
        </h1>
      </div>
      <div class="space-y-4 w-full md:w-2/5">
        <h1 class="text-lg font-semibold">
          Jam Operasional
        </h1>
        <h1>
          Senin - Jumat
        </h1>
        <h1>
          09.00 s/d 16.00 WIB
        </h1>
      </div>
    </div>
  </div>
</template>