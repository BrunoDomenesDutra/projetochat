'use client'

import { useSession } from '@/lib/auth-client'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { User } from 'lucide-react'
import { AuthButton } from '@/components/auth/login-button'
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function UserDashboardPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  // Redireciona se sessão for inválida (proteção extra no client)
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login')
    }
  }, [isPending, session, router])

  if (isPending) return
  if (!session) return null // redirecionamento já em andamento

  const user = session!.user

  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 bg-secondary rounded-full p-2">
            {user.image ? (
              <img src={user.image} alt={user.name || 'Avatar'} className="w-16 h-16 rounded-full border" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <User className="text-muted-foreground" />
              </div>
            )}
          </div>
          <CardTitle>{user.name || user.email || 'Usuário'}</CardTitle>
          {user.email && <CardDescription>{user.email}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>ID: {user.id}</p>
            {user.createdAt && <p>Membro desde: {new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>}
          </div>

          <AuthButton variant="logout" className="w-full">
            Sair da conta
          </AuthButton>
        </CardContent>
      </Card>
    </div>
  )
}
