import 'material-symbols'

function App() {
  return (
    <div className="max-w-5xl mx-auto pt-20">
      <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center">
        Minesweeper
      </h1>
      <div className="w-fit mx-auto pt-10">
        <div className="w-fit grid grid-cols-3 gap-1">
          <span className="material-symbols-rounded text-4xl">flag</span>
          <span className="material-symbols-rounded text-4xl">flag</span>
          <span className="material-symbols-rounded text-4xl">flag</span>
          <span className="material-symbols-rounded text-4xl">flag</span>
          <span className="material-symbols-rounded text-4xl">bomb</span>
          <span className="material-symbols-rounded text-4xl">flag</span>
          <span className="material-symbols-rounded text-4xl">flag</span>
          <span className="material-symbols-rounded text-4xl">flag</span>
          <span className="material-symbols-rounded text-4xl">flag</span>
        </div>
      </div>
    </div>
  )
}

export default App
