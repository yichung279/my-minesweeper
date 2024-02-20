import { Mine } from "@/types"

export const createDefaultMap = (height: number, width: number) => {
  const defaultMap: Mine[][] = []
  for (let i = 0; i < height; i++) {
    defaultMap[i] = new Array(width)
    for (let j = 0; j < width; j++) {
      defaultMap[i][j] = {
        mine: false,
        visited: false,
        flagged: false,
        mineAround: 0
      }
    }
  }

  return defaultMap
}