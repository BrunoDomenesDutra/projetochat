// auth/AuthButton.tsx
'use client'

import { Button } from '@/components/ui/button'
import { signIn, signOut } from '@/lib/auth-client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthLogoutButtonProps {
  variant: 'logout'
  children: React.ReactNode
  className?: string
}

interface AuthLoginButtonProps {
  variant: 'login'
  provider: 'twitch' | 'google'
  children: React.ReactNode
  className?: string
}

export type AuthButtonPropsUnion = AuthLogoutButtonProps | AuthLoginButtonProps

export function AuthButton(props: AuthButtonPropsUnion) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      if (props.variant === 'login') {
        await signIn.social({ provider: props.provider, callbackURL: '/' })
      } else {
        await signOut()
        router.push('/') // ✅ Redireciona imediatamente após logout
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button type="button" variant="outline" className={props.className} onClick={handleClick} disabled={isLoading}>
      {props.children}
    </Button>
  )
}
