import type { Block, Field } from 'payload'
import { link } from '@/fields/link'
import { RichTextFeatures } from '../RichTextFeatures'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const richTextFields = (name = 'richText', label: false | string = false): Field[] => {
  return [{
    name,
    type: 'richText',
    label,
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        ...RichTextFeatures,
      ],
    }),
  }]
}


export const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Fourth',
        value: 'oneFourth',
      },
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Two Fifths',
        value: 'twoFifths',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Three Fifths',
        value: 'threeFifths',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'borderToggle',
        label: 'Column Border?',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          width: '33%',
        }
      },
      {
        name: 'embedToggle',
        label: 'Video Embed?',
        type: 'checkbox',
        defaultValue: false,
        admin: {
          width: '33%',
        }
      },
    ]
  },
  {
    name: 'border',
    type: 'select',
    admin: {
      condition: (_data, siblingData) => {
        return Boolean(siblingData?.borderToggle)
      },
    },
    options: [
      {
        label: 'Right',
        value: 'right',
      },
      {
        label: 'Left',
        value: 'left',
      }
    ]
  },
  {
    name: 'embed',
    type: 'code',
    admin: {
      condition: (_data, siblingData) => {
        return Boolean(siblingData?.embedToggle)
      },
      editorOptions: {
        formatOnPaste: true,
        formatOnType: true,
      },
    },
    label: 'Embed Code',
  },
  ...richTextFields(),
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
  {
    name: 'bg',
    label: 'Background Image',
    relationTo: 'media',
    type: 'relationship',
  },
]

export const contentFields: Field[] = [
  {
    name: 'contSize',
    type: 'select',
    defaultValue: 'normal',
    options: [
      {
        label: 'Normal',
        value: 'normal',
      },
      {
        label: 'Large',
        value: 'large',
      },
    ],
  },
  {
    name: 'columns',
    type: 'array',
    admin: {
      initCollapsed: true,
    },
    fields: columnFields,
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    ...contentFields,
  ],
}
