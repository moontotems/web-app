import { cn } from '@moontotems/ui'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { DEFAULT_GALLERY_SEARCH } from '~/lib/nft/gallery-search'

// Green-arrow explore box linking to the gallery.
export const ExploreLink = ({
  label,
  className,
}: {
  label: string
  className?: string
}) => {
  return (
    <Link
      className={cn('explore-box h-[150px] w-[300px] p-[15px]', className)}
      search={DEFAULT_GALLERY_SEARCH}
      to="/all"
    >
      <div className="text-[17px]">{label}</div>
      <ArrowRight
        className="absolute right-[15px] bottom-[15px] size-8"
        style={{ color: '#00FF74' }}
      />
    </Link>
  )
}
