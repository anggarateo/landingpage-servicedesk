import { initializeApp } from 'firebase/app'
import { getDatabase, ref, onValue } from 'firebase/database'

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(nuxtApp.$config.public.firebaseConfig)
  const db = getDatabase(app)

  const user = localStorage.getItem('user')
  const userRole = JSON.parse(user)?.role || null
  const path = userRole ? 'roles/' + userRole.id : 'roles'
  
  onValue(ref(db, path), (snapshot) => {
    const data = snapshot.val()
    if (!data) return
    const localRole = localStorage.getItem('role')
    if (localRole && localRole !== JSON.stringify(data)) reloadNuxtApp()
    if (path !== 'roles') localStorage.setItem('role', JSON.stringify(data))
  })
})