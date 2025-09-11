import type { Block } from 'payload'
import { contentFields } from '../Content/config'

export const ContentBackground: Block = {
    slug: 'contentBackground',
    interfaceName: 'ContentBackgroundBlock',
    labels: {
        singular: 'Content + Background',
        plural: 'Content Backgrounds',
    },
    fields: [
        {
            type: 'relationship',
            name: 'background',
            relationTo: 'media',
            label: 'Background Image'
        },
        ...contentFields,
    ],
}