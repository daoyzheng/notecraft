export interface INote {
  id?: number
  title: string
  createdAt: string
  body?: string
  tags: string[]
  isPublic: boolean
}