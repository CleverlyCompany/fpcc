'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'
import type { LinkRow as LinkRowType } from '@/payload-types'
import styles from './styles.module.css'

interface LinkRowBlockProps {
  links?: LinkRowType['links']
}

export const LinkRowBlock = ({ links }: LinkRowBlockProps) => {
  if (!links || links.length === 0) {
    return null
  }

  return (
    <div className={styles.linkRow}>
      {links.map((link, index) => (
        <CMSLink key={index} {...link.link} />
      ))}
    </div>
  )
}
