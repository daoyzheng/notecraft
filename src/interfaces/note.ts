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
  folderId: number|null
}

export interface IFolder {
  id: number|null
  name: string
  createdAt: string
  parentFolderId: number|null
}

export interface IDirectoryTree {
  id: number
  name: string
  expand: boolean
  // parentId: number|null
  children: IDirectoryTree[]
  isFolder: boolean
}
