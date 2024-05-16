<script setup  lang="ts">

// eslint-disable-next-line import/default
import Toggle from '@vueform/toggle'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'

const { $api, $toast, $config } = useNuxtApp()
useHead({
  title: 'Login SSO'
})

definePageMeta({
  layout: 'custom',
  components: { Toggle }
})

const userLog = JSON.parse(localStorage.getItem('userLog') || '{ "email": "", "password": "" }')
const term = ref(false)
const formData = reactive({
  email: userLog.email,
  password: userLog.password
})
const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('The username field is required', required)
    },
    password: {
      required: helpers.withMessage('The password field is required', required),
      minLength: minLength(4)
    }
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  v$.value.$validate()
  if (!v$.value.$error) {
    try {
      const param = {
        username: formData.email,
        password: formData.password
      }
      const { data, error } = await $api.auth.postLoginSso(param)
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
            // get current role user
  
            localStorage.setItem('local', JSON.stringify(term.value))
            localStorage.setItem('auth', JSON.stringify(data.value?.data.authorization))
            localStorage.setItem('user', JSON.stringify(data.value?.data.user))
            if (term.value) {
              localStorage.setItem('userLog', JSON.stringify(formData))
            }
            useRouter().push('/')
          } else {
            $toast.warn('Silahkan melanjutkan ke dashboard Anda pada link berikut atau klik disini\n' + $config.public.loginDashboard, {
              onClick: () => window.location.href = $config.public.loginDashboard
            })
          }
        }
        if (userRole.error.value) $toast.error(userRole.error.value.data.message)
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

</script>
<template>
  <main class="flex items-center min-h-screen bg-primary" @keypress.enter="submitForm">
    <div class="flex flex-col items-center w-full h-full p-8">
      <div class="flex items-center h-full w-full sm:w-1/2 xl:w-1/3">
        <div
          class="flex flex-col items-center justify-center w-full h-full p-12 bg-white  rounded-2xl"
          style="box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.10); overflow: hidden; gap: 32px;"
        >
          <img src="/logo-auth.png" alt="Logo B-CARE">
          <div style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 16px; display: flex">
            <div style="align-self: stretch; color: #2953A1; font-size: 24px; font-family: Poppins; font-weight: 700; word-wrap: break-word">
              Login SSO
            </div>
            <div class="w-full">
              <ReInputText
                v-model="formData.email"
                label="Username"
                type="text"
                placeholder="Masukkan Username Anda"
                :error="`${v$.email.$error?v$.email.$errors[0].$message:''}`"
                @change="v$.email?.$touch"
              />
            </div>
            <div class="w-full mt-2 ">
              <div class="flex">
                <label>Password</label>
                <div class=" text-error">
                  *
                </div>
              </div>
              <ReInputText
                v-model="formData.password"
                type="password"
                placeholder="Masukkan Password Anda"
                :require="false"
                :error="`${v$.password.$error?v$.password.$errors[0].$message:''}`"
                @change="v$.password?.$touch"
              />
            </div>
            <div class="flex w-full mt-2 ">
              <Toggle v-model="term" />
              <div class="ml-2 text-sm  text-neutral-500">
                Ingat Saya
              </div>
            </div>
          </div>
          <CButton class="w-full" text="Login" @click="submitForm()" />
        </div>
      </div>
    </div>
  </main>
</template>
