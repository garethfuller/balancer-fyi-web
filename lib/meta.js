export const ogMeta = ({
  title = 'Title of page',
  description = 'Description of page',
  siteName = 'Website brand name',
  url = 'https://example.com',
  image = 'https://example.com/images/og_image.png',
  twitter = '@handle'
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
