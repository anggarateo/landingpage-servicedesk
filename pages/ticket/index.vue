<script lang="ts" setup>
import { endOfMonth, endOfYear, startOfMonth, startOfYear, startOfWeek, endOfWeek } from 'date-fns'
import { useTicketStore } from '~/store/ticket'

useHead({ title: 'Ticket' })
definePageMeta({
  alias: '/tiket',
  middleware: 'auth'
})

const { $api, $toast, $formatDate } = useNuxtApp()
const date = ref()
const customDate = ref({
  startDate: null,
  endDate: null
})
const customDateateFilter = ref([
  {
    id: 'today',
    name: 'Hari ini',
    value: `today-${new Date()}-${new Date()}`
  },
  {
    id: 'this_week',
    name: 'Minggu ini',
    value: `this_week-${startOfWeek(new Date(), { weekStartsOn: 1 })}-${endOfWeek(new Date(), { weekStartsOn: 1 })}`
  },
  {
    id: 'this_month',
    name: 'Bulan ini',
    value: `this_month-${startOfMonth(new Date())}-${endOfMonth(new Date())}`
  },
  {
    id: 'this_year',
    name: 'Tahun ini',
    value: `this_year-${startOfYear(new Date())}-${endOfYear(new Date())}`
  },
  {
    id: 'custom',
    name: 'Custom',
    value: `custom-${customDate.value.startDate}-${customDate.value.endDate}`
  }
])
const tickets = ref()
const loading = ref(false)
const ticketStore = useTicketStore()
const statusOptions = ref(Array())
const priorityOptions = ref(Array())
const ratingOptions = ref([
  {
    label: 'Bintang 1',
    value: '1'
  },
  {
    label: 'Bintang 2',
    value: '2'
  },
  {
    label: 'Bintang 3',
    value: '3'
  },
  {
    label: 'Bintang 4',
    value: '4'
  },
  {
    label: 'Bintang 5',
    value: '5'
  }
])
const serviceOptions = ref(Array())
const initParams = () => ({
  status_ticket_id: null,
  impact_level_id: null,
  service_category_id: null,
  rating: null,
  transaction_date: '',
  end_date: '',
  q: ''
})
const serverParams = ref(initParams())
const showFilter = ref(false)

watch(() => date.value, (val) => {
  const date = val.split('-')
  if (val && date[0] !== 'custom') {
    serverParams.value.transaction_date = $formatDate(date[1], 'yyyy-MM-dd')
    serverParams.value.end_date = $formatDate(date[2], 'yyyy-MM-dd')
  }
})
watch(() => customDate.value, (val) => {
  if (val.startDate && val.endDate) {
    serverParams.value.transaction_date = $formatDate(val.startDate, 'yyyy-MM-dd')
    serverParams.value.end_date = $formatDate(val.endDate, 'yyyy-MM-dd')
  }
}, { deep: true })
watch(() => serverParams.value, (val) => {
  if (Object.keys(val).includes('status_ticket_id[]') && !val['status_ticket_id[]']?.length) delete serverParams.value['status_ticket_id[]']
  if (Object.keys(val).includes('impact_level_id[]') && !val['impact_level_id[]']?.length) delete serverParams.value['impact_level_id[]']
  if (Object.keys(val).includes('service_category_id[]') && !val['service_category_id[]']?.length) delete serverParams.value['service_category_id[]']
  if (Object.keys(val).includes('rating[]') && !val['rating[]']?.length) delete serverParams.value['rating[]']
  getData()
}, { deep: true })

const resetFilter = () => {
  serverParams.value = initParams()
}
const getData = async () => {
  loading.value = true
  const {
    data,
    error,
    pending
  } = await $api.ticket.getList(serverParams.value)
  if (data.value) tickets.value = data.value
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  loading.value = false
}
getData()
async function getServiceFilter () {
  loading.value = true
  const {
    data,
    error,
    pending
  } = await $api.ticket.getServiceFilter()
  if (data.value) {
    data.value.data.forEach((el: { name: String, id: String }) => {
      serviceOptions.value.push({
        label: el.name,
        value: el.id
      })
    })
  }
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  loading.value = false
}
getServiceFilter()
async function getStatusTicket () {
  loading.value = true
  const {
    data,
    error,
    pending
  } = await $api.ticket.getStatusTicket()
  if (data.value) {
    data.value.data.forEach((el: { name: String, id: String }) => {
      statusOptions.value.push({
        label: el.name,
        value: el.id
      })
    })
  }
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  loading.value = false
}
getStatusTicket()
async function getImpacts () {
  loading.value = true
  const {
    data,
    error,
    pending
  } = await $api.ticket.getImpacts()
  if (data.value) {
    data.value.data.forEach((el: { name: String, id: String }) => {
      priorityOptions.value.push({
        label: el.name,
        value: el.id
      })
    })
  }
  if (error.value) $toast.error(error.value.data.message)
  if (pending.value) loading.value = pending.value
  loading.value = false
}
getImpacts()

