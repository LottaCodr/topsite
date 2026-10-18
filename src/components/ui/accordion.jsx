import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { PlusIcon } from 'lucide-react'
import { cn } from '../../lib/utils.js'

function Accordion(props) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-border border-b last:border-b-0', className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-lg py-5 text-left font-display text-base font-bold transition-all outline-none hover:text-gold focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 sm:text-lg cursor-pointer [&[data-state=open]>svg]:rotate-45 [&[data-state=open]>svg]:text-gold',
          className
        )}
        {...props}
      >
        {children}
        <PlusIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-5 text-muted-foreground leading-relaxed', className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
