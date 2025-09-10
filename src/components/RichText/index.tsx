import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { LinkRowBlock } from '@/blocks/RichTextFeatures/LinkRow/Component'
import { AccordionContentBlock } from '@/blocks/RichTextFeatures/AccordionContent/Component'
import { InlineLinkBlock } from '@/blocks/RichTextFeatures/InlineLink/Component'

import {
  RichTextColors as colorMap,
  RichTextSizes as sizeMap,
  RichTextStyles as styleMap,
} from '@/blocks/RichTextFeatures/index.client'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  LinkRow as LinkRowProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | LinkRowProps
    >

// Generic block node type for RichText blocks
type BlockNode = {
  fields: Record<string, unknown>
  [key: string]: unknown
}

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  text: ({ node }) => {
    const state = (node as { $?: { color?: string; size?: string; style?: string } })?.$ as
      | { color?: string; size?: string; style?: string }
      | undefined
    const style: React.CSSProperties = {}

    if (state?.color) {
      style.color = colorMap[state.color as keyof typeof colorMap]?.css.color ?? state.color
    }
    if (state?.size) {
      style.fontSize = sizeMap[state.size as keyof typeof sizeMap]?.css['font-size'] ?? state.size
    }
    if (state?.style) {
      const styleConfig = styleMap[state.style as keyof typeof styleMap]?.css
      if (styleConfig) {
        Object.assign(style, styleConfig)
      }
    }

    if (node.format === 1) {
      style.fontWeight = 'bold'
    }

    if (Object.keys(style).length > 0) {
      return <span style={style}>{node.text}</span>
    }

    return node.text
  },
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    linkRow: ({ node }) => <LinkRowBlock {...node.fields} />,
    inlineLink: ({ node }: { node: BlockNode }) => <InlineLinkBlock {...node.fields} />,
    accordionContent: ({ node }: { node: BlockNode }) => <AccordionContentBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
