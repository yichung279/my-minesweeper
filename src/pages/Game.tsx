import { useLocation } from 'react-router-dom'
import 'material-symbols'

function Game() {
  const location = useLocation()

  console.log(location.state)
  return (
    <div className="max-w-5xl mx-auto pt-20">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center">
        Game
      </h1>
    </div>
  )
}

export default Game
