import { SOCIAL_LINKS } from '~/lib/nft/constants'

const CHANNELS = [
  {
    name: 'Instagram',
    href: SOCIAL_LINKS.instagram,
    text: 'For visual stories and explorations into the art.',
    icon: '/home/icons/Logo-Instagram.svg',
  },
  {
    name: 'Twitter',
    href: SOCIAL_LINKS.twitter,
    text: 'For the latest announcements and updates.',
    icon: '/home/icons/Logo-Twitter.svg',
  },
  {
    name: 'Discord',
    href: SOCIAL_LINKS.discord,
    text: 'For connecting with the Moon Totem Community.',
    icon: '/home/icons/Logo-Discord.svg',
  },
  {
    name: 'Github',
    href: SOCIAL_LINKS.github,
    text: 'For insights into the technology behind the project.',
    icon: '/home/icons/Logo-Github.svg',
  },
]

/** Social channels overview (legacy SocialMedia section). */
export function SocialMediaSection() {
  return (
    <section className="w-full bg-black">
      <div className="mt-[2%] overflow-hidden">
        <div className="float-left w-full p-[25px] text-xl md:w-1/4">@moontotemsnft</div>
        <div className="float-left w-full p-5 text-[23px] font-light leading-[34px] md:w-2/5 md:text-[27px] md:leading-[35px]">
          Moon Totems are beautiful crypto talismans from the moon and discovered on the Ethereum
          blockchain.
        </div>
      </div>
      <div className="mt-[2%] overflow-hidden">
        <div className="hidden w-1/4 md:float-left md:block" />
        <div className="w-full p-5 md:float-left md:w-[70%]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
            {CHANNELS.map((channel) => (
              <div key={channel.name}>
                <div className="mt-5 border-l border-[#888] pl-[15px]">
                  <a href={channel.href} rel="noreferrer" target="_blank">
                    <div className="text-[22px] font-normal">{channel.name}</div>
                  </a>
                  <div className="my-10 text-base">{channel.text}</div>
                  <a href={channel.href} rel="noreferrer" target="_blank">
                    <img alt={`Moon Totems ${channel.name}`} src={channel.icon} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
