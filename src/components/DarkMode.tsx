import { DarkThemeToggle, Flowbite } from 'flowbite-react'

type ThemeMode = 'light' | 'dark' | 'auto'

declare const useThemeMode: () => {
  mode: ThemeMode
  computedMode: ThemeMode // "light" | "dark"
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
  clearMode: () => void
}

export default function DarkMode() {
  return (
    <Flowbite>
      <DarkThemeToggle className='outline-none' />
    </Flowbite>
  )
}
