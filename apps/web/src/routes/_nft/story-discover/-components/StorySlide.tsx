import { useEffect, useRef, useState } from 'react'

import { HEADER_HEIGHT } from '~/lib/constants'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import { useTokenMetadata } from '~/lib/nft/use-token-data'

import { describeTotem, getLunarStoryImages } from '../-data'

const CHAR_MS = 20
/** Pause between each animation stage (headline → images → body → button). */
const PAUSE_MS = 2000

export const StorySlide = ({ tokenId, eager }: { tokenId: number; eager?: boolean }) => {
  const { isMobile } = useMoonTotems()
  const metaData = useTokenMetadata(tokenId)
  const slideRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [titleCharCount, setTitleCharCount] = useState(0)
  const [visibleLunarCount, setVisibleLunarCount] = useState(0)
  const [bodyReady, setBodyReady] = useState(false)
  const [bodyCharCount, setBodyCharCount] = useState(0)
  const [showButton, setShowButton] = useState(false)
  const [showImage, setShowImage] = useState(false)

  const title = metaData ? `${metaData.trait_name1} ${metaData.trait_name2}` : ''
  const fullText = metaData ? describeTotem(metaData) : ''
  const titleDone = title.length > 0 && titleCharCount >= title.length
  const lunarItems = metaData ? getLunarStoryImages(metaData) : []
  const lunarDone = titleDone && visibleLunarCount >= lunarItems.length
  const bodyDone = bodyReady && fullText.length > 0 && bodyCharCount >= fullText.length

  useEffect(() => {
    const el = slideRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry?.isIntersecting ?? false)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // 1. Type the headline.
  useEffect(() => {
    if (!inView || !title || titleCharCount >= title.length) return

    const id = window.setTimeout(() => {
      setTitleCharCount((n) => Math.min(n + 1, title.length))
    }, CHAR_MS)
    return () => window.clearTimeout(id)
  }, [inView, title, titleCharCount])

  // 2. Reveal lunar images one after another after the headline (same pause between each).
  useEffect(() => {
    if (!titleDone || visibleLunarCount >= lunarItems.length) return

    const id = window.setTimeout(() => {
      setVisibleLunarCount((n) => n + 1)
    }, PAUSE_MS)
    return () => window.clearTimeout(id)
  }, [titleDone, visibleLunarCount, lunarItems.length])

  // 3. Pause after lunar images, then allow body typing.
  useEffect(() => {
    if (!lunarDone || bodyReady) return

    const id = window.setTimeout(() => {
      setBodyReady(true)
    }, PAUSE_MS)
    return () => window.clearTimeout(id)
  }, [lunarDone, bodyReady])

  // 4. Type the body text, pausing after each sentence.
  useEffect(() => {
    if (!inView || !bodyReady || !fullText || bodyCharCount >= fullText.length) return

    const atSentenceEnd =
      bodyCharCount > 0 &&
      fullText[bodyCharCount - 1] === '.' &&
      bodyCharCount < fullText.length

    const id = window.setTimeout(
      () => {
        setBodyCharCount((n) => Math.min(n + 1, fullText.length))
      },
      atSentenceEnd ? PAUSE_MS : CHAR_MS,
    )
    return () => window.clearTimeout(id)
  }, [inView, bodyReady, fullText, bodyCharCount])

  // 5. Pause after body text, then show the reveal button.
  useEffect(() => {
    if (!bodyDone || showButton || showImage) return

    const id = window.setTimeout(() => {
      setShowButton(true)
    }, PAUSE_MS)
    return () => window.clearTimeout(id)
  }, [bodyDone, showButton, showImage])

  return (
    <div
      ref={slideRef}
      className="snap-start overflow-hidden bg-black"
      style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      <div
        className={
          isMobile
            ? 'flex h-full w-full flex-col'
            : 'flex h-full w-full flex-row'
        }
      >
        <div
          className={
            isMobile
              ? showImage
                ? 'flex h-1/2 w-full items-start overflow-y-auto'
                : 'flex h-full w-full items-start overflow-y-auto'
              : 'flex h-full w-1/2 items-start overflow-y-auto'
          }
        >
          <div className="w-full p-[25px] text-left text-white">
            <h2 className="m-0 text-[32px] font-light leading-[40px] md:text-[55px] md:leading-[60px]">
              {title.slice(0, titleCharCount)}
              {inView && !titleDone && title ? (
                <span className="ml-0.5 inline-block animate-pulse text-white/70">|</span>
              ) : null}
            </h2>

            {titleDone && lunarItems.length > 0 ? (
              <div className="mt-6 flex gap-4">
                {lunarItems.map((item, index) => (
                  <div
                    key={item.label}
                    className="min-w-0 flex-1 transition-opacity duration-700"
                    style={{ opacity: index < visibleLunarCount ? 1 : 0 }}
                  >
                    <img
                      alt={item.label}
                      className="aspect-square w-full object-contain"
                      decoding="async"
                      loading="lazy"
                      src={item.src}
                      title={item.label}
                    />
                  </div>
                ))}
              </div>
            ) : null}

            {bodyReady ? (
              <p className="m-0 mt-6 whitespace-pre-wrap text-[23px] font-light leading-[34px] md:text-[27px] md:leading-[35px]">
                {fullText.slice(0, bodyCharCount)}
                {inView && !bodyDone && fullText ? (
                  <span className="ml-0.5 inline-block animate-pulse text-white/70">|</span>
                ) : null}
              </p>
            ) : null}

            {showButton && !showImage ? (
              <button
                type="button"
                className="mt-6 cursor-pointer bg-[#1062FE] px-5 py-2.5 text-base text-white hover:brightness-110"
                onClick={() => setShowImage(true)}
              >
                Reveal Totem
              </button>
            ) : null}
          </div>
        </div>

        {!isMobile || showImage ? (
          <div
            className={
              isMobile
                ? 'relative flex h-1/2 w-full items-center justify-center bg-black'
                : 'relative flex h-full w-1/2 items-center justify-center bg-black'
            }
          >
            <img
              alt={`Moon Totem ${tokenId}`}
              src={getImageUrl({ tokenId, size: 2048 })}
              className="h-full w-full object-contain transition-opacity duration-1000"
              style={{ opacity: showImage ? 1 : 0 }}
              decoding="async"
              draggable={false}
              loading={eager ? 'eager' : 'lazy'}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
