import styles from './styles.module.css'

export const VideoEmbedBlock = (props) => {
  const { embed } = props

  if (!embed) {
    return null
  }

  return <div dangerouslySetInnerHTML={{ __html: embed }} className={styles.embedWrapper} />
}
