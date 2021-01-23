export default (_, inject) => {
  inject('utils', {
    sleep: ms => new Promise(resolve => setTimeout(resolve, ms)),
    poll: (fn, { params = [], timeout = 60000, interval = 3000 } = {}) => {
      const endTime = Number(new Date()) + timeout

      const checkCondition = async (resolve, reject) => {
        const result = await fn(...params)

        if (result) {
          resolve(result)
        } else if (Number(new Date()) < endTime) {
          setTimeout(checkCondition, interval, resolve, reject)
        } else {
          reject(new Error('timed out for ' + fn))
        }
      }

      return new Promise(checkCondition)
    }
  })
}
