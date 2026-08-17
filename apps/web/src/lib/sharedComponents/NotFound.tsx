import { Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { FloatingTotems } from './FloatingTotems'

/** 404 page styled like the NFT overview: black field, light type, explore boxes. */
export function NotFound() {
  return (
    <div className="nft-theme dark relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-black text-white">
      <FloatingTotems count={1} size={180} />

      <div className="relative z-10 w-full p-[5%] md:max-w-3xl">
        <div className="text-[32px] font-light md:text-[55px]">404</div>
        <div className="text-[32px] font-light leading-[40px] md:text-[55px] md:leading-[60px]">
          This page does not exist.
        </div>
      </div>

      <div className="relative z-10 flex w-full md:w-[350px] md:self-end">
        <button
          className="explore-box relative h-[150px] w-1/2 cursor-pointer p-[15px] text-left"
          onClick={() => window.history.back()}
          type="button"
        >
          <div className="flex h-full items-end justify-between gap-2">
            <ArrowLeft className="size-8 shrink-0 text-white" />
            <div className="text-[17px] leading-[28px] whitespace-nowrap">Go back</div>
          </div>
        </button>
        <Link
          className="explore-box relative h-[150px] w-1/2 border-l border-[#393939]/40 p-[15px] md:border-l-0"
          to="/"
        >
          <div className="flex h-full items-end justify-between gap-2">
            <div className="text-[17px] leading-[28px] whitespace-nowrap">Explore</div>
            <ArrowRight className="size-8 shrink-0" style={{ color: '#00FF74' }} />
          </div>
        </Link>
      </div>
    </div>
  )
}
