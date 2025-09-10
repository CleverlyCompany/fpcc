import styles from './styles.module.css'
import { ContentBlock } from '../Content/Component'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const SectionBlock = ({ headerImg, headingContent, columns }) => {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        {headerImg && <Media resource={headerImg} fill imgClassName={styles.headerImg} />}
        <div className={`${styles.headerContent} fpcc-cont`}>
          {headingContent && <RichText data={headingContent} enableGutter={false} />}
        </div>
      </div>
      <ContentBlock columns={columns} />
    </div>
  )
}
