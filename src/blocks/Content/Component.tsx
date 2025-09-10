import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { VideoEmbedBlock } from '@/blocks/VideoEmbed/Component'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import styles from './styles.module.css'
import { Media } from '@/components/Media'

export const ContentBlock: React.FC<ContentBlockProps> = async (props) => {
  const { columns, contSize } = props
  const colsSpanClasses = {
    full: 'md:col-span-12',
    half: 'md:col-span-6',
    oneThird: 'md:col-span-4',
    twoThirds: 'md:col-span-8',
    twoFifths: 'md:col-span-5',
    threeFifths: 'md:col-span-7',
  }

  return (
    <div className={contSize === 'large' ? 'fpcc-cont-xl' : 'fpcc-cont'}>
      <div className="grid grid-cols-12 gap-y-8 -mx-8">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const {
              enableLink,
              link,
              richText,
              size,
              borderToggle,
              border,
              bg,
              embedToggle,
              embed,
            } = col

            return (
              <div
                className={cn(
                  'relative flex-col px-8 col-span-12 video-col',
                  colsSpanClasses[size!],
                  {
                    'md:border-r-[2px] border-r-[var(--border-gray)]':
                      borderToggle && border === 'right',
                    'md:border-l-[2px] border-l-[var(--border-gray)]':
                      borderToggle && border === 'left',
                    'bg-column-bg py-8': bg && typeof bg === 'object',
                  },
                )}
                key={index}
              >
                {embedToggle && embed && <VideoEmbedBlock embed={embed} />}
                {bg && typeof bg === 'object' && (
                  <Media resource={bg} fill imgClassName={styles.bg} />
                )}
                {richText && (
                  <RichText data={richText} enableGutter={false} className={styles.richText} />
                )}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
