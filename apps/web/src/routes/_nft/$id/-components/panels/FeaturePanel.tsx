import { XCircle } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@moontotems/ui'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'

// Overlay container for MoonTotem feature panels (legacy MoonTotemFeatureContainer).
export const FeaturePanel = ({
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
}) => {
  const { isMobile, closeFeaturePanels } = useMoonTotems()

  const close = () => {
    onClose?.()
    closeFeaturePanels()
  }

  const isDefaultMobile = isMobile && variant === 'default'

  return (
    <div
      className={cn('w-full', isDefaultMobile && 'min-h-full')}
      style={
        variant === 'freshMint'
          ? { backgroundColor: '#4589FF', opacity: 0.95, padding: 15 }
          : { background: isMobile ? 'rgba(0, 0, 0, 0.8)' : 'none' }
      }
    >
      <div
        className={cn(
          'mb-4 flex w-full items-center pt-2.5 pl-[17px]',
          isDefaultMobile && 'sticky top-0 z-10 bg-black/80',
        )}
      >
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
      <div className={cn('w-full pl-5 text-lg text-white', isDefaultMobile && 'pb-8')}>
        {children}
      </div>
    </div>
  )
}
