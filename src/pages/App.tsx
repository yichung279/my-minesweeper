import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bomb, Flag } from 'lucide-react'
import { useState } from 'react'

const HeroImg = () => {
  // prettier-ignore
  const icons = [
   'flag', 'flag', '',
   '', 'bomb', 'flag',
   'flag','', 'flag',
  ]

  return (
    <div className='grid w-fit grid-cols-3 gap-2 rounded-md border p-4 shadow-md'>
      {icons.map((v, i) => {
        return (
          <div key={i} className='h-12 w-12 rounded-md border bg-slate-200 p-3 shadow-md'>
            {v === 'flag' && <Flag className='h-6 w-6' />}
            {v === 'bomb' && <Bomb className='h-6 w-6' />}
          </div>
        )
      })}
    </div>
  )
}

function App() {
  const navigate = useNavigate()

  const [inputHeight, setInputHeight] = useState('')
  const [inputWidth, setInputWidth] = useState('')
  const [inputNumOfMine, setInputNumOfMine] = useState('')

  const handleClick = () => {
    if (!inputHeight || !inputWidth || !inputNumOfMine) return

    const height: number = Number(inputHeight)
    const width: number = Number(inputWidth)
    const numOfMine: number = Number(inputNumOfMine)

    if (height * width < numOfMine + 1) return

    navigate('/game', {
      state: {
        height,
        width,
        numOfMine,
      },
    })
  }

  return (
    <div className='mx-auto flex max-w-5xl flex-col items-center gap-10 pt-20 '>
      <h1 className='text-center text-4xl font-extrabold text-slate-900 sm:text-5xl lg:text-6xl'>
        Minesweeper
      </h1>
      <HeroImg />
      <div className='flex flex-col gap-2 md:flex-row'>
        <Input
          type='number'
          placeholder='Height...'
          value={inputHeight}
          onChange={(e) => {
            setInputHeight(e.target.value)
          }}
        />
        <Input
          type='number'
          placeholder='Width...'
          value={inputWidth}
          onChange={(e) => {
            setInputWidth(e.target.value)
          }}
        />
        <Input
          type='number'
          placeholder='Number of Mine...'
          value={inputNumOfMine}
          onChange={(e) => {
            setInputNumOfMine(e.target.value)
          }}
        />
        <Button onClick={handleClick}>Start</Button>
      </div>
    </div>
  )
}

export default App
