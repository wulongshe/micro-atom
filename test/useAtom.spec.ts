import { test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react-hooks'
import { useAtom } from '../src'

test('useAtom', () => {
  const result: number[] = []
  const { result: { current: state } } = renderHook(() => {
    const state = useAtom({ count: 0 })
    result.push(state.count)
    return state
  })

  expect(state.count).toBe(0)
  expect(result).toEqual([0])

  act(() => { state.count++ })

  expect(state.count).toBe(1)
  expect(result).toEqual([0, 1])

  act(() => { state.count++ })

  expect(state.count).toBe(2)
  expect(result).toEqual([0, 1, 2])
})
