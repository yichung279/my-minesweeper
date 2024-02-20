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
    <div className="w-fit gap-2 p-4 rounded-md border shadow-md grid grid-cols-3">
      {icons.map((v, i) => {
        return (
          <div
            key={i}
            className="h-12 w-12 p-3 rounded-md border shadow-md bg-slate-200"
          >
            {v === 'flag' && <Flag className="h-6 w-6" />}
            {v === 'bomb' && <Bomb className="h-6 w-6" />}
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

    let height: number = Number(inputHeight)
    let width: number = Number(inputWidth)
    let numOfMine: number = Number(inputNumOfMine)

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
    <div className="max-w-5xl mx-auto pt-20 flex flex-col gap-10 items-center ">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center">
        Minesweeper
      </h1>
      <HeroImg />
      <div className="flex flex-col gap-2 md:flex-row">
        <Input
          type="number"
          placeholder="Height..."
          value={inputHeight}
          onChange={(e) => {
            setInputHeight(e.target.value)
          }}
        />
        <Input
          type="number"
          placeholder="Width..."
          value={inputWidth}
          onChange={(e) => {
            setInputWidth(e.target.value)
          }}
        />
        <Input
          type="number"
          placeholder="Number of Mine..."
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
