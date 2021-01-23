export default function ({ $axios, $config }) {
  $axios.defaults.baseURL = $config.API_URL
}
