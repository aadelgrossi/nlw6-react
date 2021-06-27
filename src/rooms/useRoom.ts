import { useEffect, useState } from 'react'

import { database } from '~/auth'
import { Question } from '~/types'

import { parseQuestions } from './parseQuestions'

interface RoomHookData {
  questions: Question[]
}

const useRoom = (roomId: string): RoomHookData => {
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions = databaseRoom.questions ?? {}
      const newQuestions = parseQuestions(firebaseQuestions)

      setQuestions(newQuestions)
    })
  }, [roomId])

  return { questions }
}

export { useRoom }
