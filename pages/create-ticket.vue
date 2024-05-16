<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useTicketStore } from '@/store/ticket'
import ModalCodePin from '~/pages/ticket/components/ModalCodePin.vue'

useHead({ title: 'Create Ticket' })
const { $api, $toast, $isLoggedIn, $localUser } = useNuxtApp()
const informant = ref($isLoggedIn() ? 'User' : 'Guest')
const created = ref()
const respCodeTicket: any = ref()
definePageMeta({
  layout: 'external'
})

const initForm = () => ({
  name: $localUser()?.fullname || '',
  email: $localUser()?.email || '',
  phone: $localUser()?.phone || '',
  service_category_id: '',
  service_id: '',
  impact_level_id: '',
  title: '',
  content: '',
  is_anonymous: false,
  files: []
})
const form = ref(initForm())
const loading = ref(false)
const categoryService = ref()
const files = ref(Array())
const rules = computed(() => {
  return {
    name: {
      required
    },
    email: {
      required,
      email
    },
    service_category_id: {
      required
    },
    service_id: {
      required
    },
    impact_level_id: {
      required
    },
    title: {
      required
    },
    content: {
      required
    }
  }
})
const v$ = useVuelidate(rules, form)
const resetFiles = ref(false)
const shownCodePin = ref(false)

watch(() => form.value, (val) => {
  if (val) {
    v$.value.$validate()
    if (val.is_anonymous) {
      form.value.name = 'Anonim'
    } else if ($isLoggedIn() && !val.is_anonymous) {
      form.value.name = $localUser().fullname
    } else if (val.name.toLowerCase() === 'anonim' && !val.is_anonymous) {
      if ($isLoggedIn()) {
        form.value.name = $localUser().fullname
      } else {
        form.value.name = ''
      }
    }
  }
},{
  deep: true
})
watch(() => categoryService.value, (val) => {
  if (val) {
    const result = val.split(',')
    form.value.service_category_id = result[1]
    form.value.service_id = result[0]
  }
})

const createTicket = async () => {
  v$.value.$validate()
  if (files.value.length) form.value.files = files.value
  form.value.phone = form.value.phone && !$isLoggedIn() ? `62${form.value.phone}` : form.value.phone
  if (v$.value.$error) return $toast.warn('Pastikan form terisi dengan benar!')
  loading.value = true
  const {
    data,
    error,
    pending
  } = await $api.ticket[`create${informant.value}`](form.value)
  if (data.value) {
    created.value = data.value.data
    respCodeTicket.value = data.value.data.code_ticket
    if ($isLoggedIn()) {
      useRouter().push(`/ticket/${data.value.data.id}/detail`)
    } else {
      shownCodePin.value = true
    }
  }
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  files.value.pop()
  loading.value = false
}
const uploadFile = async (e: any) => {
  loading.value = true
  const {
    data,
    error,
    pending
  } = await $api.ticket.uploadFile(jsonToFormData({ file: e.target.files[0] }))
  if (data.value) files.value.push(data.value.data)
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  loading.value = false
}

onMounted(() => {
  const fromCatalog = useTicketStore().detail
  if (fromCatalog.service_id && fromCatalog.service_category_id) {
    categoryService.value = `${fromCatalog.service_id},${fromCatalog.service_category_id}`
  }
})

