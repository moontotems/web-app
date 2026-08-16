import { XCircle } from 'lucide-react'
import type { ReactNode } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'

/** Overlay container for MoonTotem feature panels (legacy MoonTotemFeatureContainer). */
export function FeaturePanel({
  icon,
  title,
  children,
  onClose,
  variant = 'default',
}: {
  icon?: ReactNode
  title: string
  children: ReactNode
  onClose?: () => void
  variant?: 'default' | 'freshMint'
}) {
  const { isMobile, closeFeaturePanels } = useMoonTotems()

  const close = () => {
    onClose?.()
    closeFeaturePanels()
  }

  return (
    <div
      className="w-full pt-2.5"
      style={
        variant === 'freshMint'
          ? { backgroundColor: '#4589FF', opacity: 0.95, padding: 15 }
          : { background: isMobile ? 'rgba(0, 0, 0, 0.8)' : 'none' }
      }
    >
      <div className="mb-4 flex w-full items-center pl-[17px]">
        <span>{icon}</span>
        <span className="pl-2.5 text-xl">{title}</span>
        <button
          type="button"
          aria-label="Close"
          className="ml-auto mr-2 cursor-pointer"
          onClick={close}
        >
          <XCircle className="size-8" strokeWidth={1} />
        </button>
      </div>
      <div className="w-full pl-5 text-lg text-white">{children}</div>
    </div>
  )
}
