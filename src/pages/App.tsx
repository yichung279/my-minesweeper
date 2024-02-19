import { useNavigate } from 'react-router-dom'
import 'material-symbols'

const HeroImg = () => {
  // prettier-ignore
  const icons = [
    'flag', 'flag', 'flag',
    'flag', 'bomb', 'flag',
    'flag', 'flag', 'flag',
  ]

  return (
    <div className="w-fit grid grid-cols-3 gap-1">
      {icons.map((v, i) => {
        return (
          <span key={i} className="material-symbols-rounded text-4xl">
            {v}
          </span>
        )
      })}
    </div>
  )
}

function App() {
  const navigate = useNavigate()

  return (
    <div className="max-w-5xl mx-auto pt-20 flex flex-col gap-10 items-center">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center">
        Minesweeper
      </h1>
      <HeroImg />
      <button
        onClick={() => {
          navigate('/game', { state: { key: 'value' } })
        }}
      >
        Start
      </button>
    </div>
  )
}

export default App
