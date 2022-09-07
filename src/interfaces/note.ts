export interface INote {
  id: number|null
  title: string
  createdAt: string
  updatedAt: string
  body: string|null
  tags: string[]
  isPublic: boolean
  notebookId: number
}

export interface INotebook {
  id: number|null
  name: string
  createdAt: string
  parentNotebookId: number|null
  children: INotebook[]
  isExpanded: boolean
}