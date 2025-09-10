import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva('btn richText-btn richText-iconBtn', {
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
  variants: {
    size: {
      clear: '',
      default: '',
      icon: '',
      lg: '',
      sm: '',
    },
    variant: {
      default: 'btn-richText-white',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      ghost: 'hover:bg-card hover:text-accent-foreground',
      link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
      outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
      gray: 'btn-richText-gray',
      redIcon: 'btn-richText-red',
      blueIcon: 'btn-richText-blue',
      greenIcon: 'btn-richText-green',
      darkBlueIcon: 'btn-richText-darkBlue',
    },
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
}

export { Button, buttonVariants }
