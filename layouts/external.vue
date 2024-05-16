<script lang="ts" setup>

const scrollTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

const scrollY = ref()
const { $isLoggedIn, $localUser, $config, $api } = useNuxtApp()

onBeforeMount(async () => {
  if ($isLoggedIn() && !$localUser().roles.find(el => el.name.toLowerCase() === 'pengadu')) {
    const userLog = localStorage.getItem('userLog')
    localStorage.clear()
    if (userLog) localStorage.setItem('userLog', userLog)
    useRouter().replace('/auth/login')
  }
})
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  scrollY.value = window.scrollY
}

const chatMe = () => {
  window.open($config.public.waMe, '_blank')
}

</script>
<template>
  <div>
    <main>
      <slot />
    </main>
    <Transition name="fade">
      <div
        v-if="scrollY >= 500"
        class="fixed bottom-20 right-5 cursor-pointer rounded-full bg-primary-100 p-4 hover:shadow-lg"
        @click="scrollTop"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.6437 8.47884L11.3075 3.14258L5.97119 8.47884" stroke="#2953A1" stroke-width="1.31868" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.3076 18.0881V3.29248" stroke="#2953A1" stroke-width="1.31868" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </Transition>
    <CButton
      text="Chat me"
      icon="ic:baseline-whatsapp"
      icon-position="right"
      rounded
      color="success"
      class="fixed bottom-5 right-5"
      @click="chatMe"
    />
  </div>
</template>