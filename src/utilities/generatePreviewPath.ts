import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`
  return url
}


export const normalizePath = (p: string) => {
  let out = (p || '').trim()
  if (!out.startsWith('/')) out = `/${out}`
  // collapse // -> /
  out = out.replace(/\/{2,}/g, '/')
  return out
}

export const testPreviewPath = (data: any) => {
  const path = data?.breadcrumbs?.slice(-1)?.[0]?.url || data?.slug
  const SITE_ORIGIN =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // 3) Use the WHATWG URL API so you can’t mess up slashes, ports, etc.
  const url = new URL(path, SITE_ORIGIN)

  // 4) Optional: add search params (locale, preview flags, tokens…)
  // url.searchParams.set('preview', 'true')

  return url.toString() // -> e.g. 'http://localhost:3000/parentPage/childPage?locale=en'
}