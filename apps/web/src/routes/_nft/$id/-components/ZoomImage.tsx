import { useEffect, useRef, useState } from 'react'

interface ZoomDimensions {
  width: number
  height: number
}

interface ZoomOffset {
  left: number
  top: number
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

/**
 * Replacement for react-inner-image-zoom (pan move type, as used by the
 * legacy MoonTotem page): clicking overlays the zoom image at its natural
 * size * zoomScale and moving the mouse pans across it; clicking again
 * zooms back out.
 */
export function ZoomImage({
  src,
  zoomSrc,
  alt,
  height,
  zoomScale = 1.1,
}: {
  src: string
  zoomSrc?: string
  alt: string
  height: string
  zoomScale?: number
}) {
  const previewRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const [zoomDimensions, setZoomDimensions] = useState<ZoomDimensions | null>(null)
  const [offset, setOffset] = useState<ZoomOffset>({ left: 0, top: 0 })

  const activeZoomSrc = zoomSrc ?? src

  // Preload the zoom image (zoomPreload in the legacy widget) and capture its
  // natural size. Also reset the zoom state when navigating between totems.
  useEffect(() => {
    setZoomed(false)
    setZoomDimensions(null)

    const img = new Image()
    img.onload = () => {
      setZoomDimensions({
        width: img.naturalWidth * zoomScale,
        height: img.naturalHeight * zoomScale,
      })
    }
    img.src = activeZoomSrc

    return () => {
      img.onload = null
    }
  }, [activeZoomSrc, zoomScale])

  // Map the cursor position to a pan offset: moving across the container
  // moves across the full zoomed image. Axes smaller than the container are
  // centered instead.
  const panInRect = (clientX: number, clientY: number, rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>) => {
    if (!zoomDimensions) return

    const left =
      zoomDimensions.width > rect.width
        ? -(zoomDimensions.width - rect.width) * clamp01((clientX - rect.left) / rect.width)
        : (rect.width - zoomDimensions.width) / 2
    const top =
      zoomDimensions.height > rect.height
        ? -(zoomDimensions.height - rect.height) * clamp01((clientY - rect.top) / rect.height)
        : (rect.height - zoomDimensions.height) / 2

    setOffset({ left, top })
  }

  const panTo = (clientX: number, clientY: number) => {
    const el = overlayRef.current ?? previewRef.current
    if (!el) return
    panInRect(clientX, clientY, el.getBoundingClientRect())
  }

  const onClick = (event: React.MouseEvent) => {
    if (!zoomDimensions) return
    if (zoomed) {
      setZoomed(false)
      return
    }
    panInRect(event.clientX, event.clientY, {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    })
    setZoomed(true)
  }

  const onMouseMove = (event: React.MouseEvent) => {
    if (!zoomed) return
    panTo(event.clientX, event.clientY)
  }

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: zoom affordance mirrors legacy widget */}
      <div
        ref={previewRef}
        className="relative flex w-full items-center justify-center overflow-hidden"
        style={{ height, cursor: zoomed ? 'zoom-out' : 'zoom-in' }}
        onClick={zoomed ? undefined : onClick}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          style={{ visibility: zoomed ? 'hidden' : 'visible' }}
          draggable={false}
        />
      </div>
      {zoomed && zoomDimensions && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: zoom affordance mirrors legacy widget
        <div
          ref={overlayRef}
          className="fixed inset-0 z-10000 overflow-hidden bg-black"
          style={{ cursor: 'zoom-out' }}
          onClick={onClick}
          onMouseMove={onMouseMove}
        >
          <img
            src={activeZoomSrc}
            alt={alt}
            className="absolute block"
            style={{
              width: zoomDimensions.width,
              height: zoomDimensions.height,
              maxWidth: 'none',
              maxHeight: 'none',
              left: offset.left,
              top: offset.top,
            }}
            draggable={false}
          />
        </div>
      )}
    </>
  )
}
