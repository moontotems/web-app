import { socialChannels } from '../-data'

/** Social channels overview. */
export function SocialMediaSection() {
  return (
    <section className="w-full bg-black px-[25px] py-8">
      <div className="grid gap-6 md:grid-cols-4 md:gap-8">
        <h2 className="text-xl md:col-span-1">@moontotemsnft</h2>

        <div className="flex flex-col gap-10 md:col-span-3">
          <p className="max-w-xl text-[23px] font-light leading-[34px] md:text-[27px] md:leading-[35px]">
            Moon Totems are beautiful crypto talismans from the moon and discovered on the Ethereum
            blockchain.
          </p>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {socialChannels.map((channel) => (
              <a
                className="border-l border-[#888] pl-[15px] hover:opacity-80"
                href={channel.href}
                key={channel.name}
                rel="noreferrer"
                target="_blank"
              >
                <h3 className="text-[22px] font-normal">{channel.name}</h3>
                <p className="my-6 text-base leading-7">{channel.text}</p>
                <img alt="" className="h-10 w-auto" src={channel.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
