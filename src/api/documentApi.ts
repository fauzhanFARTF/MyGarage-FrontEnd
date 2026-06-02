import { api } from '../lib/api'
import type { CreateDocumentInput, DocumentStatus, VehicleDocument } from '../types/document'

export async function fetchDocuments(): Promise<VehicleDocument[]> {
  const { data } = await api.get<VehicleDocument[]>('/documents/')
  return data
}

export async function fetchDocumentStatus(): Promise<DocumentStatus[]> {
  const { data } = await api.get<DocumentStatus[]>('/documents/status/')
  return data
}

export async function createDocument(input: CreateDocumentInput): Promise<VehicleDocument> {
  const { data } = await api.post<VehicleDocument>('/documents/', input)
  return data
}

export async function deleteDocument(id: number): Promise<void> {
  await api.delete(`/documents/${id}/`)
}
