<script lang="ts" setup>
const { $isLoggedIn, $localUser } = useNuxtApp()

onBeforeMount(() => {
  if ($isLoggedIn() && $localUser().roles.find(el => el.name.toLowerCase() === 'pengadu')) useRouter().push('/')
})
</script>
<template>
  <div>
    <Icon
      name="material-symbols:close"
      class="fixed right-2 sm:right-[24%] xl:right-[30%] top-0 text-white cursor-pointer hover:text-stroke text-2xl"
      @click="$router.push('/')"
    />
    <slot />
  </div>
</template>