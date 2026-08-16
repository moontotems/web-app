import { cn } from '@moontotems/ui'

/** Muted looping Mux embed used by the hero and split sliders. */
export function MuxLoop({
  src,
  title,
  className,
}: {
  src: string
  title: string
  className?: string
}) {
  return (
    <iframe
      allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
      className={cn('pointer-events-none border-0', className)}
      src={src}
      title={title}
    />
  )
}
