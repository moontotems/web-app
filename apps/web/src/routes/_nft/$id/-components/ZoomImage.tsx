import { LoaderCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface ZoomDimensions {
  width: number
  height: number
}

interface ZoomOffset {
  left: number
  top: number
}

interface ZoomPoint {
  x: number
  y: number
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

function panOffset(
  zoom: ZoomDimensions,
  clientX: number,
  clientY: number,
  rect: Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>,
): ZoomOffset {
  const left =
    zoom.width > rect.width
      ? -(zoom.width - rect.width) * clamp01((clientX - rect.left) / rect.width)
      : (rect.width - zoom.width) / 2
  const top =
    zoom.height > rect.height
      ? -(zoom.height - rect.height) * clamp01((clientY - rect.top) / rect.height)
      : (rect.height - zoom.height) / 2
  return { left, top }
}

const FULLSCREEN = { left: 0, top: 0, width: 0, height: 0 }

/**
 * Replacement for react-inner-image-zoom (pan move type, as used by the
 * legacy MoonTotem page): clicking overlays the zoom image at its natural
 * size * zoomScale and moving the mouse pans across it; clicking again
 * zooms back out.
 */
export const ZoomImage = ({
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
}) => {
  const previewRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const [pendingZoom, setPendingZoom] = useState<ZoomPoint | null>(null)
  const [zoomDimensions, setZoomDimensions] = useState<ZoomDimensions | null>(null)
  const [offset, setOffset] = useState<ZoomOffset>({ left: 0, top: 0 })

  const activeZoomSrc = zoomSrc ?? src
  const loading = pendingZoom !== null && !zoomed

  useEffect(() => {
    setZoomed(false)
    setPendingZoom(null)
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

  useEffect(() => {
    if (!pendingZoom || !zoomDimensions) return
    setOffset(
      panOffset(zoomDimensions, pendingZoom.x, pendingZoom.y, {
        ...FULLSCREEN,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    )
    setZoomed(true)
    setPendingZoom(null)
  }, [pendingZoom, zoomDimensions])

  const panTo = (clientX: number, clientY: number) => {
    if (!zoomDimensions) return
    const el = overlayRef.current ?? previewRef.current
    if (!el) return
    setOffset(panOffset(zoomDimensions, clientX, clientY, el.getBoundingClientRect()))
  }

  const onClick = (event: React.MouseEvent) => {
    if (zoomed) {
      setZoomed(false)
      return
    }
    if (pendingZoom) {
      setPendingZoom(null)
      return
    }
    const point = { x: event.clientX, y: event.clientY }
    if (zoomDimensions) {
      setOffset(
        panOffset(zoomDimensions, point.x, point.y, {
          ...FULLSCREEN,
          width: window.innerWidth,
          height: window.innerHeight,
        }),
      )
      setZoomed(true)
      return
    }
    setPendingZoom(point)
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
        style={{ height, cursor: loading ? 'wait' : zoomed ? 'zoom-out' : 'zoom-in' }}
        onClick={zoomed ? undefined : onClick}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          style={{ visibility: zoomed ? 'hidden' : 'visible' }}
          draggable={false}
        />
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
            <LoaderCircle className="size-10 animate-spin text-white" />
          </div>
        )}
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
