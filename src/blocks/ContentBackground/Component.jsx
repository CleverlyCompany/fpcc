import React from 'react'
import styles from './styles.module.css'
import { ContentBlock } from '../Content/Component'
import { Media } from '@/components/Media'

export const ContentBackgroundBlock = ({ background, columns }) => {
  return (
    <div className={styles.wrapper}>
      {background && <Media resource={background} fill imgClassName={styles.bg} />}
      {columns && <ContentBlock columns={columns} />}
    </div>
  )
}
