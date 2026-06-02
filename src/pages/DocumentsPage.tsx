import { DocumentForm } from '../features/documents/DocumentForm'
import { DocumentList } from '../features/documents/DocumentList'
import { DocumentStatusCards } from '../features/documents/DocumentStatusCards'
import { useDocumentStatus, useDocuments } from '../features/documents/useDocuments'
import { useVehicles } from '../features/vehicles/useVehicles'

export function DocumentsPage() {
  const { data: documents, isLoading, isError } = useDocuments()
  const { data: statusItems } = useDocumentStatus()
  const { data: vehicles } = useVehicles()

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Dokumen</h1>
        <p className="text-sm text-slate-500">Pantau masa berlaku STNK, pajak, SIM, dan lainnya</p>
      </header>

      <section className="mb-5">
        <h2 className="mb-3 text-sm font-medium text-slate-700">Status masa berlaku</h2>
        <DocumentStatusCards items={statusItems ?? []} />
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <DocumentForm vehicles={vehicles ?? []} />
        {isLoading ? (
          <StateBox>Memuat dokumen…</StateBox>
        ) : isError ? (
          <StateBox tone="error">Gagal memuat dokumen.</StateBox>
        ) : (
          <DocumentList documents={documents ?? []} />
        )}
      </div>
    </>
  )
}

function StateBox({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'neutral' | 'error'
}) {
  const toneClass =
    tone === 'error'
      ? 'border-red-200 bg-red-50 text-red-700'
      : 'border-slate-200 bg-white text-slate-600'
  return <div className={`rounded-xl border p-6 text-center text-sm ${toneClass}`}>{children}</div>
}
