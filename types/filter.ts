export interface FilterOption {
  value: string
  label: string
}

export interface FilterType {
  id: number
  label: string
  options: FilterOption[]
}
