import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    SubscriptFeature,
    BlocksFeature,
    TextStateFeature,
    UnorderedListFeature,
    AlignFeature,
} from '@payloadcms/richtext-lexical'

import { LinkRow } from '../RichTextFeatures/LinkRow/config'
import { AccordionContent } from '../RichTextFeatures/AccordionContent/config'
import { InlineLink } from '../RichTextFeatures/InlineLink/config'
import { TriColorBorder } from './TriColorBorder/config'
import { VideoEmbed } from '../VideoEmbed/config'
import { RichTextColors } from './index.client'
import { RichTextSizes } from './index.client'
import { RichTextStyles } from './index.client'
import { DottedBorder } from './DottedBorder/config'


const blocks = [LinkRow, InlineLink, AccordionContent, VideoEmbed, DottedBorder, TriColorBorder]

export const RichTextFeatures = [
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
    SubscriptFeature(),
    UnorderedListFeature(),
    AlignFeature(),
    BlocksFeature({
        blocks,
    }),
    TextStateFeature({
        state: {
            color: {
                ...RichTextColors
            },
            size: {
                ...RichTextSizes
            },
            style: {
                ...RichTextStyles
            }
        }
    })
]