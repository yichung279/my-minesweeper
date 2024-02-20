import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Bomb, Flag } from 'lucide-react'

import { Mine, MineShown } from '@/types'
import { createDefaultMap } from '@/lib/mineMap'

function Game() {
  const location = useLocation()
  const { height, width, numOfMine } = location.state // TODO: check if values exist
  console.log(numOfMine)

  const [map, setMap] = useState<Mine[][]>([])

  useEffect(() => {
    setMap(createDefaultMap(height, width))
  }, [])

  return (
    <div className="w-fit mx-auto pt-20">
      <div className="w-fit p-4 rounded-md border shadow-md">
        <div className="flex flex-col gap-1">
          {map.map((line, i) => {
            return (
              <div key={i} className="flex gap-1">
                {line.map((mine, j) => {
                  return (
                    <Button key={j} variant="secondary" size="icon">
                      {mine.show === MineShown.FLAG && (
                        <Flag className="h-8 w-8" />
                      )}
                      {mine.show === MineShown.BOMB && (
                        <Bomb className="h-8 w-8" />
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
