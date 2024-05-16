<template>
  <div
    class="relative flex overflow-x-auto"
    :class="{
      'space-x-2': type === 'pill',
    }"
  >
    <template v-if="skeletonMode">
      <div v-for="index in 5" :key="index">
        <SkeletonBlock :class="{ 'rounded-full': type === 'pill' }" style="height: 2.7rem;" :style="{ width: `${Math.floor(Math.random() * (11 - 6 + 1) + 6)}ch` }" />
      </div>
    </template>
    <template v-if="!skeletonMode">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        v-wave
        class="transform duration-300 cursor-pointer"
        :class="[
          {
            'py-2 px-3 rounded-full border btn-effect dark:bg-gray-900': type === 'pill',
            'border-gray-400 bg-white text-gray-400': type === 'pill' && activeTab !== tab.id,
            'border-primegreen bg-primary text-white': type === 'pill' && activeTab === tab.id,

            'w-full py-2 px-3 border-b-2 bg-white text-center ': type === 'underlined',
            'border-transparent text-gray-400': type === 'underlined' && activeTab !== tab.id,
            'border-primary-500 text-primary dark:text-primary-400': type === 'underlined' && activeTab === tab.id,

            'w-full p-2 text-center': type === 'underlined-primary',
            'bg-stroke': type === 'underlined-primary' && activeTab !== tab.id,
            'bg-primary text-white shadow-md': type === 'underlined-primary' && activeTab === tab.id
          },
          styling
        ]"
        @click="clickTab(tab)"
      >
        <span class="whitespace-nowrap text-center transform duration-300">{{ tab.name }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import SkeletonBlock from '~/components/SKeleton'

export default {
  name: 'TabComponent',

  components: { SkeletonBlock },

  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    activeTab: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'pill'
    },
    color: {
      type: String,
      default: ''
    },
    skeletonMode: {
      type: Boolean,
      default: false
    },
    styles: {
      type: String,
      default: ''
    }
  },

  computed: {
    styling () {
      return this.styles
    }
  },

  methods: {
    clickTab (tab) { this.$emit('switchTab', tab) }
  }
}
</script>
