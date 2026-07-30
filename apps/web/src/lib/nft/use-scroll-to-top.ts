import { useEffect } from 'react'

/** Scroll the window to the top on mount (legacy info-page behavior). */
export function useScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
}
