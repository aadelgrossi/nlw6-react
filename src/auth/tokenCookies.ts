import cookies from 'js-cookie'

const TOKEN_KEY = 'authorization'

export const getTokenCookie = (): string | undefined => cookies.get(TOKEN_KEY)

export const setTokenCookie = (token: string): void => {
  cookies.set(TOKEN_KEY, token, {
    expires: 1 / 24
  })
}

export const removeTokenCookie = (): void => cookies.remove(TOKEN_KEY)
