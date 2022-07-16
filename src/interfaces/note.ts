export interface INote {
  id?: number
  title: string
  date: string
  body?: string
  tags: string[]
  isPrivate: boolean
}