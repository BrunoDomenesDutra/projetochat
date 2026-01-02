// app/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, LogIn } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-6xl font-bold text-foreground">404</div>
        <h1 className="text-2xl font-semibold text-foreground">Página não encontrada</h1>
        <p className="text-muted-foreground">Desculpe, a página que você está tentando acessar não existe.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Ir para login
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Página inicial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
