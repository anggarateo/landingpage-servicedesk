<script lang="ts" setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import ModalRating from '~/pages/ticket/components/ModalRating.vue'
import ModalConfirm from '~/pages/ticket/components/ModalConfirm.vue'
import PrintForm from '~/pages/ticket/components/PrintForm.vue'

useHead({ title: 'Detail Ticket' })
definePageMeta({
  alias: '/tiket',
  components: {
    EditorContent
  }
})

const { $isLoggedIn, $api, $toast } = useNuxtApp()
const detail = ref()
const content = useEditor({
  content: `<p>Saya mengalami masalah saat mencoba untuk login ke sistem B-Pos. Setiap kali saya memasukkan username dan password, halaman login tidak merespons dan saya tidak dapat mengakses akun saya. Masalah ini telah terjadi selama dua hari terakhir dan telah saya coba di beberapa perangkat dan browser yang berbeda, tetapi tetap tidak berhasil.</p><p><strong>Langkah-langkah yang Sudah Dilakukan:</strong></p><ul><li><p>Sudah mencoba login menggunakan perangkat komputer dan ponsel.</p></li><li><p>Sudah membersihkan cache dan cookies browser.</p></li><li><p>Sudah mencoba menggunakan browser Google Chrome dan Mozilla Firefox</p></li></ul>`,
  editable: false,
  extensions: [ StarterKit ]
})
const reply = ref()
const loading = ref(true)
const files = ref(Array())
const idTicket = ref()
const disButton = ref(false)
const chats = ref(Array())
const guestToken = ref()
const page = ref(1)
const totalResult = ref(0)
const shownRating = ref(false)
const shownConfirm = ref(false)
const confirmType = ref()
const statusTicket = ref()
const flows = ref(Array())
const activeMobileTab = ref('chat')
const showPrintForm = ref(false)

onMounted(async () => {
  await fetching()
})

async function fetching () {
  loading.value = true
  idTicket.value = useRoute().params.idLandingpage
  const split = idTicket.value.split('-')
  if (split.length === 3) {
    guestToken.value = {
      code_ticket: codePinTicket.decrypt(split).code,
      pin_ticket: codePinTicket.decrypt(split).pin
    }
    await getByPin()
  } else {
    await getDetail()
  }
  statusTicket.value = statusTicketString(detail.value.status_ticket.id)
  chats.value = []
  await listChat()
  await getFlows()
  loading.value = false
}

