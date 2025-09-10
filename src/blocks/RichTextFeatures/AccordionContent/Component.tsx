'use client'
import { CMSLink } from '@/components/Link'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import styles from './styles.module.css'

interface AccordionItem {
  id?: string
  title?: string
  content?: string
  links?: Array<{
    link?: {
      type?: 'custom' | 'reference' | null
      appearance?:
        | 'inline'
        | 'default'
        | 'destructive'
        | 'ghost'
        | 'outline'
        | 'gray'
        | 'redIcon'
        | 'blueIcon'
        | 'greenIcon'
        | 'darkBlueIcon'
        | null
      label?: string | null
      newTab?: boolean | null
      reference?: {
        relationTo: 'pages' | 'posts'
        value: string | number
      } | null
      url?: string | null
      size?: 'default' | 'sm' | 'lg' | 'icon' | null
      children?: React.ReactNode
      className?: string
      [key: string]: unknown
    }
    [key: string]: unknown
  }>
  [key: string]: unknown
}

interface AccordionContentBlockProps {
  accordionItems?: AccordionItem[]
}

export const AccordionContentBlock = ({ accordionItems }: AccordionContentBlockProps) => {
  return (
    <div className={styles.wrapper}>
      {accordionItems &&
        accordionItems.length > 0 &&
        accordionItems.map((item, index) => <AccordionItem key={index} item={item} />)}
    </div>
  )
}

const AccordionItem = ({ item }: { item: AccordionItem }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { links, content, title } = item
  return (
    <div className={styles.item}>
      <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span className={styles.icon}>
          {isOpen ? <Minus color="var(--gray)" /> : <Plus color="var(--gray)" />}
        </span>
      </button>
      <div className={`${styles.content} ${isOpen ? styles.active : ''}`}>
        {content && <p>{content}</p>}
        {links && links.length > 0 && (
          <div className={styles.linkWrapper}>
            {links.map((linkItem, index) => (
              <CMSLink key={index} {...linkItem.link} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
