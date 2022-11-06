import { IDirectoryItem, IFolder, INote, INotebook } from "../interfaces/note"

export const foldersMock : IFolder[] = [
  {
    id: 1,
    name: 'folder1',
    createdAt: '2020-08-18',
    parentFolderId: null
  },
  {
    id: 2,
    name: 'folder2',
    createdAt: '2020-08-18',
    parentFolderId: null
  },
  {
    id: 3,
    name: 'folder3',
    createdAt: '2020-08-18',
    parentFolderId: null,
  },
  {
    id: 4,
    name: 'folder4',
    createdAt: '2020-08-18',
    parentFolderId: 3,
  },
  {
    id: 5,
    name: 'folder5',
    createdAt: '2020-08-18',
    parentFolderId: 4,
  }
]

export const notebooksMock : INotebook[]= [
  {
    id: 10,
    name: 'notebook1',
    createdAt: '2020-08-18',
    folderId: null
  },
  {
    id: 20,
    name: 'notebook2',
    createdAt: '2020-08-18',
    folderId: null
  },
  {
    id: 30,
    name: 'notebook3',
    createdAt: '2020-08-18',
    folderId: 4
  },
  {
    id: 40,
    name: 'notebook4',
    createdAt: '2020-08-18',
    folderId: 4
  }
]

export const notesMock : INote[] = [
  {
    id: 1,
    title: 'How to create markdown file How to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown file',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'loremloremloremloremloremlor emloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    tags: ['new', 'hey', 'ho', 'here'],
    isPublic: true,
    notebookId: 10
  },
  {
    id: 2,
    title: 'How to create markdown file',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'hey body',
    tags: ['new', 'hey', 'ho'],
    isPublic: false,
    notebookId: 10
  },
  {
    id: 3,
    title: 'How to create markdown file',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'HEHLKJCIOENO',
    tags: [],
    isPublic: false,
    notebookId: 20
  },
  {
    id: 4,
    title: 'How to create markdown file',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: null,
    tags: [],
    isPublic: true,
    notebookId: 20
  },
  {
    id: 5,
    title: 'notecraft is awesome',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'NOTECRAFT IS AWESOME',
    tags: [],
    isPublic: true,
    notebookId: 30
  },
  {
    id: 6,
    title: 'welcome to children',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'NOTECRAFT IS AWESOME',
    tags: [],
    isPublic: true,
    notebookId: 30
  },
  {
    id: 7,
    title: 'woo hoo',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'NOTECRAFT IS AWESOME',
    tags: [],
    isPublic: true,
    notebookId: 30
  }
]

export const notebookListMock : IDirectoryItem[] = [
  {
    id: 1,
    name: 'folder1',
    isFolder: true,
    expand: false,
    children: []
  },
  {
    id: 10,
    name: 'notebook1',
    isFolder: false,
    expand: false,
    children: []
  },
  {
    id: 2,
    name: 'folder2',
    isFolder: true,
    expand: false,
    children: []
  },
  {
    id: 3,
    name: 'folder3',
    isFolder: true,
    expand: true,
    children: [
      {
        id: 4,
        name: 'folder4',
        isFolder: true,
        expand: true,
        children: [
          {
            id: 5,
            name: 'folder5',
            isFolder: true,
            expand: false,
            children: []
          },
          {
            id: 30,
            name: 'notebook3',
            expand: false,
            isFolder: false,
            children: []
          },
          {
            id: 40,
            name: 'notebook4',
            expand: false,
            isFolder: false,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 20,
    name: 'notebook2',
    isFolder: false,
    expand: false,
    children: []
  }
]
