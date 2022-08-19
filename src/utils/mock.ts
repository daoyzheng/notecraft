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
        name: 'notebook154',
        createdAt: '2020-08-18',
        children: []
      },
      {
        id: 12,
        name: 'notebook54',
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
    notes: []
  }
]