import { useCallback } from 'react'

import { database, firebase } from '~/auth'

import { CreateRoomData } from './types'

interface RoomHookData {
  createRoom: (
    data: CreateRoomData
  ) => Promise<firebase.database.ThenableReference>
  joinRoom: (id: string) => Promise<void>
}

const useRoom = (): RoomHookData => {
  const createRoom = useCallback(
    async (
      data: CreateRoomData
    ): Promise<firebase.database.ThenableReference> => {
      const roomRef = database.ref('rooms')

      return roomRef.push({ ...data, createdAt: new Date() })
    },
    []
  )

  const joinRoom = useCallback(async (id: string): Promise<void> => {
    const roomRef = await database.ref(`rooms/${id}`).get()

    if (!roomRef.exists()) {
      throw new Error()
    }
  }, [])

  return { createRoom, joinRoom }
}

export { useRoom }
