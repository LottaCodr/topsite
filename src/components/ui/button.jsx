import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils.js'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-syne text-sm font-bold tracking-wide transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 cursor-pointer active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-b from-gold-lt to-gold text-[#0E0C08] border border-white/20 shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_8px_24px_-8px_rgba(184,146,74,0.55)] hover:from-gold-bright hover:to-gold hover:shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_12px_28px_-8px_rgba(184,146,74,0.75)]',
        secondary:
          'bg-secondary text-secondary-foreground border border-border hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/40',
        outline:
          'border border-border bg-card text-foreground shadow-xs hover:border-gold/60 hover:bg-accent hover:text-accent-foreground',
        ghost:
          'text-foreground hover:bg-accent hover:text-accent-foreground',
        link:
          'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-5 py-2 has-[>svg]:px-4 min-h-[44px]',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs min-h-[36px]',
        lg: 'h-12 rounded-xl px-7 has-[>svg]:px-6 text-[0.95rem] min-h-[48px]',
        icon: 'size-10 min-h-[44px] min-w-[44px]',
        'icon-sm': 'size-8 rounded-md min-h-[36px] min-w-[36px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
