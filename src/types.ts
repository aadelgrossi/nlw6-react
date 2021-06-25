export interface Author {
  name: string
  avatar: string
}

export interface Question {
  id?: string
  author: Author
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}

export interface Room {
  id: string
  name: string
  authorId: string
  initialQuestions: Question[]
}
