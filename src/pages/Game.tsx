import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Bomb, Flag } from 'lucide-react'

import { useMineMap } from '@/hooks/mineMap'

import { MineShown } from '@/types'

function Game() {
  const location = useLocation()
  const { height, width, numOfMine } = location.state // TODO: check if values exist

  const {
    map,
    mineCreated,
    visitedCount,
    setMap,
    createMines,
    sweep,
    toggleFlag,
  } = useMineMap({
    height,
    width,
    numOfMine,
  })

  const handleLeftClick = (e: React.MouseEvent, i: number, j: number) => {
    if (map[i][j].flaged) return
    if (!mineCreated) createMines(i, j)
    if (map[i][j].mine) {
      console.log('lose')
      return
    }
    setMap((prevMap) => {
      sweep(prevMap, i, j)
      return [...prevMap]
    })
  }

  const handleRightClick = (e: React.MouseEvent, i: number, j: number) => {
    e.preventDefault()
    if (map[i][j].visited || !mineCreated) return
    toggleFlag(i, j)
    //checkGame
  }

  useEffect(() => {
    if (visitedCount + numOfMine == height * width) {
      console.log('win')
    }
  }, [visitedCount])

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
                      variant={mine.visited ? 'disabled' : 'secondary'}
                      size="icon"
                      className="p-1"
                      onClick={(e) => handleLeftClick(e, i, j)}
                      onContextMenu={(e) => handleRightClick(e, i, j)}
                    >
                      {mine.show === MineShown.FLAG && (
                        <Flag className="h-6 w-6" />
                      )}
                      {mine.show === MineShown.BOMB && (
                        <Bomb className="h-6 w-6" />
                      )}
                      {typeof mine.show === 'number' && (
                        <span>{mine.mineAround}</span>
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
