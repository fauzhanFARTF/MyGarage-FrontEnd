import { api } from './lib/api'

function App() {
  const baseURL = api.defaults.baseURL

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50 text-slate-800">
      <h1 className="text-3xl font-bold">GarasiKu — Frontend</h1>
      <p className="text-slate-500">React + Vite + TypeScript + TanStack Query + Tailwind</p>
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm">
        <span className="text-slate-500">API base URL: </span>
        <code className="font-mono text-slate-900">{baseURL ?? '(belum diset)'}</code>
      </div>
    </main>
  )
}

export default App
