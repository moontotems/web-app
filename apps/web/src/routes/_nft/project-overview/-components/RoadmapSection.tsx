import { roadmapItems } from '../-data'

/** Six-step roadmap grid (legacy Roadmap section). */
export function RoadmapSection() {
  return (
    <section className="w-full overflow-hidden bg-black">
      <div className="p-[25px] text-xl">Roadmap</div>
      <div className="grid grid-cols-1 gap-y-[5%] px-[10%] sm:grid-cols-2 md:grid-cols-3">
        {roadmapItems.map(({ index, image, title, text }) => (
          <div className="mb-[5%] px-[5%]" key={`roadmap-${index}`}>
            <img alt={title} className="mx-auto block w-full" src={image} />
            <div className="mt-[30px] mb-5 text-[19px] font-bold">{title}</div>
            <div className="text-[17px] leading-[28px]">{text}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
