import { CircleUserRound, Lock, Moon } from 'lucide-react'

import type { MoonTotem } from '~/lib/nft/types'

export function StatusIcon({
  moonTotem,
  className,
}: {
  moonTotem: MoonTotem
  className?: string
}) {
  if (moonTotem.ownedByUser) {
    return <CircleUserRound className={className} aria-label="Owned by you" />
  }
  if (moonTotem.minted) {
    return <Lock className={className} aria-label="Taken" />
  }
  return <Moon className={className} aria-label="Available" />
}
