import { act, renderHook } from '@testing-library/react-hooks';
import { useReducer } from 'react';
import { expect, test, describe } from 'vitest';
import { useNextTick } from '../src';

describe('useNextTick', () => {
  test('normal', () => {
    const result: number[] = [];
    const {
      result: { current: dispatch },
    } = renderHook(() => {
      const [count, dispatch] = useReducer((count) => count + 3, 0);
      result.push(count);
      if (count < 3) {
        result.push(count + 2);
        dispatch();
      }
      result.push(count + 1);
      return dispatch;
    });
    act(() => dispatch());
    expect(result).toEqual([0, 2, 1, 3, 4, 6, 7]);
  });

  test('one callback', () => {
    const result: number[] = [];
    const {
      result: { current: dispatch },
    } = renderHook(() => {
      const [count, dispatch] = useReducer((count) => count + 3, 0);
      const nextTick = useNextTick();
      result.push(count);
      if (count < 3) {
        nextTick(() => {
          result.push(count + 2);
          dispatch();
        });
      }
      result.push(count + 1);
      return dispatch;
    });
    act(() => dispatch());
    expect(result).toEqual([0, 1, 2, 3, 4, 6, 7]);
  });

  test('two callback', () => {
    const result: number[] = [];
    renderHook(() => {
      const [count, dispatch] = useReducer((count) => count + 5, 0);
      const nextTick = useNextTick();
      result.push(count);
      if (count < 5) {
        nextTick(() => {
          result.push(count + 1);
        });
      }
      result.push(count + 2);
      if (count < 6) {
        nextTick(() => {
          result.push(count + 3);
          dispatch();
        });
      }
      result.push(count + 4);
      return dispatch;
    });
    expect(result).toEqual([0, 2, 4, 1, 3, 5, 7, 9, 8, 10, 12, 14]);
  });

  test('promise', () => {
    const result: number[] = [];
    const {
      result: { current: dispatch },
    } = renderHook(() => {
      const [count, dispatch] = useReducer((count) => count + 3, 0);
      const nextTick = useNextTick();
      result.push(count);
      if (count < 3) {
        (async () => {
          await nextTick();
          result.push(count + 2);
          dispatch();
        })();
      }
      result.push(count + 1);
      return dispatch;
    });
    act(() => dispatch());
    setTimeout(() => {
      expect(result).toEqual([0, 1, 3, 4, 2, 6, 7]);
    });
  });
});
