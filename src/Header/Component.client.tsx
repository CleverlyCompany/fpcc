'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { MenuIcon, SquarePen } from 'lucide-react'
import styles from './header.module.css'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [navState, setNavState] = useState<boolean>(false)

  return (
    <header className={styles.headerWrapper}>
      <button className={styles.headerBtn} onClick={() => setNavState(!navState)}>
        <MenuIcon size={16} />
        Menu
      </button>
      <HeaderNav data={data} toggleNav={navState} />
      <div className={styles.headerContainer}>
        <span className={styles.headerTitle}>
          <Link href="/">
            <Logo loading="eager" priority="high" />
          </Link>
          <span>
            Fort Peck
            <br />
            <span className={styles.subTitle}>Community College</span>
          </span>
        </span>
        <Link href="/" className="btn btn-blue">
          <SquarePen size={16} color="#fff" />
          Enroll Now
        </Link>
      </div>
    </header>
  )
}
