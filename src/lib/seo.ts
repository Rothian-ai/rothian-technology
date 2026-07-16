import { useEffect } from 'react'

/** Minimal per-page SEO: document title + meta description. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.name = 'description'
        document.head.appendChild(meta)
      }
      meta.content = description
    }
  }, [title, description])
}
