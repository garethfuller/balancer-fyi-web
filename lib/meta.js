export const ogMeta = ({
  title = 'Balancer FYI - Alternative UI for Balancer Pools',
  description = 'An alternative UI for exploring and interacting with Balancer pools.',
  siteName = 'Balancer FYI',
  url = 'https://balancer.fyi',
  image = 'https://balancer.fyi/images/og_image.png',
  twitter = '@garethafuller'
} = {}) => {
  return [
    { hid: 'description', name: 'description', content: description },
    { hid: 'og:title', name: 'og:title', content: title },
    { hid: 'og:site_name', name: 'og:site_name', content: siteName },
    {
      hid: 'og:description',
      name: 'og:description',
      content: description
    },
    { hid: 'og:url', name: 'og:url', content: url },
    {
      hid: 'og:image',
      name: 'og:image',
      content: image
    },
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    { hid: 'twitter:site', name: 'twitter:site', content: twitter },
    {
      hid: 'twitter:creator',
      name: 'twitter:creator',
      content: twitter
    },
    { hid: 'twitter:title', name: 'twitter:title', content: title },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: image
    }
  ]
}
