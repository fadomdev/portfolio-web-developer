import React from 'react'

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, ...props }) => {
  return (
    <a
      target={props?.target || '_blank'}
      href={props?.href || '#'}
      className='border border-zinc-300 dark:border-zinc-600 text-zinc-600 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:text-zinc-100 hover:text-zinc-700  dark:text-zinc-100  dark:hover:bg-zinc-600 font-medium rounded-full text-sm md:text-md px-4 py-1 mb-2'
      {...props}
    >
      {children}
    </a>
  )
}

export default LinkButton
