import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

import { useRouter } from 'next/router'

import { firebase, auth } from './firebase'
import { removeTokenCookie, setTokenCookie } from './tokenCookies'

interface AuthContextData {
  user: firebase.User | null
  logout: () => void
  login: () => Promise<firebase.auth.UserCredential | undefined>
  authenticated: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const router = useRouter()

  const logout = useCallback(() => {
    auth.signOut().then(() => {
      router.push('/')
    })
  }, [router])

  const login = useCallback(async (): Promise<
    firebase.auth.UserCredential | undefined
  > => {
    const provider = new firebase.auth.GoogleAuthProvider()

    return auth.signInWithPopup(provider)
  }, [])

  useEffect(() => {
    const cancelAuthListener = auth.onIdTokenChanged(async user => {
      if (user) {
        const token = await user.getIdToken()
        setTokenCookie(token)

        setUser(user)
      } else {
        removeTokenCookie()
        setUser(null)
      }
    })

    return () => {
      cancelAuthListener()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, authenticated: !!user, logout, login }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => useContext(AuthContext)
