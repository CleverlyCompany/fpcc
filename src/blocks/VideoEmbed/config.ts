import type { Block } from 'payload'
//A patch to allow for transfer to the Column Video Embed field
export const VideoEmbed: Block = {
    slug: 'videoEmbed',
    fields: [
        {
            name: 'embed',
            type: 'code',
            label: 'Embed Code',
        }
    ]
}