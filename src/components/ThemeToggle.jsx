import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

const STORAGE_KEY = 'aucis-theme'

function readTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

/** Sun/moon switch in the header. The choice is remembered between visits. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage blocked — the theme still applies for this visit */
    }
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition duration-300 hover:border-sand/40 hover:text-cream"
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
    </button>
  )
}
