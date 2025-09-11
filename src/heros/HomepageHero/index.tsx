import React from 'react'

import type { Page } from '@/payload-types'

import styles from './styles.module.css'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const HomepageHero: React.FC<Page['hero']> = ({ imgEmbed, media, richText }) => {
  return (
    <div className={styles.wrapper}>
      {media && typeof media === 'object' && (
        <Media resource={media} fill imgClassName={styles.media} />
      )}
      <div className={`${styles.container} fpcc-cont`}>
        <div className={styles.contentWrapper}>
          {imgEmbed && (
            <div className={styles.imgWrapper}>
              <Media resource={imgEmbed} fill imgClassName={styles.img} />
            </div>
          )}
          {richText && <RichText data={richText} enableGutter={false} />}
        </div>
      </div>
    </div>
  )
}
