<script setup lang="ts">
// eslint-disable-next-line import/default
import vueRecaptcha from 'vue3-recaptcha2'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers, sameAs, numeric } from '@vuelidate/validators'
import { useAuthStore } from '@/store/auth'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo
} from 'firebase/auth'

const { $api, $toast, $config } = useNuxtApp()
useHead({
  title: 'Register'
})

definePageMeta({
  layout: 'custom',
  components: {
    vueRecaptcha
  }
})

const store = useAuthStore()

const formData = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  // username: '',
  firstname: '',
  lastname: '',
  nik: '',
  phone: ''
})
const rePassword = ref()
const validator = ref({
  minLength: false,
  minCapital: false,
  minNumber: false,
  confirmed: '',
  email: {
    value: false,
    text: ''
  }
})
const disButton = ref(true)
const passwordType = ref('password')
const rePasswordType = ref('password')

watch(() => formData.email, (val) => {
  if (val) {
    const res = val.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    if (res) {
      validator.value.email.value = true
      validator.value.email.text = ''
    } else {
      validator.value.email.value = false
      validator.value.email.text = 'Email tidak valid'
    }
  } else {
    validator.value.email.value = false
    validator.value.email.text = ''
  }
})
watch(() => formData.password, (val) => {
  const capitals: any[] = []
  if (val) {
    val.length >= 8 ? validator.value.minLength = true : validator.value.minLength = false
    for (let i = 0; i < val.length; i++) {
      if (val[i] === val[i].toUpperCase() && !val[i].match(/(\d+)/)) { capitals.push(val[i]) }
    }
    capitals.length ? validator.value.minCapital = true : validator.value.minCapital = false
    val.match(/(\d+)/) ? validator.value.minNumber = true : validator.value.minNumber = false
    rePassword.value && rePassword.value !== val ? validator.value.confirmed = 'Konfirmasi password tidak sesuai!' : validator.value.confirmed = ''
  } else {
    capitals.pop()
    validator.value.minLength = false
    validator.value.minCapital = false
    validator.value.minNumber = false
    validator.value.confirmed = ''
  }
}, {
  deep: true
})
watch(() => rePassword.value, (val) => {
  if (val) {
    formData.password && formData.password !== val ? validator.value.confirmed = 'Konfirmasi password tidak sesuai!' : validator.value.confirmed = ''
  } else {
    validator.value.confirmed = ''
  }
})
watch(() => validator.value, (val) => {
  if (val.minLength && val.minCapital && val.minNumber && !val.confirmed && formData && rePassword.value && val.email.value) {
    disButton.value = false
  } else {
    disButton.value = true
  }
}, {
  deep: true
})

const recaptcha = ref()

const recaptchaVerified = (response: any) => {
  console.log('verified', response)
}
const recaptchaExpired = () => {
  recaptcha.value.reset()
}
const recaptchaFailed = () => {
  $toast.error('ReCaptcha Failed!')
}
const recaptchaError = (reason: any) => {
  $toast.error(reason)
}

const patternNikRegex: any = /^(1[1-9]|21|[37][1-6]|5[1-3]|6[1-5]|[89][12])\d{2}\d{2}([04][1-9]|[1256][0-9]|[37][01])(0[1-9]|1[0-2])\d{2}\d{4}$/gm
const checkNik = helpers.regex(patternNikRegex)

const isNumber = (evt: any) => {
  evt = (evt) || window.event
  const charCode = (evt.which) ? evt.which : evt.keyCode
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault()
  } else {
    return true
  }
}

