import { useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Bomb, Flag } from 'lucide-react'

import { useMineMap } from '@/hooks/mineMap'

import { GameStatus, MineShown } from '@/types'

function Game() {
  const location = useLocation()
  const { height, width, numOfMine } = location.state // TODO: check if values exist

  const endGame = (status: GameStatus) => {
    console.log(status)
  }

  const { map, handleLeftClick, handleRightClick } = useMineMap(
    { height, width, numOfMine },
    endGame
  )

  return (
    <div className="w-fit mx-auto pt-20">
      <div className="w-fit p-4 rounded-md border shadow-md">
        <div className="flex flex-col gap-1">
          {map.map((line, i) => (
            <div key={i} className="flex gap-1">
              {line.map((mine, j) => (
                <Button
                  key={j}
                  variant={mine.visited ? 'disabled' : 'secondary'}
                  size="icon"
                  className="p-1"
                  onClick={(e) => handleLeftClick(e, i, j)}
                  onContextMenu={(e) => handleRightClick(e, i, j)}
                >
                  {mine.show === MineShown.FLAG && <Flag className="h-6 w-6" />}
                  {mine.show === MineShown.BOMB && <Bomb className="h-6 w-6" />}
                  {typeof mine.show === 'number' && (
                    <span>{mine.mineAround}</span>
                  )}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Game
