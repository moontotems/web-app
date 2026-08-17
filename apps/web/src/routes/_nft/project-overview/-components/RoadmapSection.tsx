import { roadmapItems } from '../-data'
import { SectionHeading } from './SectionHeading'

// Six-step roadmap grid.
export const RoadmapSection = () => {
  return (
    <section className="w-full bg-black pb-12">
      <SectionHeading>Roadmap</SectionHeading>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 px-[25px] sm:grid-cols-2 md:grid-cols-3 md:px-[10%]">
        {roadmapItems.map(({ index, image, title, text }) => (
          <div key={`roadmap-${index}`}>
            <img alt={title} className="block w-full md:w-1/2" src={image} />
            <div className="mt-[30px] mb-5 text-[19px] font-bold">{title}</div>
            <div className="text-[17px] leading-[28px]">{text}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
