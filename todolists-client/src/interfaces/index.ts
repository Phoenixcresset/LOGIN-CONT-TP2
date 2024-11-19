export interface ITodoList {
  id: string
  description: string
  items: ITodoItem[]
}

export interface ITodoItem {
  id: string
  description: string
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE'
}