const rules = computed(() => {
  return {
    // username: {
    //   required: helpers.withMessage('The username field is required', required)
    // },
    firstname: {
      required: helpers.withMessage('The firstname field is required', required)
    },
    lastname: {
      required: helpers.withMessage('The firstname field is required', required)
    },
    nik: {
      checkNik: helpers.withMessage('Nik yang Anda masukkan tidak valid', checkNik),
      minLength: minLength(16)
    },
    phone: {
      required: helpers.withMessage('The phone field is required', required),
      numeric: helpers.withMessage('The phone should be number', numeric)
    },
    email: {
      required: helpers.withMessage('The email field is required', required),
      email: helpers.withMessage('Invalid email format', email)
    }
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  v$.value.$validate()

  if (!v$.value.$error) {
    try {
      const param = {
        email: formData.email,
        password: formData.password,
        // username: formData.username,
        firstname: formData.firstname,
        nik: formData.nik,
        phone: formData.phone,
        lastname: formData.lastname,
        device_id: store.device_id,
        token_fcm: store.token_fcm
      }
      const { data, error } = await $api.register.postRegister(param)

      if (data.value) {
        $toast.success('Registrasi akun berhasil, silahkan cek email untuk verifikasi akun', {
          onClose: () => useRouter().push('/auth/login')
        })
      }

      if (error.value) {
        const val:any = error.value
        $toast.error(val.data.message)
      }
    } catch (e:any) {
      $toast.warn('Connetion Error')
    }
    // example using cookie
  } else {
    $toast.warn('pastikan form sudah terisi!')
  }
}

const auth: any = getAuth()

const loginInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider()

  try {
    const result = await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.idToken

    const username = result.user?.email?.split('@') ?? ''

    const { data, error } = await $api.auth.postLoginSosmed({
      firstname: getAdditionalUserInfo(result)?.profile?.given_name,
      lastname: getAdditionalUserInfo(result)?.profile?.family_name,
      username: username[0],
      email: result.user?.email ?? '',
      google_account_id: getAdditionalUserInfo(result)?.profile?.id,
      facebook_account_id: null,
      device_id: store.device_id,
      token_fcm: store.token_fcm,
      id_token: token
    })

    if (data.value) {
      // get current role user
      const userRole = await $api.role.get.getRoleUser(data.value.data.authorization.token)
      if (userRole.data.value) {
        if (data.value.data.user.roles.find(el => el.name.toLowerCase() === 'pengadu')) {
          const role = {
            id: data.value.data.user.role.id,
            name: data.value.data.user.role.name,
            menus: userRole.data.value.data
          }
          localStorage.setItem('role', JSON.stringify(role))
          localStorage.setItem('avatar', result.user?.photoURL ?? '')
          // get current role user
          localStorage.setItem('auth', JSON.stringify(data.value?.data.authorization))
          localStorage.setItem('user', JSON.stringify(data.value?.data.user))  
          useRouter().replace('/')
        } else {
          $toast.warn('Silahkan melanjutkan ke dashboard Anda pada link berikut atau klik disini\n' + $config.public.loginDashboard, {
            onClick: () => window.location.href = $config.public.loginDashboard
          })
        }
      }
      if (userRole.error.value) { $toast.error(userRole.error.value.data?.message) }
    }
    if (error.value) {
      const val:any = error.value
      $toast.error(val.data.message)
    }
  } catch (error) {
  }
}
</script>
<template>
  <main class="min-h-screen flex items-center bg-primary" @keypress.enter="submitForm">
    <div class=" flex flex-col w-full h-full items-center p-8">
      <div class=" flex items-center h-full w-full sm:w-1/2 xl:w-1/3">
        <div
          class=" w-full h-full p-12 bg-white rounded-2xl justify-center flex flex-col items-center"
          style="box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.10); overflow: hidden; gap: 32px;"
        >
          <img src="/logo-auth.png" alt="Logo B-CARE">
          <div style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: flex">
            <div style="align-self: stretch; color: #2953A1; font-size: 24px; font-family: Poppins; font-weight: 700; word-wrap: break-word">
              Register
            </div>
            <ReInputText
              v-model="formData.firstname"
              class="w-full"
              label="Nama Depan"
              placeholder="Masukkan nama depan Anda"
              auto-complete="first-name"
              :error="`${v$.firstname.$error?v$.firstname.$errors[0].$message:''}`"
              @change="v$.firstname?.$touch"
            />
            <ReInputText
              v-model="formData.lastname"
              class="w-full"
              label="Nama Belakang"
              placeholder="Masukkan nama belakang Anda"
              auto-complete="family-name"
              :error="`${v$.lastname.$error ? v$.lastname.$errors[0].$message:''}`"
              @change="v$.lastname?.$touch"
            />
            <!-- <ReInputText
              v-model="formData.username"
              class="w-full"
              label="Username"
              placeholder="Masukkan username Anda"
              auto-complete="username"
              :error="`${v$.username.$error ? v$.username.$errors[0].$message:''}`"
              @change="v$.username?.$touch"
            /> -->
            <ReInputText
              v-model="formData.email"
              class="w-full"
              label="Email"
              type="email"
              placeholder="Masukkan email Anda"
              auto-complete="email"
              :error="validator.email.text"
              @change="v$.email?.$touch"
            />
            <ReInputText
              v-model="formData.nik"
              class="w-full"
              label="NIK"
              placeholder="Masukkan NIK Anda"
              :require="false"
              auto-complete="off"
              :error="`${v$.nik.$error ? v$.nik.$errors[0].$message:''}`"
              @keypress="isNumber"
              @change="v$.nik?.$touch"
            />
            <ReInputText
              v-model="formData.phone"
              class="w-full"
              label="Nomor Telepon"
              input-mode="tel"
              placeholder="Masukkan nomor telepon Anda"
              auto-complete="tel-extension"
              :error="`${v$.phone.$error ? v$.phone.$errors[0].$message:''}`"
              @change="v$.phone?.$touch"
            />
            <div class="space-y-2 w-full relative">
              <ReInputText
                v-model="formData.password"
                class="w-full"
                :type="passwordType"
                label="Kata Sandi"
                placeholder="Masukkan kata sandi Anda"
                auto-complete="off"
              />
              <Icon
                v-if="passwordType === 'password'"
                name="ic:baseline-remove-red-eye"
                class="absolute right-3 top-9 text-xl text-primary-400 cursor-pointer"
                @click="passwordType = 'text'"
              />
              <Icon
                v-else-if="passwordType === 'text'"
                name="zondicons:view-hide"
                class="absolute right-3 top-9 text-xl text-primary-400 cursor-pointer"
                @click="passwordType = 'password'"
              />
              <div class="pl-3 text-xs text-error-500">
                <div class="flex flex-row items-center gap-1" :class="{ 'text-success-500': validator.minLength }">
                  <Icon :name="validator.minLength ? 'ic:baseline-check' : 'ic:baseline-close'" />
                  <h1>
                    Minimal 8 karakter
                  </h1>
                </div>
                <div class="flex flex-row items-center gap-1" :class="{ 'text-success-500': validator.minCapital }">
                  <Icon :name="validator.minCapital ? 'ic:baseline-check' : 'ic:baseline-close'" />
                  <h1>
                    Mengandung setidaknya 1 huruf besar
                  </h1>
                </div>
                <div class="flex flex-row items-center gap-1" :class="{ 'text-success-500': validator.minNumber }">
                  <Icon :name="validator.minNumber ? 'ic:baseline-check' : 'ic:baseline-close'" />
                  <h1>
                    Mengandung setidaknya 1 angka
                  </h1>
                </div>
              </div>
            </div>
            <div class="relative w-full">
              <ReInputText
                v-model="rePassword"
                class="w-full"
                :type="rePasswordType"
                label="Ulangi Kata Sandi"
                placeholder="Ulangi kata sandi Anda"
                :error="validator.confirmed"
                auto-complete="off"
              />
              <Icon
                v-if="rePasswordType === 'password'"
                name="ic:baseline-remove-red-eye"
                class="absolute right-3 top-11 text-xl text-primary-400 cursor-pointer"
                @click="rePasswordType = 'text'"
              />
              <Icon
                v-else-if="rePasswordType === 'text'"
                name="zondicons:view-hide"
                class="absolute right-3 top-11 text-xl text-primary-400 cursor-pointer"
                @click="rePasswordType = 'password'"
              />
            </div>
            <vue-recaptcha
              v-show="true"
              ref="recaptcha"
              :sitekey="$config.public.reCaptchaSiteKey"
              hl="id"
              :loading-timeout="30000"
              @verify="recaptchaVerified"
              @expire="recaptchaExpired"
              @fail="recaptchaFailed"
              @error="recaptchaError"
            />
          </div>
          <CButton class="w-full" text="Register" @click="submitForm" />
          <div style="align-self: stretch; flex-direction: column; justify-content: center; align-items: center; gap: 8px; display: flex">
            <div style="width: 350px; height: 32px; position: relative">
              <div style="width: 250px; height: 0px; left: 50px; top: 16px; position: absolute; border: 0.50px #2953A1 solid" />
              <div style="height: 32px; padding: 8px; left: 95px; top: 0px; position: absolute; background: white; justify-content: center; align-items: center; gap: 8px; display: inline-flex">
                <div style="color: #7B809A; font-size: 14px; font-family: Poppins; font-weight: 400; line-height: 25.20px; word-wrap: break-word">
                  atau masuk dengan
                </div>
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-2">
              <div class="w-full">
                <a href="/auth/login-sso">
                  <CButton
                    class="w-full !py-2 !px-1.5"
                    type="outlined"
                    text="Portal BP Batam"
                    icon-img
                    icon="https://gitlab.bpbatam.go.id/uploads/-/system/appearance/header_logo/1/bp_batam.png"
                  />
                </a>
              </div>
              <div class="w-full">
                <CButton
                  class="w-full"
                  type="outlined"
                  text="Google"
                  icon="logos:google-icon"
                  @click="loginInWithGoogle"
                />
              </div>
            </div>
          </div>
          <h1 class="text-center text-primary-300">
            Sudah memiliki akun? <span><NuxtLink class="text-primary-500 font-bold hover:underline" to="/auth/login">Login</NuxtLink></span>
          </h1>
        </div>
      </div>
    </div>
  </main>
</template>
