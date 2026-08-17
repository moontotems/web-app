import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react'

const DRAG_THRESHOLD_PX = 4

export const MARQUEE_ITEM_CLASS = 'w-[70vw] shrink-0 px-2 md:w-[20vw]'

function wrapLoop(scroller: HTMLDivElement, startScroll?: { current: number }) {
  const half = scroller.scrollWidth / 2
  if (half <= 0) return
  if (scroller.scrollLeft >= half) {
    scroller.scrollLeft -= half
    if (startScroll) startScroll.current -= half
  } else if (scroller.scrollLeft <= 0) {
    scroller.scrollLeft += half
    if (startScroll) startScroll.current += half
  }
}

// Infinite auto-scrolling row that can be grabbed and dragged.
export const DraggableMarquee = ({
  children,
  direction = 'left',
  speed = 0.6,
}: {
  children: ReactNode
  direction?: 'left' | 'right'
  speed?: number
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollRef = useRef(0)
  const didDragRef = useRef(false)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    scroller.scrollLeft = 1
    const delta = direction === 'left' ? speed : -speed
    let frame = 0

    const tick = () => {
      if (!draggingRef.current) {
        scroller.scrollLeft += delta
        wrapLoop(scroller)
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [direction, speed])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    draggingRef.current = true
    didDragRef.current = false
    startXRef.current = event.clientX
    startScrollRef.current = scroller.scrollLeft
    scroller.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    const scroller = scrollerRef.current
    if (!scroller) return
    const dx = event.clientX - startXRef.current
    if (Math.abs(dx) > DRAG_THRESHOLD_PX) didDragRef.current = true
    scroller.scrollLeft = startScrollRef.current - dx
    wrapLoop(scroller, startScrollRef)
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false
    scrollerRef.current?.releasePointerCapture(event.pointerId)
  }

  return (
    <div
      className="cursor-grab touch-pan-y overflow-x-hidden select-none active:cursor-grabbing"
      onClickCapture={(event) => {
        if (!didDragRef.current) return
        event.preventDefault()
        event.stopPropagation()
        didDragRef.current = false
      }}
      onDragStart={(event) => event.preventDefault()}
      onPointerCancel={onPointerUp}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      ref={scrollerRef}
    >
      <div className="flex w-max">
        <div className="flex">{children}</div>
        <div aria-hidden className="flex">
          {children}
        </div>
      </div>
    </div>
  )
}
