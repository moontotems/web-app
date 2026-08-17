import { ASSETS } from '~/lib/constants'

export type AttributeCard = {
  image: string
  title: string
  text: string
  // Tailwind classes for corner placement on the hero.
  position: string
}

export const ATTRIBUTE_CARDS: AttributeCard[] = [
  {
    image: ASSETS.attributes.eyes,
    title: 'Eyes',
    text: 'Eyes are the window to the soul. Moon Totems eyes have different shapes. In rare cases Moon Totems can have asymmetrical or even multicolor eyes.',
    position: 'md:top-0 md:left-0',
  },
  {
    image: ASSETS.attributes.complexity,
    title: 'Complexity',
    text: 'Each Moon Totem is a One-of-a-Kind.',
    position: 'md:top-0 md:right-0',
  },
  {
    image: ASSETS.attributes.childMoons,
    title: 'Child Moon',
    text: 'Each Totem has a small child Totem.',
    position: 'md:bottom-0 md:left-0',
  },
  {
    image: ASSETS.attributes.materiality,
    title: 'Texture',
    text: 'Totems have different textures. Some are smooth, some have embossed or perforated patterns.',
    position: 'md:bottom-0 md:right-0',
  },
]
