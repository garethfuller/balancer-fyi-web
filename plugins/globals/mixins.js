import { isNumberCheck } from '~/lib/validations.js'

export const money = val => {
  val = parseFloat(val)
  const locale = window.navigator.userLanguage || window.navigator.language

  if (!isNumberCheck(val))
    return parseFloat(0.0).toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    })
  return val.toLocaleString(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  })
}

export const integer = val => {
  val = parseFloat(val)
  const locale = window.navigator.userLanguage || window.navigator.language

  if (!isNumberCheck(val))
    return parseFloat(0.0).toLocaleString(locale, { maximumFractionDigits: 0 })
  return val.toLocaleString(locale, { maximumFractionDigits: 0 })
}

export const date = val => {
  const locale = window.navigator.userLanguage || window.navigator.language

  const parsed = new Date(val)
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  return parsed.toLocaleDateString(locale, options)
}

export const datetime = val => {
  const locale = window.navigator.userLanguage || window.navigator.language

  const parsed = new Date(val)
  return parsed.toLocaleString(locale, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short'
  })
}
