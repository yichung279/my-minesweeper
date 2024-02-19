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
            className="h-12 w-12 p-2 rounded-md border shadow-md bg-slate-200"
          >
            {v === 'flag' && <Flag className="h-8 w-8" />}
            {v === 'bomb' && <Bomb className="h-8 w-8" />}
          </div>
        )
      })}
    </div>
  )
}

function App() {
  const navigate = useNavigate()

  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('')
  const [numOfMine, setNumOfMine] = useState('')

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
          value={height}
          onChange={(e) => {
            setHeight(e.target.value)
          }}
        />
        <Input
          type="number"
          placeholder="Width..."
          value={width}
          onChange={(e) => {
            setWidth(e.target.value)
          }}
        />
        <Input
          type="number"
          placeholder="Number of Mine..."
          value={numOfMine}
          onChange={(e) => {
            setNumOfMine(e.target.value)
          }}
        />
        <Button
          onClick={() => {
            height &&
              width &&
              numOfMine &&
              navigate('/game', { state: { height, width, numOfMine } })
          }}
        >
          Start
        </Button>
      </div>
    </div>
  )
}

export default App
