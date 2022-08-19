export interface INote {
  id?: number
  title: string
  createdAt: string
  updatedAt: string
  body?: string
  tags: string[]
  isPublic: boolean
}

export interface INotebook {
  id?: number
  name: string
  createdAt: string
  children: INotebook[]
}