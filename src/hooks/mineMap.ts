import { createDefaultMap } from "@/lib/mineMap"
import { shuffle } from "@/lib/utils"
import { Mine, MineShown } from "@/types"
import { useEffect, useState } from "react"

export const useMineMap = (
    { height, width, numOfMine }: { height: number, width: number, numOfMine: number }
) => {
    const [map, setMap] = useState<Mine[][]>([])
    const [mineCreated, setMineCreated] = useState(false)

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
            return prevMap
        })
        setMineCreated(true)
    }

    useEffect(() => {
        setMap(createDefaultMap(height, width))
    }, [])


    return { map, mineCreated, createMines }

}