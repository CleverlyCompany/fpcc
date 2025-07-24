import { formatPagePath } from './formatPagePath'

export const formatPreviewURL = (
    collection: string,
    doc: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    category?: string,
): string => {
    return `/${collection}/api/preview?url=${formatPagePath(
        collection,
        doc,
        category,
    )}&secret=${process.env.PREVIEW_SECRET}`
}