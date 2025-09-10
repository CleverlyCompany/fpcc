import styles from './styles.module.css'
import { ContentBlock } from '../Content/Component'

export const SubheadBlock = ({ columns }) => {
  return <div className={styles.wrapper}>{columns && <ContentBlock columns={columns} />}</div>
}
