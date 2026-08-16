import { ASSETS } from '~/lib/constant'

/** Azure Blob CDN hosting all totem renders and website assets. */
export const CDN_BASE = ASSETS.cdn.base

export const HEADER_HEIGHT = 40
export const FOOTER_HEIGHT = 40
export const SIDEBAR_WIDTH = 250
/** Width of the header menu / “Show all” icon columns (and ActionSidebar narrow). */
export const HEADER_ICON_WIDTH = 50

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/moontotems',
  twitter: 'https://twitter.com/moontotemsnft',
  discord: 'https://discord.gg/73vMqt7k7H',
  github: 'https://github.com/moontotems',
  medium: 'https://medium.com/@moontotems',
  opensea: 'https://opensea.io/collection/moontotems',
  looksrare: 'https://looksrare.org/collections/0x8fE83f6f7f726A2C9E238B7E094c4Bf530bC9720',
  etherscan: 'https://etherscan.io/address/0x8fe83f6f7f726a2c9e238b7e094c4bf530bc9720',
} as const

export const CONTACT_EMAIL = 'moontotems@gmail.com'
