import type { Block } from 'payload'
import { link } from '@/fields/link'
import { richTextFields } from '../Content/config'

export const Banner: Block = {
  slug: 'banner',
  fields: [
    ...richTextFields('content', 'Content'),
    link()
  ],
  interfaceName: 'BannerBlock',
}