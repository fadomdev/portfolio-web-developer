import React from 'react'

// Define the interface for the LevelSkill component
interface LevelSkillProps {
  level: number | undefined
}

export default function LevelSkill({ level }: LevelSkillProps) {
  const maxLevel = 5
  const arrayLevel = Array(maxLevel).fill(0)

  return (
    <div className=''>
      <div className='flex'>
        {arrayLevel.fill(1, 0, level).map((item, index) => {
          return item == 1 ? (
            <svg
              key={index}
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='icon icon-tabler icons-tabler-filled icon-tabler-point'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z' />
            </svg>
          ) : (
            <svg
              key={index}
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className='icon icon-tabler icons-tabler-outline icon-tabler-point'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' />
            </svg>
          )
        })}
      </div>
    </div>
  )
}
