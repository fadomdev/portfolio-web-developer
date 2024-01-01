import React, { useEffect, useState } from 'react'

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setDarkMode(false)
    }
  }, [])

  const activateDarkMode = () => {
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }

    setDarkMode(!darkMode)
  }

  return (
    <div>
      <label className='relative inline-flex items-center me-5 cursor-pointer'>
        <input
          type='checkbox'
          className='sr-only peer'
          onChange={activateDarkMode}
          checked={darkMode}
        />
        <div className="border w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-200 peer-checked:bg-teal-600"></div>
        <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
          {darkMode ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-moon-stars text-blue-400  '
              width='24'
              height='24'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z' />
              <path d='M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2' />
              <path d='M19 11h2m-1 -1v2' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon-tabler icon-tabler-brightness-down text-yellow-400'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
              <path d='M12 5l0 .01' />
              <path d='M17 7l0 .01' />
              <path d='M19 12l0 .01' />
              <path d='M17 17l0 .01' />
              <path d='M12 19l0 .01' />
              <path d='M7 17l0 .01' />
              <path d='M5 12l0 .01' />
              <path d='M7 7l0 .01' />
            </svg>
          )}
        </span>
      </label>
    </div>
  )
}