onMounted(() => {
  if (ticketStore.codeTicket) serverParams.value.q = ticketStore.codeTicket
})
</script>
<template>
  <div>
    <LandingpageLayoutHeader name="Daftar Tiket" />
    <div class="p-5 md:p-10 lg:p-20 flex flex-col lg:flex-row gap-16">
      <div class="flex flex-col sm:flex-row gap-4 justify-between">
        <CButton
          class="sm:hidden"
          :type="showFilter ? 'outlined' : 'filled'"
          :text="`${showFilter ? 'Sembunyikan' : 'Tampilkan'} Filter`"
          @click="showFilter = !showFilter"
        />
        <div class="flex flex-col p-8 gap-8 shadow-lg rounded-xl w-max h-max">
          <ReInputText
            v-model="serverParams.q"
            class="w-max"
            type="text"
            placeholder="Cari Kode/Subjek Tiket"
            icon="left"
            :require="false"
          >
            <template #icon>
              <Icon name="circum:search" color="black" size="22" />
            </template>
          </ReInputText>
          <div class="space-y-4" :class="showFilter ? 'block' : 'hidden lg:block'">
            <h1 class="font-bold">
              Status Tiket
            </h1>
            <div class="ml-2 space-y-4">
              <CheckBoxMulti v-model="serverParams['status_ticket_id[]']" :options="statusOptions" />
            </div>
          </div>
          <div class="space-y-4" :class="showFilter ? 'block' : 'hidden lg:block'">
            <h1 class="font-bold">
              Prioritas Tiket
            </h1>
            <div class="ml-2 space-y-4">
              <CheckBoxMulti v-model="serverParams['impact_level_id[]']" :options="priorityOptions" />
            </div>
          </div>
          <div class="space-y-4" :class="showFilter ? 'block' : 'hidden lg:block'">
            <h1 class="font-bold">
              Layanan Tiket
            </h1>
            <div class="ml-2 space-y-4">
              <CheckBoxMulti v-model="serverParams['service_category_id[]']" :options="serviceOptions" />
            </div>
          </div>
          <div class="space-y-4" :class="showFilter ? 'block' : 'hidden lg:block'">
            <h1 class="font-bold">
              Penilaian
            </h1>
            <div class="ml-2 space-y-4">
              <CheckBoxMulti v-model="serverParams['rating[]']" :options="ratingOptions" />
            </div>
          </div>
          <div class="space-y-4" :class="showFilter ? 'block' : 'hidden lg:block'">
            <h1 class="font-bold">
              Tanggal
            </h1>
            <div class="ml-2 space-y-4">
              <RadioBox v-for="(filter, i) in customDateateFilter" :key="i" v-model="date" :id="filter.id" :value="filter.value">
                {{ filter.name }}
              </RadioBox>
              <div v-if="date?.split('-')[0] === 'custom'" class="flex flex-row gap-1 items-center w-[305px] !mt-1">
                <DatePicker
                  v-model="customDate.startDate"
                  :preset-range="false"
                  hide-input-icon
                  placeholder="DD/MM/YYYY"
                  format="dd/MM/yyyy"
                  text-input
                />
                <h1>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none">
                    <path d="M1 5.5H16" stroke="#051B44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11 0.5L16 5.5L11 10.5" stroke="#051B44" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </h1>
                <DatePicker
                  v-model="customDate.endDate"
                  :preset-range="false"
                  hide-input-icon
                  placeholder="DD/MM/YYYY"
                  format="dd/MM/yyyy"
                  text-input
                  :min-date="customDate.startDate"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="block lg:hidden flex flex-col justify-between">
          <CButton
            :type="showFilter ? 'outlined' : 'filled'"
            :text="`${showFilter ? 'Sembunyikan' : 'Tampilkan'} Filter`"
            @click="showFilter = !showFilter"
          />
          <CButton
            class="hidden sm:block"
            :type="showFilter ? 'outlined' : 'filled'"
            :text="`${showFilter ? 'Sembunyikan' : 'Tampilkan'} Filter`"
            @click="showFilter = !showFilter"
          />
        </div>
      </div>
      <div class="p-2 md:p-8 flex flex-col gap-6 w-full">
        <div class="flex flex-row justify-between items-center">
          <h1 class="text-xl font-semibold">
            {{ tickets?.meta?.total }} <span class="text-secondary-text">Total Tiket</span>
          </h1>
          <CButton
            v-if="JSON.stringify(serverParams) !== JSON.stringify(initParams())"
            text="Reset Filter"
            icon="material-symbols:sync"
            @click="resetFilter"
          />
        </div>
        <div class="border-2" />
        <SKeleton v-if="loading" class="w-full h-40 rounded-lg" />
        <div v-else class="flex flex-col gap-4">
          <NuxtLink
            v-for="(ticket, t) in tickets?.data"
            :key="t"
            :to="`/ticket/${ticket.id}/detail`"
            class="flex flex-col md:flex-row md:items-center px-6 py-4 gap-2 border border-stroke rounded-lg hover:shadow"
          >
            <div class="space-y-2 w-full">
              <h1 class="text-secondary-text">
                {{ ticket?.code_ticket }}
              </h1>

              <h1 class="font-semibold">
                {{ ticket?.title }}
              </h1>
              <div class="flex flex-col md:flex-row md:items-center gap-2.5">
                <CLabelText :text="ticket?.service?.name" text-size="text-xs" class="w-max" />
                <CLabelText
                  :text="ticket?.impact_level?.name"
                  text-size="text-xs"
                  :text-color="$colorLabel(ticket.impact_level.id).text"
                  :bg-color="$colorLabel(ticket.impact_level.id).bg"
                  class="w-max"
                />
                <CLabelText
                  :text="ticket?.status_ticket?.name"
                  text-size="text-xs"
                  :text-color="$colorLabel(ticket.status_ticket.id).text"
                  :bg-color="$colorLabel(ticket.status_ticket.id).bg"
                  class="w-max"
                />
              </div>
              <h1 class="text-secondary-text">
                {{ ticket?.transaction_date }}
              </h1>
            </div>
            <div class="space-y-1 text-center w-max">
              <CRatingStar
                :rating="ticket?.rating?.grade || 0"
                readonly
              />
              <h1 :class="ticket.rating ? 'text-neutral-400' : 'text-secondary-text'">
                {{ ticket.rating?.message || 'Tidak ada' }}
              </h1>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>