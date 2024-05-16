<script lang="ts" setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['updated'])

const { $config } = useNuxtApp()

const avatar = ref()
const inputFile = ref()
const profile = ref({
  firstname: '',
  // lastname: '',
  // username: '',
  email: '',
  address: '',
  phone: '',
  avatar: null
})
const payload = ref({
  firstname: '',
  email: '',
  address: '',
  phone: '',
  avatar: null
})

const preview = (file: any) => {
  avatar.value = URL.createObjectURL(file)
  profile.value.avatar = file
}

watch(() => profile.value, (val) => {
  if (val) {
    payload.value.firstname = val.firstname
    payload.value.email = val.email
    payload.value.address = val.address
    payload.value.phone = `62${val.phone}`
    payload.value.avatar = val.avatar
    emit('updated', payload.value)
  }
}, {
  deep: true
})
watch(() => props.loading, () => {
  profile.value.firstname = props.user.firstname
  // profile.value.lastname = props.user.lastname
  // profile.value.username = props.user.username
  profile.value.email = props.user.email
  profile.value.address = props.user.address
  
  if (props.user.phone?.length >= 2 && props.user.phone[0] === '6' && props.user.phone[1] === '2') {
    profile.value.phone = props.user.phone.substring(2, props.user.phone.length)
  } else {
    profile.value.phone = props.user.phone
  }

  avatar.value = props.user.avatar
  emit('updated', profile.value)
})
</script>
<template>
  <div>
    <div v-if="loading" class="flex flex-col items-center gap-4">
      <SKeleton class="w-36 h-36 rounded-full" />
      <SKeleton v-for="i in 3" :key="i" class="w-full h-12 rounded-lg" />
    </div>
    <template v-else>
      <div class="flex flex-row justify-center">
        <div class="flex flex-col gap-4 items-center">
          <Avatar :avatar="avatar" :name="profile.firstname" :size="36" text-class="text-8xl"/>
          <div class="flex flex-col items-center md:flex-row gap-2">
            <CButton
              text="Upload Foto Baru"
              @click="inputFile.click()"
            />
            <input
              ref="inputFile"
              class="hidden"
              type="file"
              accept="image/*"
              @change="preview($event.target.files[0])"
            >
            <CButton
              text="Hapus"
              type="outlined"
              color="error"
              @click="avatar = '', profile.avatar = null"
            />
          </div>
        </div>
      </div>
      <div class="space-y-6">
        <ReInputText label="Nama" v-model="profile.firstname" />
        <!-- <ReInputText label="Nama Belakang" v-model="profile.lastname" /> -->
        <!-- <ReInputText label="Username" v-model="profile.username" /> -->
        <ReInputText label="Email" v-model="profile.email" />
        <ReInputText label="Alamat" v-model="profile.address" />
        <ReInputText
          label="Nomor Telepon"
          v-model="profile.phone"
          icon="left"
          inputmode="tel"
          type="number"
          placeholder="8XX"
        >
          <template #icon>
            <h1 class="text-neutral-400 font-medium">
              +62
            </h1>
          </template>
        </ReInputText>
      </div>
    </template>
  </div>
</template>