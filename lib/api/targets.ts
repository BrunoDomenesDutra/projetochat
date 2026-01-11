// projetochat/lib/api/targets.ts

export async function setTargetVisibility(targetId: number, visible: boolean) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/targets/${targetId}/visibility`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ visible }),
  })

  if (!res.ok) {
    throw new Error('Failed to update target visibility')
  }

  return res.json()
}
