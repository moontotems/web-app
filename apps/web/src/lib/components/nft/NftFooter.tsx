import { Link } from '@tanstack/react-router'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { SOCIAL_LINKS } from '~/lib/nft/constants'

function SocialMediaIcons() {
  return (
    <div className="flex items-center gap-1.5">
      <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer">
        <img src="/icons/Logo-Instagram.svg" alt="Moon Totems Instagram" width={10} />
      </a>
      <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer">
        <img src="/icons/Logo-Twitter.svg" alt="Moon Totems Twitter" width={10} />
      </a>
      <a href={SOCIAL_LINKS.discord} target="_blank" rel="noreferrer">
        <img src="/icons/Logo-Discord.svg" alt="Moon Totems Discord" width={10} />
      </a>
      <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">
        <img src="/icons/Logo-Github.svg" alt="Moon Totems Github" width={10} className="ml-0.5" />
      </a>
    </div>
  )
}

/** 40px bottom bar (legacy Footer). */
export function NftFooter() {
  const { isMobile } = useMoonTotems()

  return (
    <div
      id="footer"
      className="z-1000 flex h-10 w-full items-center justify-between border-t border-[#393939] bg-black px-[15px] pr-[30px] text-[11px] text-white"
    >
      <div className="flex items-center gap-[15px]">
        <Link to="/terms-and-conditions" className="hover:underline">
          Terms &amp; Conditions
        </Link>
        <a href="mailto:moontotems@gmail.com" className="hover:underline">
          Contact
        </a>
        {!isMobile && <SocialMediaIcons />}
      </div>

      <div className="flex items-center gap-[15px]">
        <span>© 2021 Moon Totems LLC</span>
        <img src="/moon_totem_logo_512.png" width={20} alt="Logo Copyright" />
      </div>
    </div>
  )
}
