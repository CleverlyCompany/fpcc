'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'
import styles from './nav.module.css'
import { ChevronRight, Heart, User } from 'lucide-react'
import Link from 'next/link'

import { CMSLink } from '@/components/Link'

// Extract the nav item type from the Header interface
type NavItem = NonNullable<HeaderType['navItems']>[number]
type SubItem = NonNullable<NavItem['subItems']>[number]

interface HeaderNavProps {
  data: HeaderType
  toggleNav: boolean
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, toggleNav }) => {
  const navItems = data?.navItems || []
  const [navState, setNavState] = useState<null | string>(null)

  const onNavItemClick = (item: NavItem, event: React.MouseEvent) => {
    event.stopPropagation()
    setNavState((prev) => (prev === item.id ? null : item.id || null))
  }

  const renderSubItem = (subItem: SubItem, subIndex: number) => {
    if (subItem.type === 'group' && subItem.linkGroup) {
      // Render link group with title and multiple links
      return (
        <div key={subItem.id || subIndex} className={styles.linkGroup}>
          <h4 className={styles.linkGroupTitle}>{subItem.linkGroup.title}</h4>
          <div className={styles.linkGroupLinks}>
            {subItem.linkGroup.links?.map((linkItem, linkIndex) => (
              <CMSLink key={linkItem.id || linkIndex} {...linkItem.link} appearance="link" />
            ))}
          </div>
        </div>
      )
    } else if (subItem.type === 'simple' && subItem.simpleLink) {
      // Render simple link (backward compatibility)
      return <CMSLink key={subItem.id || subIndex} {...subItem.simpleLink.link} appearance="link" />
    }

    // Fallback for items without proper type structure
    return null
  }

  const renderNavItem = (item: NavItem, index: number) => {
    const hasSubItems = item.subItems && item.subItems.length > 0

    if (hasSubItems) {
      // Render as button for items with sub-items
      return (
        <div key={item.id || index} className={styles.navItem}>
          <button className={styles.navButton} onClick={(e) => onNavItemClick(item, e)}>
            {item.link.label}
            <ChevronRight className={styles.navButtonIcon} />
          </button>
          {item.subItems && item.subItems.length > 0 && (
            <div className={`${styles.subMenu} ${navState === item.id ? styles.subMenuOpen : ''}`}>
              {item.subItems.map(renderSubItem)}
            </div>
          )}
        </div>
      )
    }

    // Render as regular link for items without sub-items
    return (
      <div key={item.id || index} className={styles.navItem}>
        <CMSLink {...item.link} appearance="link" />
      </div>
    )
  }

  return (
    <div className={`${styles.navWrapper} ${toggleNav ? styles.navWrapperOpen : ''}`}>
      <nav className={styles.nav}>
        <div>Search Form Placeholder</div>
        {navItems.map(renderNavItem)}
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>
            <Heart size={16} strokeWidth={3} color="#ED1C24aa" />
            Donate
          </Link>
          <Link href="/" className={styles.footerLink}>
            <User size={18} strokeWidth={3} color="var(--green)" />
            Staff Portal
          </Link>
        </div>
      </nav>
    </div>
  )
}
