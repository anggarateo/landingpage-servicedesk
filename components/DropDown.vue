<script setup>
import { v4 as uuidv4 } from 'uuid'

const id = uuidv4()
const props = defineProps({
  label: {
    type: String,
    default: null
  },
  required: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: null
  },
  data: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: [{ label: 'label', value: 'label' }]
  },
  error: {
    type: String,
    default: null
  }
})
const selected = ref([])

watch(
  () => props.data, (val) => console.log(val)
)
watch(() => selected.value,
  (newValue, oldValue) => {
    act(newValue)
  }
)

const emit = defineEmits(['input'])
const act = val => emit('input', val)
</script>
<template>
  <div>
    <div class="flex mb-2">
      <label v-if="label" :for="`inputDropdown${id}`">{{ label }}</label>
      <div v-if="required" class=" text-error">
        *
      </div>
    </div>
    <v-select
      v-model="selected"
      class="style-chooser"
      :class="{
        'border-red-500 ring ring-offset-1 ring-offset-white ring-red-500 rounded': error
      }"
      :placeholder="placeholder"
      :create-option="(tag) => ({ label: tag, value: tag })"
      :options="data"
    />
    <ReErrorText v-if="error" :text="error" />
  </div>
</template>
<style scoped>
  .style-chooser{
    --vs-search-input-placeholder-color: #B4B4B4;
    --vs-line-height: 36px;
  }
</style>
