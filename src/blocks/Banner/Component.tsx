import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import styles from './styles.module.css'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

type Props = {
  className?: string
  content: DefaultTypedEditorState
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, link }) => {
  return (
    <div className={cn('w-full banner-wrapper', className)}>
      <div className={styles.contentWrapper}>
        <RichText
          data={content}
          enableGutter={false}
          enableProse={false}
          className={styles.richText}
        />
        {link && <CMSLink {...link} />}
      </div>
    </div>
  )
}
