import { getImageUrl } from '~/lib/nft/image-url'

const TEAM = [
  {
    image: getImageUrl({ tokenId: 475, size: 2048 }),
    name: 'Gittan Clouds',
    role: 'Ethereal Developer',
    link: 'https://github.com/moontotems',
    icon: '/home/icons/Logo-Github.svg',
    iconAlt: 'Moon Totems Github',
  },
  {
    image: getImageUrl({ tokenId: 8996, size: 2048 }),
    name: 'Flotsam Theamy',
    role: 'Creative Medium',
    link: 'https://instagram.com/moontotems',
    icon: '/home/icons/Logo-Instagram.svg',
    iconAlt: 'Moon Totems Instagram',
  },
]

/** Two-member team section (legacy Team section). */
export function TeamSection() {
  return (
    <section className="mb-[2%] w-full overflow-hidden bg-black">
      <div className="p-[25px] text-xl">Team</div>
      <div className="flex w-full flex-col gap-8 px-[10%] md:flex-row md:gap-[10%]">
        {TEAM.map((member) => (
          <div className="w-full text-center md:w-1/2" key={member.name}>
            <img alt={member.name} className="w-full" src={member.image} />
            <div className="text-[29px] font-semibold">{member.name}</div>
            <div className="text-[27px] font-normal">{member.role}</div>
            <a href={member.link} rel="noreferrer" target="_blank">
              <img
                alt={member.iconAlt}
                className="mx-auto mt-[15px]"
                src={member.icon}
                width={50}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
