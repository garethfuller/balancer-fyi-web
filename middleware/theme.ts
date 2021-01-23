import { Middleware } from '@nuxt/types'

function getDarkMode (): boolean {
  const data: any = localStorage.get('darkMode')
  if (!data) return true

  return JSON.parse(data)
}

const themeMiddleware: Middleware = context => {
  if (process.server) return

  const darkMode: boolean = getDarkMode()
  context.store.commit('setDarkMode', darkMode)
}

export default themeMiddleware
