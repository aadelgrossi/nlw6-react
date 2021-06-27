import { useCallback, useEffect, useState } from 'react'

import { database, useAuth } from '~/auth'
import { Question, QuestionInput } from '~/types'

interface RoomHookData {
  questions: Question[]
}

const useRoom = (roomId: string): RoomHookData => {
  const [questions, setQuestions] = useState<Question[]>([])
  const { user } = useAuth()

  const parseQuestions = useCallback(
    (data: Record<string, QuestionInput>): Question[] =>
      Object.entries(data).map(item => {
        const [key, value] = item as [string, QuestionInput]

        const likeCount = Object.values(value.likes ?? {}).length
        const likeId = Object.entries(value.likes ?? {}).find(
          ([_, like]) => like.authorId === user?.uid
        )?.[0]

        return {
          id: key,
          likeCount,
          likeId,
          ...value
        }
      }),
    [user?.uid]
  )

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions = databaseRoom.questions ?? {}
      const newQuestions = parseQuestions(firebaseQuestions)

      setQuestions(newQuestions)
    })

    return () => roomRef.off('value')
  }, [roomId, parseQuestions])

  return { questions }
}

export { useRoom }
