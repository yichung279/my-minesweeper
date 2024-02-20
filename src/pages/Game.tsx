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

import { GameStatus, MineShown } from '@/types'
import { useEffect, useState } from 'react'

function Game() {
  const location = useLocation()
  const { height, width, numOfMine } = location.state // TODO: check if values exist

  const [gameStatus, setGameStatus] = useState(GameStatus.UNBEGUN)
  const [openDialog, setOpenDialog] = useState(false)

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
    <div className='w-fit mx-auto pt-20'>
      <div className='w-fit p-4 rounded-md border shadow-md'>
        <div className='flex flex-col gap-1'>
          {map.map((line, i) => (
            <div key={i} className='flex gap-1'>
              {line.map((mine, j) => (
                <Button
                  key={j}
                  variant={mine.visited ? 'disabled' : 'secondary'}
                  size='icon'
                  className='p-1'
                  onClick={(e) => handleLeftClick(e, i, j)}
                  onContextMenu={(e) => handleRightClick(e, i, j)}
                >
                  {mine.show === MineShown.FLAG && <Flag className='h-6 w-6' />}
                  {mine.mine &&
                    (gameStatus === GameStatus.LOSE || gameStatus === GameStatus.WIN) && (
                      <Bomb className='h-6 w-6' />
                    )}
                  {typeof mine.show === 'number' && <span>{mine.mineAround}</span>}
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
