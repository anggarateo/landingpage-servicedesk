// 3rd's
import { $fetch, FetchOptions } from 'ofetch'

// locals
import AuthModule from '~/repository/modules/auth/auth'
import GlobalModule from '~/repository/modules/index'
import { GetRoleModule, PostRoleModule } from '~/repository/modules/role'
import FaqModule from '~/repository/modules/faq'
import ProfileModule from '~/repository/modules/auth/profile'
import CatalogueModule from '~/repository/modules/catalogue'
import TicketModule from '~/repository/modules/ticket'
import ChatModule from '~/repository/modules/chat'
import NotificationModule from '~/repository/modules/notification'
import RegisterModule from '~/repository/modules/auth/register'
import ReportModule from '~/repository/modules/report'

interface IApiInstance {
  auth: AuthModule;
  global: GlobalModule;
  role: { get: GetRoleModule, post: PostRoleModule };
  faq: FaqModule;
  profile: ProfileModule
  catalogue: CatalogueModule
  ticket: TicketModule
  chat: ChatModule
  notification: NotificationModule
  register: RegisterModule
  report: ReportModule
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
    auth: new AuthModule(apiFecther),
    global: new GlobalModule(apiFecther),
    role: { get: new GetRoleModule(apiFecther), post: new PostRoleModule(apiFecther) },
    faq: new FaqModule(apiFecther),
    profile: new ProfileModule(apiFecther),
    catalogue: new CatalogueModule(apiFecther),
    ticket: new TicketModule(apiFecther),
    chat: new ChatModule(apiFecther),
    notification: new NotificationModule(apiFecther),
    register: new RegisterModule(apiFecther),
    report: new ReportModule(apiFecther)
  }

  return {
    provide: {
      api: modules
    }
  }
})
