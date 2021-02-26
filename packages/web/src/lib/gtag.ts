export const GA_ID = 'UA-189612836-2'

// PVを測定する
export const pageview = (path: string) => {
  // @ts-ignore
  window.gtag('config', GA_ID, {
    page_path: path
  })
}

// GAイベントを発火させる
// @ts-ignore
export const event = ({ action, category, label, value = '' }) => {
  // @ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: JSON.stringify(label),
    value
  })
}