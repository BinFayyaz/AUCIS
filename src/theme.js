
const THEME_KEY = 'aucis-theme'

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark'

  document.documentElement.setAttribute('data-theme', savedTheme)
  updateThemeColor(savedTheme)
}

export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem(THEME_KEY, newTheme)

  updateThemeColor(newTheme)

  return newTheme
}

export function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark'
}

function updateThemeColor(theme) {
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#0D1B2A' : '#F4F1DE')
}
