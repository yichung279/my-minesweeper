import { createDefaultMap } from "@/lib/mineMap"
import { Mine, MineShown } from "@/types"
import { useEffect, useState } from "react"

export const useMineMap = (
    { height, width, numOfMine }: { height: number, width: number, numOfMine: number }
) => {
    const [map, setMap] = useState<Mine[][]>([])
    const [mineCreated, setMineCreated] = useState(false)

    const createMines = (i: number, j: number) => {
        setMap((prevMap) => {
            let mineCount = 0
            while (mineCount < numOfMine) {
                let rand_i = Math.floor(Math.random() * height)
                let rand_j = Math.floor(Math.random() * width)
                if (prevMap[rand_i][rand_j].mine == true ||
                    (rand_i === i && rand_j === j)) {
                    continue
                }
                prevMap[rand_i][rand_j].mine = true
                // for dev
                prevMap[rand_i][rand_j].show = MineShown.BOMB
                mineCount++
            }
            return prevMap
        })
        setMineCreated(true)
    }

    useEffect(() => {
        setMap(createDefaultMap(height, width))
    }, [])


    return { map, mineCreated, createMines }

}