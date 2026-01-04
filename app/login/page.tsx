// app/login/page.tsx

'use client'

import { LoginForm } from '@/components/auth/login-form'
import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  const { data: session, isPending } = useSession()

  if (session) {
    redirect('/dashboard')
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg"></div>
      </div>
    )
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}
