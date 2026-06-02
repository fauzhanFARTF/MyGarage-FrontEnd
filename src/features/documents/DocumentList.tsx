import { formatDate } from '../../lib/format'
import { DOCUMENT_TYPE_LABEL, type VehicleDocument } from '../../types/document'
import { useDeleteDocument } from './useDocuments'

export function DocumentList({ documents }: { documents: VehicleDocument[] }) {
  const deleteMutation = useDeleteDocument()

  function handleDelete(id: number) {
    if (window.confirm('Hapus dokumen ini?')) {
      deleteMutation.mutate(id)
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Semua Dokumen</h2>
      {documents.length === 0 ? (
        <p className="mt-3 text-sm text-slate-400">Belum ada dokumen.</p>
      ) : (
        <ul className="mt-3 divide-y divide-slate-100">
          {documents.map((doc) => (
            <li key={doc.id} className="flex items-center justify-between gap-2 py-2 text-sm">
              <div>
                <p className="font-medium text-slate-900">{doc.name}</p>
                <p className="text-xs text-slate-500">
                  {DOCUMENT_TYPE_LABEL[doc.doc_type]} · berlaku s/d {formatDate(doc.expiry_date)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(doc.id)}
                disabled={deleteMutation.isPending}
                className="rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
