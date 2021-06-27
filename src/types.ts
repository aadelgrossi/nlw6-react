export interface Author {
  name: string
  avatar: string
}

export interface QuestionInput {
  author: Author
  content: string
  isAnswered: boolean
  isHighlighted: boolean
  likes: Record<string, { authorId: string }>
}

export interface Question extends QuestionInput {
  id: string
  hasLiked: boolean
  likeCount: number
}

export interface Room {
  id: string
  name: string
  authorId: string
  initialQuestions: Question[]
}
