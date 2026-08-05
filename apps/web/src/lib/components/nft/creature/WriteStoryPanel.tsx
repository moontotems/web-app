import { Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useStory } from '~/lib/nft/use-story'

import { FeaturePanel } from './FeaturePanel'

/** TOTEM STORY panel (legacy creatureFeatures/WriteStory). */
export function WriteStoryPanel({ tokenId }: { tokenId: number }) {
  const { story, saveStory } = useStory(tokenId)
  const [draft, setDraft] = useState(story)

  useEffect(() => {
    setDraft(story)
  }, [story])

  return (
    <FeaturePanel icon={<Pencil className="size-4" />} title="TOTEM STORY">
      <div className="w-full pr-5">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Write the story..."
          className="min-h-[200px] w-full rounded-[0.8rem] border border-[#1062FE] bg-transparent p-3 text-lg leading-7 tracking-[0.16px] text-white outline-none"
        />
        <div className="mt-1 flex items-center justify-between">
          <button
            type="button"
            className="cursor-pointer bg-[#1062FE] px-4 py-1.5 text-base text-white hover:brightness-110"
            onClick={() => {
              saveStory(draft)
              toast.info('Saved')
            }}
          >
            Save
          </button>
          <span className="text-sm text-white/50">{draft.length} characters</span>
        </div>
      </div>
    </FeaturePanel>
  )
}
