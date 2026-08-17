import { useEffect, useRef, type ReactNode } from 'react'

export function HintOverlay({
  children,
  onDismiss,
}: {
  children: ReactNode
  onDismiss: () => void
}) {
  const onDismissRef = useRef(onDismiss)
  onDismissRef.current = onDismiss

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      event.preventDefault()
      event.stopImmediatePropagation()
      onDismissRef.current()
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [])

  return (
    <button
      type="button"
      className="fixed inset-0 z-2000 flex cursor-pointer items-center justify-center bg-black/55"
      onClick={onDismiss}
    >
      <div className="border border-white/20 bg-[#262626] px-12 py-10 text-center text-white">
        {children}
      </div>
    </button>
  )
}
