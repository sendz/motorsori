"use client"
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "./button"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { Label } from "./label"
import { v4 as uuid } from "uuid"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const _type = type === "password" ? showPassword ? "text" : "password" : type
    const _className = "w-full text-sm sm:text-base py-2 sm:py-3 pr-10"
    const _id = id || uuid()

    return (
      <>
        {label && (
          <Label htmlFor={_id} className="text-sm sm:text-base">{label}</Label>
        )}
        <div className="relative">
          <input
            type={_type}
            id={_id}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              _className,
              className
            )}
            ref={ref}
            {...props}
          />
          {type === "password" && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <EyeIcon className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          )}
        </div>
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
