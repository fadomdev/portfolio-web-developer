import { TypeAnimation } from 'react-type-animation'

export default function ProfileType() {
  return (
    <TypeAnimation
      sequence={[
        'Francisco Aquino', // Types 'One'
        1000, // Waits 1s
        () => {
          console.log('Sequence completed')
        }
      ]}
      wrapper='h1'
      cursor={false}
      repeat={1}
      style={{ display: 'block' }}
      className='text-4xl lg:text-5xl font-light text-zinc-700 dark:text-zinc-50 mb-4 '
    />
  )
}
