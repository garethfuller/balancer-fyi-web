import numeral from 'numeral'

export default {
  methods: {
    _money (val: number, symbol: string = '$') : string {
      let format: string = `${symbol}(0.[00])`
      if (val > 1000) format = `${symbol}(0.[0]a)`
      if (val < 1) format = `${symbol}(0.[000000])`

      return numeral(val).format(format)
    },

    _percent (val: number) : string {
      return numeral(val).format('(0.[00])%')
    },

    _int (val: number) : string {
      const locale = window.navigator.userLanguage || window.navigator.language
      return val.toLocaleString(locale, { maximumFractionDigits: 0 })
    },

    _date (val: string) : string {
      const locale = window.navigator.userLanguage || window.navigator.language
      const parsed = new Date(val)
      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      return parsed.toLocaleDateString(locale, options)
    },

    _datetime (val: string) : string {
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
  }
}
