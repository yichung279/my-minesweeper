import { useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Bomb, Flag } from 'lucide-react'

import { MineShown } from '@/types'
import { useMineMap } from '@/hooks/mineMap'

function Game() {
  const location = useLocation()
  const { height, width, numOfMine } = location.state // TODO: check if values exist

  const { map, mineCreated, createMines } = useMineMap({
    height,
    width,
    numOfMine,
  })

  const handleClick = (i: number, j: number) => () => {
    if (!mineCreated) {
      createMines(i, j)
      return
    }
  }

  return (
    <div className="w-fit mx-auto pt-20">
      <div className="w-fit p-4 rounded-md border shadow-md">
        <div className="flex flex-col gap-1">
          {map.map((line, i) => {
            return (
              <div key={i} className="flex gap-1">
                {line.map((mine, j) => {
                  return (
                    <Button
                      key={j}
                      variant="secondary"
                      size="icon"
                      className="p-1"
                      onClick={handleClick(i, j)}
                    >
                      {mine.show === MineShown.FLAG && (
                        <Flag className="h-6 w-6" />
                      )}
                      {mine.show === MineShown.BOMB && (
                        <Bomb className="h-6 w-6" />
                      )}
                    </Button>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Game
