import type { Block } from 'payload'
import { columnFields, richTextFields } from '../Content/config'

export const Section: Block = {
    slug: 'section',
    interfaceName: 'SectionBlock',
    fields: [
        {
            name: 'headerImg',
            label: 'Header Image',
            type: 'relationship',
            relationTo: 'media',
        },
        ...richTextFields('headingContent', 'Heading Content'),
        {
            name: 'columns',
            type: 'array',
            admin: {
                initCollapsed: true,
            },
            fields: columnFields,
        },
    ],
}