export const notesMock = [
  {
    id: 1,
    title: 'How to create markdown file How to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown fileHow to create markdown file',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'loremloremloremloremloremlor emloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
    tags: ['new', 'hey', 'ho', 'here'],
    isPublic: true,
    notebookId: 1
  },
  {
    id: 2,
    title: 'How to create markdown file',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'hey body',
    tags: ['new', 'hey', 'ho'],
    isPublic: false,
    notebookId: 1
  },
  {
    id: 3,
    title: 'How to create markdown file',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'HEHLKJCIOENO',
    tags: [],
    isPublic: false,
    notebookId: 2
  },
  {
    id: 4,
    title: 'How to create markdown file',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    tags: [],
    isPublic: true,
    notebookId: 2
  },
  {
    id: 5,
    title: 'notecraft is awesome',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'NOTECRAFT IS AWESOME',
    tags: [],
    isPublic: true,
    notebookId: 3
  },
  {
    id: 6,
    title: 'notecraft is awesome',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'NOTECRAFT IS AWESOME',
    tags: [],
    isPublic: true,
    notebookId: 12
  },
  {
    id: 7,
    title: 'notecraft is awesome',
    createdAt: '2020-06-14',
    updatedAt: '2022-08-14',
    body: 'NOTECRAFT IS AWESOME',
    tags: [],
    isPublic: true,
    notebookId: 12
  }
]

export const notebooksMock = [
  {
    id: 1,
    name: 'notebook1',
    createdAt: '2020-08-18',
    children: [
      {
        id: 10,
        name: 'notebook1-1',
        createdAt: '2020-08-18',
        children: []
      },
      {
        id: 12,
        name: 'notebook1-2',
        createdAt: '2020-08-18',
        children: []
      }
    ]
  },
  {
    id: 2,
    name: 'notebook2',
    createdAt: '2020-08-18',
    children: [],
  },
  {
    id: 3,
    name: 'notebook3',
    createdAt: '2020-08-18',
    children: [
      {
        id: 14,
        name: 'notebook3-1',
        createdAt: '2020-08-18',
        children: []
      }
    ]
  }
]