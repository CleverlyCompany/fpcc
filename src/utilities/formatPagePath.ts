export const formatPagePath = (
    collection: string,
    doc: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    category?: string,
): string => {
    const { slug, breadcrumbs } = doc
    const nestedSlug = breadcrumbs?.slice(-1)?.[0]?.url
    return `${nestedSlug ?? slug}`
}