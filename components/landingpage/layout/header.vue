<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  detail: {
    type: [Boolean, String],
    default: false
  },
  searchBar: {
    type: String,
    default: null
  },
  searchResult: {
    type: [String, Number],
    default: null
  },
  pages: {
    type: Boolean,
    default: true
  }
})

const inputSearch = ref()
</script>
<template>
  <div
    style="background-image: url('/landingpage/header.png');"
    class="bg-cover h-[calc(100vh*(1/5))] lg:h-[calc(100vh*(2/3))] bg-primary-500 flex flex-col items-center text-white pt-4 sm:pt-8 lg:pt-12 gap-2 sm:gap-4"
    :class="{ 'pt-24': searchResult }"
  >
    <h1 class="text-2xl sm:text-5xl font-bold text-center px-2">
      {{ searchResult ? `Pencarian "${name}"` : name }}
    </h1>
    <div class="flex flex-row items-center gap-2 text-sm font-medium">
      <h1 v-if="searchResult">
        {{ searchResult }} hasil ditemukan
      </h1>
      <template v-else>
        <NuxtLink to="/" class="hover:underline">
          Beranda
        </NuxtLink>
        <Icon name="grommet-icons:form-next" />
        <template v-if="detail">
          <NuxtLink v-if="pages" :to="'/' + $route.fullPath.split('/')[1]" class="hover:underline">
            {{ name }}
          </NuxtLink>
          <div v-else class="hover:underline cursor-pointer" @click="$emit('hide-detail')">
            {{ name }}
          </div>
          <Icon name="grommet-icons:form-next" />
          <h1 class="opacity-80">
            {{ typeof detail === 'boolean' ? 'Detail' : detail }}
          </h1>
        </template>
        <h1 v-else class="opacity-80">
          {{ name }}
        </h1>
      </template>
    </div>
    <div v-if="searchBar" class="flex flex-row rounded-2xl bg-neutral-100 p-2.5 gap-10 border border-neutral-300 w-2/3 md:w-1/2">
      <input
        v-model="inputSearch"
        type="text"
        class="ml-3.5 bg-transparent outline-none w-full placeholder:text-neutral-300 text-neutral-600"
        :placeholder="searchBar"
        @keypress.enter="$emit('search', inputSearch)"
      >
      <CButton
        text="Cari"
        color="secondary"
        class="md:hidden"
        @click="$emit('search', inputSearch)"
      />
      <CButton
        text="Cari"
        color="secondary"
        class="hidden md:block"
        icon-position="right"
        icon="material-symbols:arrow-forward"
        @click="$emit('search', inputSearch)"
      />
    </div>
  </div>
</template>