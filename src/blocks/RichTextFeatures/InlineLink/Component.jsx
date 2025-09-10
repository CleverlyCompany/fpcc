import { CMSLink } from '@/components/Link'

export const InlineLinkBlock = (props) => {
  const { link } = props

  if (!link) {
    console.warn('InlineLinkBlock: No link data provided')
    return null
  }

  // Map the link data to the format expected by CMSLink
  const linkProps = {
    type: link.type,
    reference: link.reference,
    url: link.url,
    label: link.label,
    newTab: link.newTab,
    appearance: link.appearance || 'inline',
  }

  return <CMSLink {...linkProps} />
}
