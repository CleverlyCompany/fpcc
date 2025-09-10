import type { Block } from 'payload'
import { link } from '@/fields/link'

export const LinkRow: Block = {
    slug: 'linkRow',
    interfaceName: 'LinkRow',
    fields: [
        {
            name: 'links',
            type: 'array',
            fields: [
                link(),
            ]
        }
    ]
}