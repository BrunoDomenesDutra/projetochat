// app/(protected)/dashboard/page.tsx
'use client'

import { useSession } from '@/lib/auth-client'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { User } from 'lucide-react'
import { AuthButton } from '@/components/auth/login-button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink } from 'lucide-react'

export default function UserDashboardPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login')
    }
  }, [isPending, session, router])

  if (isPending || !session) return null

  const user = session!.user

  // ✅ Calcula a URL diretamente — sem useEffect, sem useState
  const obsUrl = typeof window !== 'undefined' ? `${window.location.origin}/obs` : ''

  const copyToClipboard = () => {
    if (obsUrl) {
      navigator.clipboard.writeText(obsUrl)
    }
  }

  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
      {/* Card do Usuário */}
      <Card className="w-full max-w-md mb-8">
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

      {/* Card do OBS */}
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Exibição para OBS</CardTitle>
          <CardDescription>Teste</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={obsUrl}
              readOnly
              className="flex-1 p-2 border rounded bg-muted text-foreground"
              placeholder="Carregando URL..."
            />
            <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!obsUrl}>
              <Copy className="w-4 h-4 mr-2" />
              Copiar
            </Button>
            <Button size="sm" variant="secondary" asChild>
              <a href="/obs/metas" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            No OBS: Fontes → Browser Source → Cole a URL e desmarque &quot;Scrollbars&quot;.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
