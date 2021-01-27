// Persists darkMode setting on page load
import { Middleware } from '@nuxt/types'

function getDarkMode (): boolean {
  const data: string = localStorage.getItem('darkMode') || ''
  if (!data) return false

  return JSON.parse(data)
}

const darkModeMiddleware: Middleware = context => {
  if (process.server) return

  const darkMode: boolean = getDarkMode()

  if (darkMode) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
  context.store.commit('setDarkMode', darkMode)
}

export default darkModeMiddleware
