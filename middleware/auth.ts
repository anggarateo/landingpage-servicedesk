export default defineNuxtRouteMiddleware((to, from) => {
  const { $toast } = useNuxtApp()
  if (!localStorage.getItem('auth')) {
    $toast.error('Anda belum login')
    return navigateTo('/', { replace: true })
  }
})
