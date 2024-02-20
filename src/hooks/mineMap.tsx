import React, { useEffect, useState } from 'react'
import { createDefaultMap } from '@/lib/mineMap'
import { shuffle } from '@/lib/utils'
import { GameStatus, Mine } from '@/types'

export const useMineMap = (
  { height, width, numOfMine }: { height: number; width: number; numOfMine: number },
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>,
) => {
  const [map, setMap] = useState<Mine[][]>([])
  const [mineCreated, setMineCreated] = useState(false)
  const [visitedCount, setVisitedCount] = useState(0)

  const addAroundIfOK = (mineAroundMap: number[][], i: number, j: number) => {
    if (i < 0 || i >= height || j < 0 || j >= width) return
    if (map[i][j].mine) return

    mineAroundMap[i][j]++
  }

  const accumulateMineAround = (mineAroundMap: number[][], i: number, j: number) => {
    addAroundIfOK(mineAroundMap, i - 1, j - 1)
    addAroundIfOK(mineAroundMap, i - 1, j)
    addAroundIfOK(mineAroundMap, i - 1, j + 1)
    addAroundIfOK(mineAroundMap, i, j - 1)
    addAroundIfOK(mineAroundMap, i, j + 1)
    addAroundIfOK(mineAroundMap, i + 1, j - 1)
    addAroundIfOK(mineAroundMap, i + 1, j)
    addAroundIfOK(mineAroundMap, i + 1, j + 1)
  }

  const createMines = (i_clicked: number, j_clicked: number) => {
    if (height * width < numOfMine + 1) throw Error

    let legalBurrows = new Array(height * width - 1)
    let nLegalBurrow = 0
    for (let i = 0; i < height * width; i++) {
      if (i === i_clicked * width + j_clicked) {
        continue
      }
      legalBurrows[nLegalBurrow] = i
      nLegalBurrow++
    }
    legalBurrows = shuffle(legalBurrows)

    setMap((prevMap) => {
      for (let i = 0; i < numOfMine; i++) {
        const mine_i = Math.floor(legalBurrows[i] / width)
        const mine_j = legalBurrows[i] % width
        prevMap[mine_i][mine_j].mine = true
      }
      return [...prevMap]
    })

    const mineAroundMap: number[][] = []
    for (let i = 0; i < height; i++) {
      mineAroundMap[i] = new Array(width)
      for (let j = 0; j < width; j++) {
        mineAroundMap[i][j] = 0
      }
    }
    for (let i = 0; i < numOfMine; i++) {
      const mine_i = Math.floor(legalBurrows[i] / width)
      const mine_j = legalBurrows[i] % width
      accumulateMineAround(mineAroundMap, mine_i, mine_j)
    }
    setMap((prevMap) => {
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          prevMap[i][j].mineAround = mineAroundMap[i][j]
        }
      }
      return [...prevMap]
    })
    setMineCreated(true)
    setGameStatus(GameStatus.INPROGRESS)
  }

  const sweep = (prevMap: Mine[][], i: number, j: number) => {
    if (i < 0 || i >= height || j < 0 || j >= width) return
    if (prevMap[i][j].visited) return

    prevMap[i][j].visited = true
    setVisitedCount((prevCount: number) => prevCount + 1)

    if (prevMap[i][j].mineAround !== 0) return

    sweep(prevMap, i - 1, j - 1)
    sweep(prevMap, i - 1, j)
    sweep(prevMap, i - 1, j + 1)
    sweep(prevMap, i, j - 1)
    sweep(prevMap, i, j + 1)
    sweep(prevMap, i + 1, j - 1)
    sweep(prevMap, i + 1, j)
    sweep(prevMap, i + 1, j + 1)
  }

  const toggleFlag = (i: number, j: number) => {
    const flagged = !map[i][j].flagged
    setMap((prevMap) => {
      prevMap[i][j].flagged = flagged

      return [...prevMap]
    })
  }

  const handleLeftClick = (e: React.MouseEvent, i: number, j: number) => {
    if (map[i][j].flagged) return
    if (!mineCreated) createMines(i, j)
    if (map[i][j].mine) {
      setGameStatus(GameStatus.LOSE)
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
  }

  useEffect(() => {
    if (visitedCount + numOfMine == height * width) {
      setGameStatus(GameStatus.WIN)
    }
  }, [visitedCount])

  useEffect(() => {
    setMap(createDefaultMap(height, width))
  }, [])

  return { map, handleLeftClick, handleRightClick }
}
