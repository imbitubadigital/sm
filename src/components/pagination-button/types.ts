export type PaginationButtonProps = {
  onClick?: () => void
  children: React.ReactNode
  disabled?: boolean
  type: 'next' | 'previous'
}
