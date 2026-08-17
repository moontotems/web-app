import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { ProjectAsset } from './PROJECT_ASSETS'

export const AssetLightbox = ({
  asset,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  asset: ProjectAsset
  index: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) => {
  const onCloseRef = useRef(onClose)
  const onPrevRef = useRef(onPrev)
  const onNextRef = useRef(onNext)
  onCloseRef.current = onClose
  onPrevRef.current = onPrev
  onNextRef.current = onNext
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onPrevRef.current()
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNextRef.current()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    void video.play().catch(() => {
      // Autoplay can fail without unmuted gesture in some browsers; controls remain.
    })
  }, [])

  if (typeof document === 'undefined') return null

  return createPortal(
    <dialog
      aria-label={asset.title}
      className="fixed inset-0 z-10000 m-0 flex h-dvh max-h-none w-screen max-w-none flex-col border-0 bg-black p-0 text-white open:flex"
      open
    >
      <div className="relative z-10 flex shrink-0 items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm tracking-[0.16px] text-white/80">{asset.title}</p>
          <p className="text-xs text-white/40">
            {index + 1} / {total}
          </p>
        </div>
        <button
          aria-label="Close"
          className="flex size-10 shrink-0 items-center justify-center text-white/70 transition hover:text-white"
          onClick={onClose}
          type="button"
        >
          <X className="size-6" />
        </button>
      </div>

      <button
        aria-label="Close lightbox"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />

      <button
        aria-label="Previous asset"
        className="pointer-events-auto absolute top-1/2 left-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center text-white/50 transition hover:text-white md:left-4"
        onClick={(event) => {
          event.stopPropagation()
          onPrev()
        }}
        type="button"
      >
        <ChevronLeft className="size-8" />
      </button>

      <button
        aria-label="Next asset"
        className="pointer-events-auto absolute top-1/2 right-2 z-20 flex size-12 -translate-y-1/2 items-center justify-center text-white/50 transition hover:text-white md:right-4"
        onClick={(event) => {
          event.stopPropagation()
          onNext()
        }}
        type="button"
      >
        <ChevronRight className="size-8" />
      </button>

      <div className="pointer-events-none relative z-10 flex min-h-0 flex-1 items-center justify-center p-4 md:p-8">
        <div className="pointer-events-auto flex max-h-full max-w-full items-center justify-center">
          {asset.kind === 'image' ? (
            <img
              alt={asset.title}
              className="max-h-[calc(100dvh-5.5rem)] max-w-full object-contain"
              decoding="async"
              src={asset.url}
            />
          ) : null}

          {asset.kind === 'video' ? (
            // biome-ignore lint/a11y/useMediaCaption: promotional clips without caption tracks
            <video
              autoPlay
              className="max-h-[calc(100dvh-5.5rem)] max-w-full object-contain"
              controls
              playsInline
              ref={videoRef}
              src={asset.url}
            />
          ) : null}

          {asset.kind === 'font' || asset.kind === 'other' ? (
            <div className="max-w-md px-6 text-center">
              <p className="mb-2 text-xs tracking-[0.16px] text-white/50 uppercase">{asset.kind}</p>
              <p className="mb-6 text-lg">{asset.title}</p>
              <a
                className="inline-block border border-white/30 px-5 py-2 text-sm tracking-[0.16px] transition hover:border-white hover:bg-white/10"
                href={asset.url}
                rel="noreferrer"
                target="_blank"
              >
                Open file
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </dialog>,
    document.body,
  )
}
