'use client'
import React from 'react'

import type { Page } from '@/payload-types'
import styles from './styles.module.css'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundImage:
          media && typeof media === 'object'
            ? `linear-gradient(to bottom, #00000000 20%, var(--black) 100%), url(${media.url})`
            : '',
      }}
    >
      <div className={`${styles.container} fpcc-cont`}>
        <div className={styles.contentWrapper}>
          {richText && <RichText data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className={styles.links}>
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} className="btn btn-white icon-btn" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="border-bar" />
    </div>
  )
}
