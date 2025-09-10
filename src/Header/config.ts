import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'subItems',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'radio',
              defaultValue: 'simple',
              options: [
                {
                  label: 'Simple Link',
                  value: 'simple',
                },
                {
                  label: 'Link Group',
                  value: 'group',
                },
              ],
            },
            {
              name: 'simpleLink',
              type: 'group',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'simple',
              },
              fields: [
                link({ appearances: false }),
              ],
            },
            {
              name: 'linkGroup',
              type: 'group',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'group',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'links',
                  type: 'array',
                  fields: [
                    link({ appearances: false }),
                  ],
                  maxRows: 8,
                },
              ],
            },
          ],
          maxRows: 6,
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
