import { useState, useCallback, useReducer } from 'react';

const atomMap = new WeakMap();

/**
 * 约定用const申明返回值，最顶层数据不可修改
 */
export function useAtom<T extends object>(state: T): T {
  const [, dispatch] = useReducer((val) => ++val % (2 << 16), 0);
  const [data] = useState(state);
  const atom = useCallback(function <V extends object>(obj: V): V {
    if (atomMap.has(obj)) {
      return atomMap.get(obj);
    }
    const proxyAtom = new Proxy(obj, {
      get(target, key) {
        const value = Reflect.get(target, key);
        return typeof value === 'object' && value !== null ? atom(value) : value;
      },
      set(target, key, value) {
        Reflect.set(target, key, value);
        dispatch();
        return true;
      },
    });
    atomMap.set(obj, proxyAtom);
    return proxyAtom;
  }, []);
  return atom(data);
}
