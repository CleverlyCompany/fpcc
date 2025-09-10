import React from 'react'
import Image from 'next/image'
import logo from '../../../public/imgs/Logo.png'
import styles from './logo.module.css'

interface Props {
  className?: string
  size?: number
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, size } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <Image
      alt="FPCC Logo"
      width={size || 74}
      height={size || 74}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={styles.logo}
      src={logo}
    />
  )
}
