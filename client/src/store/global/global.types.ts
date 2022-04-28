export interface IGlobalState {
  searchQuery: string
  isLoading?: boolean
  errorStatusCode?: number
  error?: {
    status: string
    title: string
    detail: string
    message: string
  }
}
