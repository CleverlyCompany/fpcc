import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return pages.docs?.filter((doc) => doc.slug !== 'home').map(({ slug }) => ({ path: [slug] }))
}

type Args = {
  params: Promise<{ path?: string[] }>
  searchParams: Promise<{ lp?: string; id?: string }>
}

export default async function Page({ params: paramsPromise, searchParams: spPromise }: Args) {
  const { isEnabled: draft } = await draftMode() // cookie preview
  const { path } = await paramsPromise
  const sp = (await spPromise) || {}
  const isLP = sp.lp === '1'
  const byId = sp.id

  // Derive slug only if we don't have an explicit id
  const slug = byId ? undefined : path?.length ? path[path.length - 1] : 'home'

  // Fetch page:
  const page = byId
    ? await queryPageById({ id: String(byId) }) // LP path-agnostic fetch
    : await queryPageBySlug({ slug: String(slug), forceDraft: false }) // normal flow; draft comes from cookie below

  // If cookie preview is enabled, refetch by slug as draft (keeps your old behavior)
  const pageForRender =
    draft && !isLP && slug ? await queryPageBySlug({ slug: String(slug), forceDraft: true }) : page

  if (!pageForRender) {
    return <PayloadRedirects url="/404" />
  }

  const fullSlug = '/' + (path?.join('/') ?? '')
  const nestedSlug = pageForRender?.breadcrumbs?.slice(-1)?.[0]?.url || null

  // Collapse /home -> / ONLY when not in LP (LP should never redirect)
  if (!isLP && slug === 'home' && (path?.length ?? 0) > 0) {
    return <PayloadRedirects url="/" />
  }

  // Canonicalization ONLY when not in cookie preview AND not in LP
  if (!draft && !isLP) {
    // ← AND, not OR
    if (pageForRender?.breadcrumbs && pageForRender.breadcrumbs.length > 1) {
      if (nestedSlug && fullSlug !== nestedSlug) {
        return <PayloadRedirects url={nestedSlug} />
      }
    } else if (path && path.length > 1) {
      return <PayloadRedirects url="/404" />
    }
  }

  const { hero, layout } = pageForRender

  return (
    <main>
      <article>
        {/* only on normal, non-preview visits */}
        {!draft && !isLP && <PayloadRedirects disableNotFound url={fullSlug} />}

        {/* show listener in either preview mode */}
        {(draft || isLP) && <LivePreviewListener />}

        <RenderHero {...hero} />
        <RenderBlocks blocks={layout} />
      </article>
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { path } = await paramsPromise
  const slug = path?.length ? path[path.length - 1] : 'home'
  const page = await queryPageBySlug({ slug, forceDraft: false })
  return generateMeta({ doc: page })
}

// --- Draft-aware queries ---

const queryPageBySlug = cache(
  async ({ slug, forceDraft = false }: { slug: string; forceDraft?: boolean }) => {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft: forceDraft,
      overrideAccess: forceDraft,
      limit: 1,
      pagination: false,
      where: { slug: { equals: slug } },
    })
    return result.docs?.[0] || null
  },
)

const queryPageById = cache(async ({ id }: { id: string }) => {
  const payload = await getPayload({ config: configPromise })
  // LP should always read drafts by id
  const doc = await payload.findByID({
    collection: 'pages',
    id,
    draft: true,
    overrideAccess: true,
  })
  return doc ?? null
})
