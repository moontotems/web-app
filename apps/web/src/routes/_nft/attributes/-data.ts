export type AttributeCard = {
  image: string
  title: string
  text: string
  /** Tailwind classes positioning the card over the hero image on desktop. */
  position: string
}

export const ATTRIBUTE_CARDS: AttributeCard[] = [
  {
    image: '/attributes/moon_totems_attributes_eyes.jpg',
    title: 'Eyes',
    text: 'Eyes are the window to the soul. Moon Totems eyes have different shapes. In rare cases Moon Totems can have asymmetrical or even multicolor eyes.',
    position: 'md:bottom-[500px] md:left-0',
  },
  {
    image: '/attributes/moon_totems_attributes_complexity.jpg',
    title: 'Complexity',
    text: 'Each Moon Totem is a One-of-a-Kind.',
    position: 'md:bottom-[500px] md:right-0',
  },
  {
    image: '/attributes/moon_totems_attributes_child_moons.jpeg',
    title: 'Child Moon',
    text: 'Each Totem has a small child Totem.',
    position: 'md:-bottom-[10px] md:left-0',
  },
  {
    image: '/attributes/moon_totems_attributes_materiality.jpg',
    title: 'Texture',
    text: 'Totems have different textures. Some are smooth, some have embossed or perforated patterns.',
    position: 'md:-bottom-[10px] md:right-0',
  },
]