function onReset () {
  form.value = initForm()
  categoryService.value = null
  resetFiles.value = true
}
function goToTicket (e: any) {
  if (e) {
    useRouter().push(`/ticket/${codePinTicket.encrypt(e.code, e.pin)}/detail`)
  }
}
</script>
<template>
  <div>
    <LandingpageLayoutHeader name="Buat Tiket" />
    <div class="p-4 pb-28 sm:py-20 sm:px-28 flex flex-row justify-center">
      <div class="space-y-16 p-10 border bordoer-stroke shadow-md">
        <div class="space-y-6">
          <h1 class="text-2xl text-primary-500 font-bold">
            Informasi Pemohon
          </h1>
          <div class="space-y-2">
            <ReInputText
              v-model="form.email"
              label="Email"
              placeholder="Example@gmail.com"
              :disabled="$isLoggedIn()"
              :error="v$.email.$error ? v$.email.$errors[0].$message : null"
              @change="v$.email?.$touch"
            />
            <div class="flex flex-row text-primary px-2.5 gap-2 items-center text-xs">
              <Icon name="icon-park-solid:attention"/>
              <h1>
                Harap menggunakan alamat email yang valid untuk mendapatkan respon jawaban dari tiket yang diajukan
              </h1>
            </div>
          </div>
          <div class="space-y-2">
            <ReInputText
              v-show="!form.is_anonymous"
              v-model="form.name"
              label="Nama"
              placeholder="Masukkan nama Anda"
              :disabled="$isLoggedIn() || form.is_anonymous"
              :error="v$.name.$error ? v$.name.$errors[0].$message : null"
              @change="v$.name?.$touch"
              @input="$event.target.value.toLowerCase() === 'anonim' ? form.is_anonymous = true : form.is_anonymous = false"
            />
            <div class="flex flex-col sm:flex-row px-2.5 gap-1">
              <CheckBox v-model="form.is_anonymous" :checked="form.is_anonymous" id="anonym" label="Anonim" />
              <h1 class="text-primary text-sm lg:text-base">
                (Nama Anda tidak akan terpublikasi pada laporan)
              </h1>
            </div>
          </div>
          <ReInputText
            label="Nomor Telepon"
            v-model="form.phone"
            :icon="$isLoggedIn() ? '' : 'left'"
            inputmode="tel"
            type="number"
            placeholder="8XX"
            :require="false"
            :disabled="$isLoggedIn()"
          >
            <template v-if="!$isLoggedIn()" #icon>
              <h1 class="text-neutral-400 font-medium">
                +62
              </h1>
            </template>
          </ReInputText>
        </div>
        <div class="space-y-6">
          <h1 class="text-2xl text-primary-500 font-bold">
            Informasi Tiket
          </h1>
          <DropdownPagination
            v-model="categoryService"
            api-module="ticket"
            api-method="getServices"
            option-label="name"
            :option-value="['id', 'service_category', 'id']"
            option-custom
            label="Layanan"
            placeholder="Pilih layanan"
            :error="v$.service_id.$error ? v$.service_id.$errors[0].$message : ''"
            @change="v$.service_id?.$touch"
          />
          <DropdownPagination
            v-model="form.impact_level_id"
            api-module="ticket"
            api-method="getImpacts"
            option-label="name"
            option-value="id"
            label="Tingkat dampak"
            placeholder="Pilih tingkat dampak"
            :error="v$.impact_level_id.$error ? v$.impact_level_id.$errors[0].$message : ''"
            @change="v$.impact_level_id?.$touch"
          />
          <ReInputText
            v-model="form.title"
            label="Subjek Tiket"
            placeholder="Tuliskan judul tiket yang singkat, padat dan mudah dipahami konteksnya"
            :error="v$.title.$error ? v$.title.$errors[0].$message : ''"
            @change="v$.title?.$touch"
          />
          <div class="space-y-2">
            <h1>
              Deskripsi<span class="text-error">*</span>
            </h1>
            <ReTextEditor
              v-model="form.content"
              :inline-image="false"
              :error="v$.content.$error ? v$.content.$errors[0].$message : ''"
              :reset-files="resetFiles"
              @change="v$.content?.$touch"
              @upload="uploadFile($event)"
              @cancel-upload="files.splice($event, 1)"
            />
          </div>
        </div>
        <div class="flex flex-row gap-4">
          <CButton text="Reset" type="text" color="error" class="w-full" @click="onReset()" />
          <CButton
            text="Buat Tiket"
            class="w-full"
            :loading="loading"
            @click="createTicket"
          />
        </div>
      </div>
    </div>
    <ModalCodePin
      v-if="shownCodePin"
      v-model="shownCodePin"
      :code-ticket="respCodeTicket"
      :esc-to-close="false"
      type="code-pin"
      title="Masukkan pin dan kode tiket yang telah dikirim ke Email"
      @success="goToTicket($event)"
      @closed="shownCodePin = false"
    />
  </div>
</template>