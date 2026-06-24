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
      className='inline-flex items-center gap-1.5 border border-[0.5px] border-zinc-200 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-50 font-normal rounded-lg text-xs px-3.5 py-1.5 transition-all duration-150 shadow-sm'
      {...props}
    >
      {children}
    </a>
  )
}

export default LinkButton
