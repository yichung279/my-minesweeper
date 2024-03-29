import { useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Bomb, Flag } from 'lucide-react'

import { useMineMap } from '@/hooks/mineMap'

import { GameStatus, Mine, MineShown } from '@/types'
import { useEffect, useState } from 'react'

function Game() {
  const location = useLocation()
  const { height, width, numOfMine } = location.state // TODO: check if values exist

  const [gameStatus, setGameStatus] = useState(GameStatus.UNBEGUN)
  const [openDialog, setOpenDialog] = useState(false)

  const choseIcon: (_mine: Mine) => MineShown = (mine) => {
    if (mine.visited && mine.mineAround !== 0) {
      return MineShown.MINE_AROUND
    } else {
      if (mine.flagged) {
        return MineShown.FLAG
      } else if (mine.mine && (gameStatus === GameStatus.LOSE || gameStatus === GameStatus.WIN)) {
        return MineShown.BOMB
      }
    }
    return MineShown.NONE
  }

  const { map, handleLeftClick, handleRightClick } = useMineMap(
    { height, width, numOfMine },
    setGameStatus,
  )

  useEffect(() => {
    if (gameStatus === GameStatus.WIN || gameStatus === GameStatus.LOSE) {
      setOpenDialog(true)
    }
  }, [gameStatus])

  return (
    <div className='mx-auto w-fit pt-20'>
      <div className='w-fit rounded-md border p-4 shadow-md'>
        <div className='flex flex-col gap-1'>
          {map.map((line, i) => (
            <div key={i} className='flex gap-1'>
              {line.map((mine, j) => (
                <Button
                  key={j}
                  variant={mine.visited ? 'transparent' : 'secondary'}
                  size='icon'
                  className='p-1'
                  disabled={gameStatus === GameStatus.LOSE || gameStatus === GameStatus.WIN}
                  onClick={(e) => handleLeftClick(e, i, j)}
                  onContextMenu={(e) => handleRightClick(e, i, j)}
                >
                  {choseIcon(mine) === MineShown.MINE_AROUND && <span>{mine.mineAround}</span>}
                  {choseIcon(mine) === MineShown.FLAG && <Flag className='h-6 w-6' />}
                  {choseIcon(mine) === MineShown.BOMB && <Bomb className='h-6 w-6' />}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {gameStatus === GameStatus.WIN && 'YOU WIN!'}
              {gameStatus === GameStatus.LOSE && 'YOU LOSE!'}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Dismiss</AlertDialogCancel>
            <AlertDialogAction onClick={() => window.location.reload()}>Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default Game
