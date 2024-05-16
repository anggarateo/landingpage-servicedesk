<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken } from 'firebase/messaging'
import { useAuthStore } from '@/store/auth'

const config = useRuntimeConfig()
const store = useAuthStore()
useHead({
  titleTemplate: '%s - ' + config.public.title
})

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  ...config.public.firebaseConfig
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app)

const reqFcmToken = () => {
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  getToken(messaging, { vapidKey: config.public.fcmVapidKey }).then((currentToken) => {
    if (currentToken) {
      store.$patch({
        token_fcm: currentToken,
        device_id: navigator.userAgent
      })
    } else {
      // Show permission request.
      // Show permission UI.
    }
  }).catch((err: any) => {
    console.log('An error occurred while retrieving token. ', err)
  })
}

const reqPermit = () => {
  console.log('Requesting permission...')
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.')
      // TODO(developer): Retrieve a registration token for use with FCM.
      // In many cases once an app has been granted notification permission,
      // it should update its UI reflecting this.
      reqFcmToken()
    } else {
      console.log('Unable to get permission to notify.')
    }
  })
}

onMounted(() => {
  reqPermit()
})

</script>
<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="4" color="#FCB700" />
    <NuxtPage />
    <ModalsContainer />
  </NuxtLayout>
</template>
