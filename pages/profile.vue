<script lang="ts" setup>
import jsonToFormData from '~/utils/jsonToFormData'

useHead({ title: 'Profile' })
definePageMeta({
  alias: '/profil',
  middleware: 'auth'
})

const user = ref()
const activeTab = ref('profile')
const disButton = ref(false)
const updateProfile = ref()
const updatePassword = ref()
const resetPassword = ref(false)
const loading = ref(false)
const invalid = ref({
  minLength: false,
  minCapital: false,
  minNumber: false,
  isNew: '',
  confirmed: ''
})
const { $api, $toast, $localUser } = useNuxtApp()
const getData = async () => {
  disButton.value = true
  loading.value = true
  const {
    data,
    pending,
    error
  } = await $api.profile.getProfile()
  if (data.value) user.value = data.value.data
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) disButton.value = pending.value
  disButton.value = false
  loading.value = false
}
getData()
const onUpdate = async () => {
  disButton.value = true
  loading.value = true
  let body
  activeTab.value === 'profile' ? body = jsonToFormData(updateProfile.value) : activeTab.value === 'password' ? body = jsonToFormData(updatePassword.value) : body = new FormData()
  const {
    data,
    pending,
    error
  } = await $api.profile.updateProfile(body)
  if (data.value) {
    $toast.success('Profil telah diperbarui')
    user.value = data.value.data
    activeTab.value = 'profile'

    if (activeTab.value === 'profile') {
      const localUser = {
        ...$localUser(),
        firstname: data.value.data.firstname,
        email: data.value.data.email,
        address: data.value.data.address,
        phone: data.value.data.phone
      }
      
      localStorage.setItem('user', JSON.stringify(localUser))
    }
  }
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) disButton.value = pending.value
  resetPassword.value = true
  disButton.value = false
  loading.value = false
}

watch(() => activeTab.value, (val) => {
  if (val === 'password' && !updatePassword.value) disButton.value = true
  else disButton.value = false
})

function validation (val = invalid.value) {
  if (activeTab.value === 'profile') {
    return onUpdate()
  } else if (activeTab.value === 'password') {
    if (val.minLength && val.minCapital && val.minNumber && !val.isNew && !val.confirmed) {
      return onUpdate()
    } else if (!val.minLength) {
      return $toast.warn('Minimal 8 karakter')
    } else if (!val.minCapital) {
      return $toast.warn('Mengandung setidaknya 1 huruf besar')
    } else if (!val.minNumber) {
      return $toast.warn('Mengandung setidaknya 1 angka')
    } else if (val.isNew) {
      return $toast.warn(val.isNew)
    } else if (val.confirmed) {
      return $toast.warn(val.confirmed)
    }
  }
}
</script>
<template>
  <div>
    <LandingpageLayoutHeader name="Pengaturan Profil" />
    <div class="p-10 md:py-20 md:px-24 space-y-2" @keypress.enter="validation()">
      <!-- <div class="w-1/4 p-8 space-y-8 font-semibold rounded-2xl shadow-md">
        <h1
          :class="activeTab === 'profile' ? 'text-primary-500' : 'text-neutral-300 cursor-pointer'"
          @click="activeTab = 'profile'"
        >
          Edit Profil
        </h1>
        <h1
          :class="activeTab === 'password' ? 'text-primary-500' : 'text-neutral-300 cursor-pointer'"
          @click="activeTab = 'password'"
        >
          Kata Sandi
        </h1>
      </div> -->
      <Tab
        :tabs="[
          { id: 'profile', name: 'Edit Profil' },
          { id: 'password', name: 'Kata Sandi' }
        ]"
        :active-tab="activeTab"
        type="underlined-primary"
        styles="font-semibold rounded-lg m-2 mx-1"
        @switch-tab="activeTab = $event.id"
      />
      <div class="w-full p-8 space-y-10 shadow-md rounded-lg">
        <LandingpageProfileEdit
          v-show="activeTab === 'profile'"
          :user="user"
          :loading="loading"
          @updated="updateProfile = $event"
        />
        <LandingpageProfilePassword
          v-show="activeTab === 'password'"
          :reset-form="resetPassword"
          @updated="disButton = false, updatePassword = $event"
          @invalid="disButton = true, invalid = $event"
          @reset="resetPassword = false"
        />
        <div class="flex flex-row justify-end">
          <CButton
            text="Simpan Perubahan"
            :disabled="disButton"
            @click="validation()"
          />
        </div>
      </div>
    </div>
  </div>
</template>