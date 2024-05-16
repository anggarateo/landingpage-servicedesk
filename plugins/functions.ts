import { format, formatDistance } from 'date-fns' // https://date-fns.org/
import localId from 'date-fns/locale/id'
import { useModal } from 'vue-final-modal'
import ModalPreview from '~/components/ModalPreview.vue'

const filePreview = ref()
const preview = useModal({
  component: ModalPreview,
  attrs: {
    file: filePreview,
    onCloseInfo () {
      preview.close()
    }
  }
})
function downloadFile (file: any) {
  const link = document.createElement('a')
  link.href = file.full_path
  link.setAttribute('download', file.filename)
  document.body.appendChild(link)
  link.click()
}

export default defineNuxtPlugin((nuxtApp: any) => {
  return {
    provide: {
      checkPermission: (menu: String, action: String) => {
        let result = null
        const user = localStorage.getItem('user')
        if (!user) return
        const userRole = JSON.parse(user).role
        const localRole = localStorage.getItem('role')
        if (!localRole) return
        const role = JSON.parse(localRole)
        if (role.menus) {
          result = role.menus.find(
            (permit: {
              code: String,
              action: String,
              is_active: Boolean
            }) => permit.code === menu && permit.action === action && permit.is_active)
        } else {
          result = role[userRole.id].menus.find(
            (permit: {
              code: String,
              action: String,
              is_active: Boolean
            }) => permit.code === menu && permit.action === action && permit.is_active)
        }
        return result
      },
      copyToClipboard: async (text: string) => {
        return await navigator.clipboard.writeText(text)
          .then(() => {
            nuxtApp.$toast.success('Copied')
          })
          .catch((error) => {
            nuxtApp.$toast.success('Failed to copy: ', error)
          })
      },
      isLoggedIn: () => {
        return localStorage.getItem('auth') ? true : false
      },
      localUser: () => {
        return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
      },
      formatDate: (date: Date, formatTo: string, options?: Object) => {
        return format(new Date(date), formatTo, options)
      },
      distanceDate: (date: Date, compareDate: Date, options?: Object) => {
        return formatDistance(new Date(date), compareDate, options)
      },
      localeId () {
        return localId
      },
      onPreviewFile (file: { type: string }) {
        const fileType = file.type.toLowerCase()
        if (
          fileType === 'pdf' ||
          fileType === 'png' ||
          fileType === 'jpg' ||
          fileType === 'jpeg' ||
          fileType === 'gif' ||
          fileType === 'webp' ||
          fileType === 'svg'
        ) {
          filePreview.value = file
          preview.open()
        } else {
          downloadFile(file)
        }
      },
      colorLabel (uuidStatusTicket: String) {
        let colors = {
          text: '',
          bg: ''
        }

        switch (uuidStatusTicket) {
          // STATUS_OPEN | tiket baru
          case 'd147c874-f231-4320-b117-e49cc5c999fa':
            colors.text = 'text-success-500'
            colors.bg = 'bg-success-100'
            break;
          //  STATUS_PROGRESS | sedang ditangani
          case '00644976-9ef7-4c20-9e4a-3015052d542b':
            colors.text = 'text-secondary-500'
            colors.bg = 'bg-secondary-100'
            break;
          // STATUS_REJECTED | ditolak
          case '087e9769-591c-4347-84cf-199466e7cdd2':
            colors.text = 'text-error-700'
            colors.bg = 'bg-error-200'
            break;
          // STATUS_RESOLVED | selesai
          case '9109b131-fe03-47bb-8a0c-98d3af7673e0':
            colors.text = 'text-primary-500'
            colors.bg = 'bg-primary-100'
            break;
          // STATUS_CLOSE | tutup
          case '811ac344-de01-491b-a6c3-fae39a3b0539':
            colors.text = 'text-red-500'
            colors.bg = 'bg-red-100'
            break;
          // STATUS_REOPEN | buka kembali
          case '12f8c9b1-718c-443d-af4b-5775316de8da':
            colors.text = 'text-success-700'
            colors.bg = 'bg-neutral-300'
            break;
          // STATUS_REQOPEN | permintaan buka kembali
          case 'fb7010a8-507a-4881-b155-f8bea3e52e9f':
            colors.text = 'text-neutral-500'
            colors.bg = 'bg-stroke'
            break;
          // impact level
          // rendah
          case 'b911049b-e7e9-4f89-b235-7c0d8932ce23':
            colors.text = 'text-success-500'
            colors.bg = 'bg-success-100'
            break;
          // sedang
          case '027fd414-eea4-480f-bd34-acd3a4a1425e':
            colors.text = 'text-secondary-600'
            colors.bg = 'bg-secondary-100'
            break;
          // tinggi
          case 'f7a899b9-d6f2-4f8a-ae4d-8c8e7d0d3224':
            colors.text = 'text-error-500'
            colors.bg = 'bg-error-100'
            break;
          default:
            break;
        }
        return colors
      }
    }
  }
})
