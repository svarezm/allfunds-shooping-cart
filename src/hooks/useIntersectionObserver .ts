// src/hooks/useIntersectionObserver.ts
import { useRef, useEffect } from 'react'

export function useIntersectionObserver(callback: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled) return
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback()
      }
    })
    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [callback, enabled])

  return ref
}
