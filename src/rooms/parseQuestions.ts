import { Question } from '~/types'

export const parseQuestions = (data: Record<string, Question>): Question[] =>
  Object.entries(data).map(item => {
    const [key, value] = item as [string, Question]

    return {
      id: key,
      ...value
    }
  })
