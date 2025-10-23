import { useEffect, useState } from 'react'

/**
 * Custom hook to check if the component has mounted on the client side.
 * This helps prevent hydration mismatches when using browser-only APIs.
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

/**
 * Custom hook for handling media queries safely on both server and client.
 */
export function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = useState(defaultValue)
  const isClient = useIsClient()

  useEffect(() => {
    if (!isClient) return

    try {
      const mediaQuery = window.matchMedia(query)
      setMatches(mediaQuery.matches)

      const handler = (event: MediaQueryListEvent) => {
        setMatches(event.matches)
      }

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handler)
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handler)
      }

      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handler)
        } else {
          mediaQuery.removeListener(handler)
        }
      }
    } catch (error) {
      console.warn('Error setting up media query listener:', error)
    }
  }, [query, isClient])

  return matches
}

/**
 * Hook to prevent hydration errors by mounting content only on client
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}