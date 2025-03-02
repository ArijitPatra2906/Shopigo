'use client'

import { toast as sonnerToast } from 'sonner'
import * as React from 'react'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 4000 // Default Sonner duration

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ToastOptions = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  duration?: number
  variant?: 'default' | 'destructive'
}

const listeners: Array<(state: string[]) => void> = []
let memoryState: string[] = []

function dispatch(toasts: string[]) {
  memoryState = toasts
  listeners.forEach((listener) => listener(memoryState))
}

function toast({
  title,
  description,
  action,
  duration,
  variant,
}: ToastOptions) {
  const id = genId()

  sonnerToast(title, {
    description,
    action,
    duration: duration ?? TOAST_REMOVE_DELAY,
    id,
    className: variant === 'destructive' ? 'bg-red-500 text-white' : undefined,
  })

  dispatch([...memoryState, id].slice(-TOAST_LIMIT))
  return { id }
}

function dismiss(toastId?: string) {
  if (toastId) {
    sonnerToast.dismiss(toastId)
    dispatch(memoryState.filter((id) => id !== toastId))
  } else {
    sonnerToast.dismiss()
    dispatch([])
  }
}

function useToast() {
  const [toasts, setToasts] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setToasts)
    return () => {
      const index = listeners.indexOf(setToasts)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return { toasts, toast, dismiss }
}

export { useToast, toast, dismiss }
