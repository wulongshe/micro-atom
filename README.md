# MICRO ATOM

## Description

> 在react中使用响应式数据 / Use responsive data in React

## Install

```bash
npm install micro-atom
```

## Usage

```tsx
import { useAtom } from 'micro-atom';

export default function Counter() {
  const state = useAtom({ count: 0 });
  const increase = () => state.count++;
  const decrease = () => state.count--;
  return (
    <div>
      <p>count: {state.count}</p>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}

```
