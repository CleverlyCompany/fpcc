import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import styles from './footer.module.css'
import { CMSLink } from '@/components/Link'
import { Facebook, Youtube } from 'lucide-react'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className={styles.footer}>
      <Link className={styles.logoContainer} href="/">
        <Logo size={138} />
      </Link>
      <div className={styles.footerInner}>
        <h4>
          Fully accredited Fort Peck Community College is a safe, healthy and welcoming leader for
          all to achieve academic, career and cultural goals.
        </h4>
        <nav className={styles.footerNav}>
          {navItems.map((linkItem, linkIndex) => (
            <CMSLink key={linkItem.id || linkIndex} {...linkItem.link} appearance="link" />
          ))}
        </nav>
        <p>
          © 2025 Fort Peck Community College
          <br />
          PO Box 398 Poplar, MT 59255
          <br />
          <a href="tel:4067686300" target="_blank">
            (406) 768-6300
          </a>
        </p>
      </div>
      <div className={styles.footerSocials}>
        <Link href="/TEST" className={styles.fbLink}>
          <Facebook size={24} color="var(--white)" />
        </Link>
        <Link href="/TEST">
          <Youtube size={36} color="var(--white)" />
        </Link>
      </div>
    </footer>
  )
}
