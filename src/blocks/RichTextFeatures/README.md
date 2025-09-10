# RichText Blocks

This directory contains blocks that can be embedded within RichText content using the BlocksFeature.

## Structure

Each block should follow this structure:

```
BlockName/
├── Component.tsx    # React component for rendering
├── config.ts        # Payload block configuration
├── styles.module.css # Optional styling
└── README.md        # Optional documentation
```

## Adding a New RichText Block

1. Create a new directory with your block name
2. Add the block configuration to `config.ts`
3. Add the React component to `Component.tsx`
4. Export both from this directory's `index.ts`
5. Add the block to the `getContentRichTextFeatures()` function in `richTextFeatures.ts`
6. Add the block converter to `RichText/index.tsx`

## RichText Features

The `richTextFeatures.ts` file provides pre-configured feature sets:

- **`getContentRichTextFeatures()`**: Full feature set for Content blocks (includes blocks, colors, formatting)
- **`getBasicRichTextFeatures()`**: Basic features without blocks (good for simple rich text)
- **`getCustomRichTextFeatures(blocks)`**: Custom feature set with specific blocks

## Text Colors

Custom text colors are defined in `options.ts` using the `TextColorFeature`. Colors use CSS variables for theming consistency.

## Current Blocks

- **LinkRow**: Renders an array of links
- **Subcopy**: Renders styled subcopy text

## Usage

These blocks are automatically available in Content blocks that have rich text fields. Users can insert them using the rich text editor's block insertion feature.
