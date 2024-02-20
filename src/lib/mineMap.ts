import { Mine, MineShown } from "@/types"

export const createDefaultMap = (height: number, width: number) => {
  let defaultMap: Mine[][] = []
  for (let i = 0; i < height; i++) {
    defaultMap[i] = new Array()
    for (let j = 0; j < width; j++) {
      defaultMap[i][j] = {
        mine: false,
        pos_i: i,
        pos_j: j,
        visited: false,
        flaged: false,
        boom: false,
        show: MineShown.UNVEILED,
      }
    }
  }

  return defaultMap
}