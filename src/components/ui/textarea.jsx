import * as React from 'react'
import { cn } from '../../lib/utils.js'

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground dark:bg-input/30 flex field-sizing-content min-h-24 w-full rounded-lg border bg-card px-3.5 py-3 text-sm shadow-xs transition-[color,box-shadow,border-color] outline-none',
        'focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/25 aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
