import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createDocument,
  deleteDocument,
  fetchDocuments,
  fetchDocumentStatus,
} from '../../api/documentApi'
import type { CreateDocumentInput } from '../../types/document'

export function useDocuments() {
  return useQuery({ queryKey: ['documents'], queryFn: fetchDocuments })
}

export function useDocumentStatus() {
  return useQuery({ queryKey: ['document-status'], queryFn: fetchDocumentStatus })
}

function useInvalidateDocuments() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: ['documents'] })
    queryClient.invalidateQueries({ queryKey: ['document-status'] })
  }
}

export function useCreateDocument() {
  const invalidate = useInvalidateDocuments()
  return useMutation({
    mutationFn: (input: CreateDocumentInput) => createDocument(input),
    onSuccess: invalidate,
  })
}

export function useDeleteDocument() {
  const invalidate = useInvalidateDocuments()
  return useMutation({
    mutationFn: (id: number) => deleteDocument(id),
    onSuccess: invalidate,
  })
}
