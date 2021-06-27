export interface Author {
  name: string
  avatar: string
}

export interface QuestionInput {
  author: Author
  content: string
  isAnswered: boolean
  isHighlighted: boolean
}

export interface Question extends QuestionInput {
  id: string
}

export interface Room {
  id: string
  name: string
  authorId: string
  initialQuestions: Question[]
}
