import { test, expect } from 'vitest'
import { useState, run } from '../src'

test('useState', async () => {
  const result: number[] = []
  await new Promise<void>((resolve) => {
    function func() {
      const [count, setCount] = useState(0)
      if (count > 2) return resolve()
      setTimeout(() => {
        result.push(count)
        setCount(count + 1)
      }, 20)
    }
    run(func)
  })
  expect(result).toEqual([0, 1, 2])
})

