'use client'

import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    redirect('/dashboard') // usuário logado → vai pro dashboard
  }

  redirect('/login') // não logado → vai pro login
}
