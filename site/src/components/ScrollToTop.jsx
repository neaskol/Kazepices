import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    // Small delay to let the new page set its title
    const timeout = setTimeout(() => {
      setAnnouncement(document.title)
    }, 100)
    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      role="status"
      className="sr-only"
    >
      {announcement}
    </div>
  )
}
