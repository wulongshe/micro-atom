import { useEffect } from 'react'

export function useNextTick() {
  const stack: (() => void)[] = []
  const promise = new Promise<void>((resolve) => stack.push(resolve))

  useEffect(() => {
    stack.forEach((fn) => fn())
  })

  function nextTick(fn: () => void): void
  function nextTick(): Promise<void>
  function nextTick(fn?: () => void) {
    if (!fn) return promise
    stack.push(fn)
  }

  return nextTick
}
