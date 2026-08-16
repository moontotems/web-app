import type { FeatureSectionData } from '../-data'

function FeatureMedia({ section }: { section: FeatureSectionData }) {
  if (section.video) {
    return (
      <div className="relative w-full pt-[100%]">
        <iframe
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="pointer-events-none absolute top-0 left-0 h-full w-full border-0"
          src={section.video}
          title={section.title}
        />
      </div>
    )
  }

  if (section.image) {
    return (
      <img
        alt={section.title}
        className="mx-auto block w-full"
        loading="lazy"
        src={section.image}
      />
    )
  }

  return <div className="aspect-square w-full bg-black" />
}

/** Full-viewport split section: media + copy (project-overview style, no carousel). */
export function FeatureSection({
  section,
  mediaSide,
}: {
  section: FeatureSectionData
  mediaSide: 'left' | 'right'
}) {
  const media = (
    <div className="w-full">
      <FeatureMedia section={section} />
    </div>
  )

  const copy = (
    <div className="flex h-full flex-col justify-center p-[5%] md:min-h-screen">
      {section.icon ? (
        <img alt="" className="mb-6 h-10 w-10" loading="lazy" src={section.icon} />
      ) : null}
      <div className="text-[32px] pb-[5%] font-light leading-[40px] md:text-[55px] md:leading-[60px]">{section.title}</div>
      <div className="w-full text-[23px] font-light leading-[34px] md:text-[27px] md:leading-[35px]">
        {section.text}
      </div>
    </div>
  )

  return (
    <section className="w-full overflow-hidden bg-black md:min-h-screen">
      <div className="flex flex-col md:flex-row">
        {mediaSide === 'left' ? (
          <>
            <div className="w-full md:w-1/2">{media}</div>
            <div className="w-full md:w-1/2">{copy}</div>
          </>
        ) : (
          <>
            <div className="order-2 w-full md:order-1 md:w-1/2">{copy}</div>
            <div className="order-1 w-full md:order-2 md:w-1/2">{media}</div>
          </>
        )}
      </div>
    </section>
  )
}
