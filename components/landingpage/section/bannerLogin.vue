<script lang="ts" setup>
defineProps({
  content: {
    type: Object,
    default: null
  }
})
</script>
<template>
  <div style="background-image: url('/landingpage/landingpage-login.png')" class="bg-cover h-[500px] my-20 mx-6 p-6 sm:p-14 md:p-20 lg:p-28">
    <div class="w-full sm:w-3/5 text-neutral-100 space-y-4">
      <h1 class="text-4xl font-bold">
        {{ content?.title }}
      </h1>
      <h1>
        {{ content?.content }}
      </h1>
      <CButton text="Login" color="neutral" icon-position="right" icon="material-symbols:arrow-forward" @click="$router.push('/auth/login')" />
    </div>
  </div>
</template>