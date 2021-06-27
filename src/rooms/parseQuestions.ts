import { Question, QuestionInput } from '~/types'

export const parseQuestions = (
  data: Record<string, QuestionInput>
): Question[] =>
  Object.entries(data).map(item => {
    const [key, value] = item as [string, QuestionInput]

    return {
      id: key,
      ...value
    }
  })