const getDetail = async () => {
  const {
    data,
    error,
    pending
  } = await $api.ticket.getById(idTicket.value)
  if (data.value) detail.value = data.value.data
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
}
const listChat = async ($state?: any) => {
  disButton.value = true
  const {
    data,
    error,
    pending
  } = await $api.chat[$isLoggedIn() ? 'list' : 'listGuest'](idTicket.value, { ...guestToken.value, page: page.value, per_page: 4 })
  if (data.value) {
    chats.value.unshift(...data.value.data.result.slice().reverse())
    totalResult.value = data.value.data.total_count
    // if (data.value.data.total_page > 1 && data.value.data.result.length > 0) {
    //   page.value++
    //   chats.value.push(...data.value.data.result)
    //   $state?.loaded()
    // }
    // else {
    //   if (data.value.data.total_page === 1) chats.value = data.value.data.result
    //   $state?.complete()
    // }
  }
  if (error.value) {
    $toast.error(error.value.data.message)
    $state?.error()
  }
  if (pending.value) disButton.value = pending.value
  disButton.value = false
}
const fileChat = async (e: any) => {
  let file
  $isLoggedIn() ? file = {
    image: e.target.files[0]
  } : file = {
    ...guestToken.value,
    image: e.target.files[0]
  }
  disButton.value = true
  const {
    data,
    error,
    pending
  } = await $api.chat[$isLoggedIn() ? 'uploadImage' : 'uploadImageGuest'](jsonToFormData(file))
  if (data.value) files.value.push({ ...data.value.data, is_updated: false, is_deleted: false })
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) disButton.value = pending.value
  disButton.value = false
}
const storeFile = async (chatId: String) => {
  disButton.value = true
  const {
    data,
    error,
    pending
  } = await $api.chat[$isLoggedIn() ? 'storeImage' : 'storeImageGuest']({ trx_ticket_chat_id: chatId, image: files.value, ...guestToken.value })
  if (data.value) files.value.pop()
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) disButton.value = pending.value
  disButton.value = false
}
const chatting = async () => {
  let body
  $isLoggedIn() ?
    body = { trx_ticket_id: idTicket.value, message: reply.value } :
    body = {
      ...guestToken.value,
      trx_ticket_id: idTicket.value,
      message: reply.value
    }
  disButton.value = true
  const {
    data,
    error,
    pending
  } = await $api.chat[$isLoggedIn() ? 'create' : 'createGuest'](body)
  if (data.value) {
    if (files.value.length) await storeFile(data.value.data.id)
    // chats.value = []
    // page.value = 1
    listChat()
    reply.value = ''
  }
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) disButton.value = pending.value
  disButton.value = false
}
const getByPin = async () => {
  const {
    data,
    error,
    pending
  } = await $api.ticket.getByPin(guestToken.value.code_ticket, { pin: guestToken.value.pin_ticket })
  if (data.value) {
    idTicket.value = data.value.data.id
    detail.value = data.value.data
  }
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
}
function showMore () {
  page.value++
  listChat()
}
function onRating (e: any) {
  if (e) {
    shownRating.value = false
    $toast.success('Nilai berhasil diberikan')
    fetching()
  }
}
function onConfirm (e: any) {
  shownConfirm.value = false
  $toast.success(e)
  fetching()
}
async function getFlows () {
  let param
  $isLoggedIn() ?
    param = idTicket.value :
    param = {
      code_ticket: guestToken.value.code_ticket,
      pin: guestToken.value.pin_ticket
    }
  const {
    data,
    error,
    pending
  } = await $api.ticket[$isLoggedIn() ? 'getInfoById' : 'getInfoByPin'](param)
  if (data.value) flows.value = data.value.data
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
}
</script>
<template>
  <div>
    <LandingpageLayoutHeader name="Daftar Tiket" detail="Detail Tiket" />
    <div class="p-5 md:p-10 lg:py-14 lg:px-20 space-y-8 md:space-y-16">
      <template v-if="loading">
        <SKeleton class="h-20 w-full"/>
        <div class="flex flex-row gap-16">
          <SKeleton class="h-40 w-full"/>
          <SKeleton class="hidden md:block h-40 w-1/3"/>
        </div>
      </template>
      <template v-else>
        <div class="space-y-2">
          <h1 class="text-primary-500 text-4xl font-bold">
            {{ detail?.title }}
          </h1>
          <div class="flex items-center gap-2">
            <h1>
              {{ detail?.code_ticket }}
            </h1>
            <div
              class="flex flex-row items-center p-1 px-2 gap-2 rounded-xl bg-primary/10 hover:bg-primary-100 text-primary-500 text-xs font-medium cursor-pointer select-none"
              @click="$copyToClipboard(detail?.code_ticket)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7.61922 6.38159C8.93172 7.69409 8.93172 9.81743 7.61922 11.1241C6.30672 12.4308 4.18339 12.4366 2.87672 11.1241C1.57005 9.81159 1.56422 7.68826 2.87672 6.38159" stroke="#2953A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.17805 7.82256C4.81305 6.45756 4.81305 4.24089 6.17805 2.87005C7.54305 1.49922 9.75971 1.50505 11.1305 2.87005C12.5014 4.23505 12.4955 6.45172 11.1305 7.82256" stroke="#2953A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <h1>
                Salin kode tiket
              </h1>
            </div>
            <CButton
              text=""
              class="!p-1.5 !text-xs"
              icon="material-symbols:print"
              :type="showPrintForm ? 'filled' : 'outlined'"
              @click="showPrintForm = !showPrintForm"
            />
          </div>
          <PrintForm
            v-if="showPrintForm"
            :code-ticket="detail.code_ticket"
          />
          <div>
            <ChatBox
              :value="detail.content"
              class-wrapper="p-0 text-neutral-400"
            />
            <div
              v-for="(file, i) in detail?.files"
              :key="i"
              class="flex flex-wrap"
            >
              <Icon name="material-symbols:image" color="#2953A1" size="24" />
              <div
                class="text-neutral-500 hover:underline cursor-pointer"
                @click="$onPreviewFile(file)"
              >
                <span class="text-primary-600">{{ file.filename }}</span> {{ file.size }} KB
              </div>
            </div>
          </div>
        </div>
        <div>
          <Tab
            :tabs="[
              { id: 'chat', name: 'Chat' },
              { id: 'info', name: 'Info' }
            ]"
            :active-tab="activeMobileTab"
            type="underlined-primary"
            styles="font-semibold rounded-lg m-2 mx-1"
            class="block md:hidden"
            @switch-tab="activeMobileTab = $event.id"
          />
          <div class="flex flex-col md:flex-row gap-8 lg:gap-16">
            <div
              class="py-9 px-8 space-y-16 w-full shadow"
              :class="activeMobileTab === 'chat' ? 'block' : 'hidden md:block'"
            >
              <div class="flex flex-row justify-center">
                <CLabelText
                  :text="`Dibuat oleh ${detail.user.fullname || detail.user.name} ${detail?.transaction_date_format}`"
                  text-color="text-neutral-600/60"
                  text-size="text-xs"
                  class="w-fit text-center"
                />
              </div>
              <div class="flex flex-col gap-8 items-center max-h-[calc(100vh-75px)] overflow-auto">
                <div
                  v-if="chats.length < totalResult"
                  title="Tampilkan pesan sebelumnya"
                  class="text-primary-500 cursor-pointer rounded-full border border-stroke flex items-center hover:bg-primary-100 text-2xl"
                  @click="showMore()"
                >
                  <Icon name="mingcute:arrows-up-fill" />
                </div>
                <div
                  v-for="(chat) in chats"
                  :key="chat.id"
                  :class="{
                    'items-end': chat.position === 'right',
                    'items-start': chat.position === 'left'
                  }"
                  class="flex flex-col gap-2 w-full"
                >
                  <ChatBox :value="chat.message" :position="chat.position" :files="chat.image" />
                  <h1 class="text-xs text-secondary-text">
                    {{ chat.send_date }}
                  </h1>
                </div>
                <!-- <infinite-loading @infinite="listChat">
                  <template #complete>
                    <span />
                  </template>
                </infinite-loading> -->
              </div>
              <div class="space-y-6">
                <div class="space-y-1">
                  <h1 class="text-xl font-semibold">
                    Tuliskan Balasan
                  </h1>
                  <h1 class="text-secondary-text">
                    Tuliskan balasan Anda dibawah ini
                  </h1>
                </div>              
                <ReTextEditor
                  v-model="reply"
                  :inline-image="false"
                  btn-confirm="Kirim Balasan"
                  :loading-btn="disButton"
                  @upload="fileChat($event)"
                  @cancel-upload="files.splice($event, 1)"
                  @confirmed="chatting"
                />
              </div>
            </div>
            <div
              class="p-8 rounded space-y-6 shadow w-full md:w-2/5"
              :class="activeMobileTab === 'info' ? 'block' : 'hidden md:block'"
            >
              <CButton
                v-if="statusTicket === 'progress'"
                text="Close Tiket"
                color="error"
                @click="
                  shownConfirm = true,
                  confirmType = 'close'
                "
              />
              <CButton
                v-if="statusTicket === 'close' || statusTicket === 'resolved'"
                text="Re-Open Tiket"
                @click="
                  shownConfirm = true,
                  confirmType = 're-open'
                "
              />
              <div class="space-y-1">
                <h1 class="text-neutral-600 font-semibold">
                  Penilaian Diberikan
                </h1>
                <div v-if="detail.rating">
                  <CRatingStar
                    :rating="detail.rating?.grade"
                    readonly
                  />
                  <h1 class="text-neutral-400">
                    {{ detail.rating?.message }}
                  </h1>
                </div>
                <CButton
                  v-else
                  text="Berikan Nilai"
                  type="outlined"
                  @click="shownRating = true"
                />
              </div>
              <div class="space-y-1">
                <h1 class="text-neutral-600 font-semibold">
                  Status Tiket
                </h1>
                <CLabelText
                  :text="detail.status_ticket.name"
                  :text-color="$colorLabel(detail.status_ticket.id).text"
                  :bg-color="$colorLabel(detail.status_ticket.id).bg"
                  text-size="text-xs"
                />
              </div>
              <div class="space-y-1">
                <h1 class="text-neutral-600 font-semibold">
                  Tingkat Dampak
                </h1>
                <CLabelText
                  :text="detail.impact_level.name"
                  :text-color="$colorLabel(detail.impact_level.id).text"
                  :bg-color="$colorLabel(detail.impact_level.id).bg"
                  text-size="text-xs"
                />
              </div>
              <div class="space-y-1">
                <h1 class="text-neutral-600 font-semibold">
                  SLA
                </h1>
                <LabelTime>{{ detail?.total_sla }}</LabelTime>
              </div>
              <div class="space-y-1">
                <h1 class="text-neutral-600 font-semibold">
                  Layanan
                </h1>
                <h1>
                  {{ detail?.service?.name }}
                </h1>
              </div>
              <div class="space-y-1">
                <h1 class="text-neutral-600 font-semibold">
                  Tiket Dibuat
                </h1>
                <h1>
                  {{ detail?.transaction_date_format }}
                </h1>
              </div>
              <div class="space-y-1">
                <h1 class="text-neutral-600 font-semibold">
                  Respon Terakhir
                </h1>
                <h1 :class="{ 'text-neutral-300': !detail?.updated_at }">
                  {{ detail?.updated_at ? $formatDate(detail?.updated_at, 'dd MMMM yyyy - HH:mm', { locale: $localeId() }).replace(/-/g, 'Pukul') : 'Tidak ada'}}
                </h1>
              </div>
              <div v-if="detail?.is_flow_show_in_user">
                <h1 class="text-neutral-600 font-semibold mb-2">
                  Alur Tiket
                </h1>
                <TimeLine :items="flows" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <ModalRating
      v-if="shownRating"
      v-model="shownRating"
      :id-ticket="idTicket"
      @success="onRating($event)"
    />
    <ModalConfirm
      v-if="shownConfirm"
      v-model="shownConfirm"
      :type="confirmType"
      :id-ticket="idTicket"
      :guest-token="guestToken"
      @success="onConfirm($event)"
    />
  </div>
</template>