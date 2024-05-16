<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const props = defineProps({
  modelValue: Boolean,
  type: String,
  idTicket: String,
  guestToken: Object
})
const emits = defineEmits(['update:modelValue', 'success'])
const shown = ref(props.modelValue)
const form = ref({
  note: ''
})
const { $api, $toast, $isLoggedIn } = useNuxtApp()
const loading = ref(false)
const rules = computed(() => {
  return {
    note: {
      required
    }
  }
})
const v$ = useVuelidate(rules, form)

watch(() => shown.value, (val) => {
  emits('update:modelValue', val)
})

async function closeTicket () {
  loading.value = true
  let api
  $isLoggedIn() ?
    api = $api.ticket.closeTicket(props.idTicket, jsonToFormData(form.value)) :
    api = $api.ticket.closeTicketGuest({
      code_ticket: props.guestToken.code_ticket,
      pin: props.guestToken.pin_ticket,
      ...form.value })
  const {
    data,
    error,
    pending
  } = await api
  if (data.value) emits('success', data.value.message)
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  loading.value = false
}
async function reOpenTicket () {
  loading.value = true
  let api
  $isLoggedIn() ?
    api = $api.ticket.reOpenTicket(props.idTicket) :
    api = $api.ticket.reOpenTicketGuest({
      code_ticket: props.guestToken.code_ticket,
      pin: props.guestToken.pin_ticket,
      ...form.value })
  const {
    data,
    error,
    pending
  } = await api
  if (data.value) emits('success', data.value.message)
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  loading.value = false
}

function onSubmit () {
  v$.value.$validate()
  if (v$.value.$error) return
  if (props.type === 'close') closeTicket()
  else if (props.type === 're-open') reOpenTicket()
  else shown.value = false
}
</script>
<template>
  <ModalInfo
    v-model="shown"
    :loading="loading"
    info
    type="preview"
    :title="`${type === 'close' ? 'Close' : type === 're-open' ? 'Re-open' : ''} Tiket`"
    :btn-color="type === 'close' ? 'error' : ''"
    @close-info="shown = false"
    @close-all="onSubmit()"
  >
    <template #content>
      <h1>
        Deskripsikan alasan Anda {{ type === 'close' ? 'menutup' : type === 're-open' ? 'membuka kembali' : '' }} tiket
      </h1>
      <ReTextEditor
        v-model="form.note"
        :with-upload="false"
        placeholder="Tuliskan alasan disini"
        :error="v$.note.$error ? v$.note.$errors[0].$message : ''"
        @change="v$.note.$touch"
      />
    </template>
  </ModalInfo>
</template>