import { createDefaultMap } from "@/lib/mineMap"
import { shuffle } from "@/lib/utils"
import { Mine, MineShown } from "@/types"
import { useEffect, useState } from "react"

export const useMineMap = (
    { height, width, numOfMine }: { height: number, width: number, numOfMine: number }
) => {
    const [map, setMap] = useState<Mine[][]>([])
    const [mineCreated, setMineCreated] = useState(false)

    const addAroundIfOK = (prevMap: Mine[][], i: number, j: number) => {
        if (i < 0 || i >= height || j < 0 || j >= width) return
        if (prevMap[i][j].mine) return

        prevMap[i][j].mineAround++
    }

    const accumulateMineAround = (prevMap: Mine[][], i: number, j: number) => {
        addAroundIfOK(prevMap, i - 1, j - 1)
        addAroundIfOK(prevMap, i - 1, j)
        addAroundIfOK(prevMap, i - 1, j + 1)
        addAroundIfOK(prevMap, i, j - 1)
        addAroundIfOK(prevMap, i, j + 1)
        addAroundIfOK(prevMap, i + 1, j - 1)
        addAroundIfOK(prevMap, i + 1, j)
        addAroundIfOK(prevMap, i + 1, j + 1)
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
                let mine_i = Math.floor(legalBurrows[i] / width)
                let mine_j = legalBurrows[i] % width
                prevMap[mine_i][mine_j].mine = true
                // for dev
                prevMap[mine_i][mine_j].show = MineShown.BOMB
            }
            for (let i = 0; i < numOfMine; i++) {
                let mine_i = Math.floor(legalBurrows[i] / width)
                let mine_j = legalBurrows[i] % width
                accumulateMineAround(prevMap, mine_i, mine_j)
            }
            return [...prevMap]
        })
        setMineCreated(true)
    }

    const sweep = (prevMap: Mine[][], i: number, j: number) => {
        if (i < 0 || i >= height || j < 0 || j >= width) return
        if (prevMap[i][j].visited) return

        prevMap[i][j].visited = true

        if (prevMap[i][j].mineAround !== 0) {
            prevMap[i][j].show = prevMap[i][j].mineAround
            return
        }
        sweep(prevMap, i - 1, j - 1)
        sweep(prevMap, i - 1, j)
        sweep(prevMap, i - 1, j + 1)
        sweep(prevMap, i, j - 1)
        sweep(prevMap, i, j + 1)
        sweep(prevMap, i + 1, j - 1)
        sweep(prevMap, i + 1, j)
        sweep(prevMap, i + 1, j + 1)

    }

    useEffect(() => {
        setMap(createDefaultMap(height, width))
    }, [])


    return { map, setMap, mineCreated, createMines, sweep }

}