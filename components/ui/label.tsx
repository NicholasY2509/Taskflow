import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  required?: boolean
  size?: 'sm' | 'default' | 'md' | 'lg'
}

const labelVariants = cva(
  "leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm font-medium",
        md: 'text-sm lg:text-md font-medium',
        lg: "text-md lg:text-lg font-bold",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Label({
  className,
  required,
  size,
  children,
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        labelVariants({ size }),
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-destructive"> *</span>}
    </LabelPrimitive.Root>
  )
}

export { Label }