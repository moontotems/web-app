import { MOONS, type Moon } from '../-data'

function MoonCard({ moon }: { moon: Moon }) {
  return (
    <div>
      <img alt={moon.name} className="mb-5 w-full" loading="lazy" src={moon.image} />
      <div className="border-l border-[#393939] pl-5">
        <div className="mb-[5px] text-[25px]">{moon.name}</div>
        <div className="mb-5 italic">{moon.nameLatin}</div>
        <img alt={`${moon.name} symbol`} className="mt-10 w-1/5" loading="lazy" src={moon.symbol} />
      </div>
    </div>
  )
}

/** Name, Latin name, photo, and symbol grid used on Lunar Origins and project overview. */
export function LunarOriginsGrid() {
  return (
    <section className="w-full bg-black pb-12">
      <h2 className="p-[25px] text-xl">Lunar Origins</h2>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 px-[25px] sm:grid-cols-2 md:grid-cols-3 md:px-[10%]">
        {MOONS.map((moon) => (
          <MoonCard key={moon.name} moon={moon} />
        ))}
      </div>
    </section>
  )
}
