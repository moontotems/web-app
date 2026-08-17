import { useState } from 'react'
import { AssetCard } from './-components/AssetCard'
import { AssetLightbox } from './-components/AssetLightbox'
import { PROJECT_ASSET_GROUPS, PROJECT_ASSETS } from './-components/PROJECT_ASSETS'

// Catalog board of every file under public/project-assets (CDN-backed).
export const ProjectAssets = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeAsset = activeIndex === null ? null : PROJECT_ASSETS[activeIndex]

  return (
    <section className="w-full bg-black pb-16 text-white">
      <h2 className="p-[25px] text-xl">Project Assets</h2>

      {PROJECT_ASSET_GROUPS.map((group) => (
        <div className="mb-12" key={group.id}>
          <h3 className="px-[25px] pb-4 text-lg font-light tracking-[0.16px] text-white/80">
            {group.title}
            <span className="ml-2 text-sm text-white/40">({group.assets.length})</span>
          </h3>
          <div className="grid grid-cols-2 gap-4 px-[25px] md:grid-cols-3 lg:grid-cols-4 md:px-[10%]">
            {group.assets.map((asset) => (
              <AssetCard
                asset={asset}
                key={asset.path}
                onOpen={(next) => {
                  const index = PROJECT_ASSETS.findIndex((item) => item.path === next.path)
                  if (index >= 0) setActiveIndex(index)
                }}
              />
            ))}
          </div>
        </div>
      ))}

      {activeAsset && activeIndex !== null ? (
        <AssetLightbox
          asset={activeAsset}
          index={activeIndex}
          key={activeAsset.path}
          onClose={() => setActiveIndex(null)}
          onNext={() => setActiveIndex((i) => (i === null ? i : (i + 1) % PROJECT_ASSETS.length))}
          onPrev={() =>
            setActiveIndex((i) =>
              i === null ? i : (i - 1 + PROJECT_ASSETS.length) % PROJECT_ASSETS.length,
            )
          }
          total={PROJECT_ASSETS.length}
        />
      ) : null}
    </section>
  )
}
