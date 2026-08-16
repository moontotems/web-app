import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

/** Green-arrow explore box linking to the gallery (legacy explore-box CTA). */
export function ExploreLink({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <Link className={`explore-box h-[150px] w-[300px] p-[15px] ${className}`} to="/all">
      <div className="text-[17px]">{label}</div>
      <ArrowRight
        className="absolute right-[15px] bottom-[15px] size-8"
        style={{ color: '#00FF74' }}
      />
    </Link>
  )
}
