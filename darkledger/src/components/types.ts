export interface IDarkLedgerProps {
  title?: string
}

export interface IDarkLedgerState {
  loading: boolean
  loadingMessage: string
  error?: Error
}
