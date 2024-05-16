// 3rd's
import { $fetch, FetchOptions } from 'ofetch'

// locals
import GlobalModule from '~/repository/modules/index'

interface IApiInstance {
  global: GlobalModule;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const loading = ref(true)
  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBaseUrl,
    // onRequest (val) {
    //   console.log('onRequest', val)
    //   // this.$root.$emit('component1')
    //   loading.value = true
    // },
    onResponse ({ response }) {
      loading.value = false
      if (response.status === 401) {
        useRouter().push('/auth/login')
      }
    }
  }
  // console.log('fetchOptions', loading.value)

  // Create a new instance of $fecther with custom option
  const apiFecther = $fetch.create(fetchOptions)

  // An object containing all repositories we need to expose
  const modules: IApiInstance = {
    global: new GlobalModule(apiFecther)
  }

  return {
    provide: {
      api: modules
    }
  }
})
