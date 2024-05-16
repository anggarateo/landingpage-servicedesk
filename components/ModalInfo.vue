<script setup>
import { VueFinalModal } from 'vue-final-modal'

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  info: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'delete' // delete, change, preview, yesOrNo, code, oke, code-pin
  },
  btnColor: {
    type: String,
    default: null // primary, error
  },
  icon: {
    type: Boolean,
    default: true
  },
  disableConfirmButton: {
    type: Boolean,
    default: false
  },
  codeTicket: {
    type: String,
    default: null
  },
  loading: Boolean,
  escToClose: {
    type: Boolean,
    default: true
  },
  customFooter: {
    type: Boolean,
    default: false
  }
})

const disButton = ref(props.disableConfirmButton)
const inputCode = ref([])
const outputCode = ref()
const fieldCode = ref()
const inputCodeTicket = ref(props.codeTicket)

watch(() => inputCode.value, (val) => {
  if (val.length) {
    val.forEach((value, i) => {
      if (!value && val[i+1]) {
        inputCode.value[i] = val[i+1]
        inputCode.value.splice(i+1, 1)
      }
      if (value && i < 3) fieldCode.value[i+1].focus()

      if (val.length === 4 && value) {
        outputCode.value = `${val[0]}${val[1]}${val[2]}${val[3]}`
        disButton.value = false
      } else {
        disButton.value = true
      }
    })
  }
}, { deep: true })
watch(() => fieldCode.value, (val) => {
  if (!inputCode.value.length) {
    val[0]?.focus()
    disButton.value = true
  }
}, { deep: true })
watch(() => props.disableConfirmButton, (val) => {
  disButton.value = val
})

const isFocus = (i) => {
  if (i > 0 && !inputCode.value[i-1]) fieldCode.value[i-1].focus()
}
const deleted = (i) => {
  if (i > 0 && !inputCode.value[i]) fieldCode.value[i-1].focus()
}
const pasted = (data) => {
  if (data) {
    for (let i = 0; i < 4; i++) {
      inputCode.value[i] = data.getData('Text')[i]
    }
  }
}
</script>

<template>
  <VueFinalModal
    :class="{ 'flex justify-center items-center': info }"
    content-class="max-w-lg mx-4 p-4 bg-white border rounded-lg"
    content-transition="vfm-fade"
    :click-to-close="escToClose"
    :esc-to-close="escToClose"
    @closed="$emit('closeInfo')"
    @keypress.enter="type === 'code-pin' ? $emit('closeAll', { codeTicket: inputCodeTicket, pin: outputCode }) : type === 'code' ? $emit('closeAll', outputCode) : $emit('closeAll')"
  >
    <div v-if="info" class="flex flex-col space-y-2">
      <div>
        <svg v-if="icon" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEE4E2" />
          <path d="M28 24V28M28 32H28.01M38 28C38 33.5228 33.5228 38 28 38C22.4772 38 18 33.5228 18 28C18 22.4772 22.4772 18 28 18C33.5228 18 38 22.4772 38 28Z" stroke="#B01030" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FEF3F2" stroke-width="8" />
        </svg>
        <slot v-else name="icon"/>
      </div>
      <h1 class="text-xl font-semibold">
        {{ title }}
      </h1>
      <slot name="content" />

      <h1 v-if="type === 'delete'">
        Apakah Anda yakin ingin menghapusnya? Tindakan ini <span class="text-error">tidak dapat dibatalkan</span> dan semua informasi terkait akan dihapus secara permanen.
      </h1>
      <h1 v-else-if="type === 'change'">
        Apakah Anda yakin ingin keluar tanpa menyimpan perubahan?
      </h1>
      <div v-if="type === 'code' || type === 'code-pin'" class="mt-5 py-6">
        <div class="flex flex-row justify-between">
          <input
            v-for="(num, i) in 4"
            :key="num"
            v-model="inputCode[i]"
            ref="fieldCode"
            type="text"
            inputmode="numeric"
            class="h-20 w-20 text-4xl outline-none text-center border rounded-lg border-primary-300 px-2 text-primary-500 font-medium"
            maxlength="1"
            @focus="isFocus(i)"
            @keyup.delete="deleted(i)"
            @paste="pasted($event.clipboardData)"
          >
        </div>
      </div>
      <ReInputText
        v-if="type === 'code-pin'"
        v-model="inputCodeTicket"
        :require="false"
        placeholder="Masukkan kode tiket disini"
        disabled
      />
      <slot
        v-if="customFooter"
        name="footer"
        :codeTicket="inputCodeTicket"
        :pin="outputCode"
      />
      <div
        v-else
        class="pt-6 flex gap-3"
        :class="type === 'change' ? 'flex-col-reverse' : type === 'delete' ? 'flex-row' : ''"
      >
        <CButton
          v-if="type !== 'oke'"
          class="w-full"
          :text="type === 'change' ? 'Tidak, tetap di halaman' : type === 'delete' || type === 'preview' || (type === 'code-pin' || type === 'code') ? 'Batalkan' : type === 'yesOrNo' ? 'Tidak' : ''"
          type="outlined"
          @click="$emit('closeInfo')"
        />
        <CButton
          class="w-full"
          :text="
            type === 'change'
              ? 'Ya, keluar tanpa menyimpan' : type === 'delete'
                ? 'Hapus' : type === 'preview'
                  ? 'Konfirmasi' : type === 'yesOrNo'
                    ? 'Ya' : type === 'code-pin'
                      ? 'Kirim' : type === 'code'
                        ? 'Konfirmasi' : 'Oke'"
          :color="btnColor ? btnColor : type === 'change' || type === 'delete' ? 'error' : 'primary'"
          :disabled="disButton"
          :loading="loading"
          @click="type === 'code-pin' ? $emit('closeAll', { codeTicket: inputCodeTicket, pin: outputCode }) : type === 'code' ? $emit('closeAll', outputCode) : $emit('closeAll')"
        />
      </div>
    </div>
  </VueFinalModal>
</template>
