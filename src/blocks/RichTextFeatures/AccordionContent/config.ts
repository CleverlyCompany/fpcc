import { link } from "@/fields/link";
import type { Block } from "payload";

export const AccordionContent: Block = {
    slug: 'accordionContent',
    interfaceName: 'AccordionContentBlock',
    fields: [
        {
            name: 'accordionItems',
            type: 'array',
            label: 'Accordion Items',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    label: 'Title',
                },
                {
                    name: 'content',
                    type: 'textarea',
                    label: 'Content',
                },
                {
                    name: 'links',
                    type: 'array',
                    label: 'Links',
                    fields: [
                        link(),
                    ],
                }
            ]
        }
    ],
}