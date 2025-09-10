import type { Block } from 'payload'
import { columnFields } from '../Content/config'

export const SubheadBlock: Block = {
    slug: 'subhead',
    interfaceName: 'SubheadBlock',
    labels: {
        plural: 'Subhead Blocks',
        singular: 'Subhead Block',
    },
    fields: [
        {
            type: 'array',
            name: 'columns',
            label: 'Columns',
            admin: {
                initCollapsed: true,
            },
            fields: [
                ...columnFields,
            ]
        }
    ]

}