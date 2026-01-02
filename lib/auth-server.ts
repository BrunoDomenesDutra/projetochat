import { auth } from '@/lib/auth'

export async function getCurrentUser() {
  const session = await auth.api.getSession()
  return session?.user || null
}
