import { link } from "@/fields/link";
import type { Block } from "payload";

export const InlineLink: Block = {
    slug: 'inlineLink',
    interfaceName: 'InlineLinkBlock',
    fields: [
        link(),
    ],
}