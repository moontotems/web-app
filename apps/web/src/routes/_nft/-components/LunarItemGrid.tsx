import { MobileItemSlider } from './MobileItemSlider'

export type LunarItem = {
  image: string
  title: string
  subtitle?: string
  description?: string
  symbol?: string
}

function LunarItemCard({ item }: { item: LunarItem }) {
  return (
    <div>
      <img alt={item.title} className="w-full" src={item.image} />
      <div className="mt-6 border-l border-[#393939] pl-[15px]">
        <div className="text-[19px] font-bold">{item.title}</div>
        {item.subtitle && <div className="mt-1 italic">{item.subtitle}</div>}
        {item.description && (
          <div className="mt-5 text-[17px] leading-[28px]">{item.description}</div>
        )}
        {item.symbol && item.symbol !== item.image && (
          <img alt={`${item.title} symbol`} className="mt-6 w-1/5" src={item.symbol} />
        )}
      </div>
    </div>
  )
}

/** Title + intro + card grid used by lunar phases, months, and project overview. */
export function LunarItemGrid({
  title,
  intro,
  items,
}: {
  title: string
  intro?: string
  items: readonly LunarItem[]
}) {
  return (
    <section className="w-full bg-black pb-12">
      <h2 className="p-[25px] text-xl">{title}</h2>
      {intro && (
        <p className="mb-10 max-w-xl px-[25px] text-[23px] font-light md:text-[27px]">{intro}</p>
      )}

      <div className="md:hidden">
        <MobileItemSlider
          getKey={(item) => item.title}
          items={items}
          renderItem={(item) => (
            <div className="px-[25px]">
              <LunarItemCard item={item} />
            </div>
          )}
        />
      </div>

      <div className="hidden gap-x-8 gap-y-12 px-[25px] md:grid md:grid-cols-4 md:px-[10%]">
        {items.map((item) => (
          <LunarItemCard item={item} key={item.title} />
        ))}
      </div>
    </section>
  )
}
