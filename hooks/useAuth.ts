import { User } from '@vessell/sdk/dist/cjs/types/auth'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import SDK from 'sdk'

interface UseAuthOptions {
  redirect: boolean
}

export const useAuth = (options?: UseAuthOptions) => {
  const router = useRouter()

  const [user, setUser] = useState<User | null>()
  const isLogged = useMemo(() => Boolean(user), [user])

  useEffect(() => SDK.auth.onAuthStateChanged(setUser), [])

  useEffect(() => {
    if (user === null && options?.redirect && router.isReady) {
      router.push({
        pathname: '/login',
        query: { ...router.query, redirect: router.pathname },
      })
    }
  }, [user, router.isReady])

  return { isLogged, user }
}
