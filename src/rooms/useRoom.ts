import { useCallback } from 'react'

import { database, firebase } from '~/auth/firebase'

import { CreateRoomData } from './types'

const roomRef = database.ref('rooms')

interface RoomHookData {
  createRoom: (
    data: CreateRoomData
  ) => Promise<firebase.database.ThenableReference>
}

const useRoom = (): RoomHookData => {
  const createRoom = useCallback(
    async (
      data: CreateRoomData
    ): Promise<firebase.database.ThenableReference> => {
      return roomRef.push({ ...data, createdAt: new Date() })
    },
    []
  )

  return { createRoom }
}

export { useRoom }
