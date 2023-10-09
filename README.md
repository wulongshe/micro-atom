# MICRO HOOKS

## Description

> react hooks

## Install

```bash
npm install micro-atom
```

## Usage

### useAtom

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

### useNextTick

```tsx
import { useNextTick } from 'micro-atom';
import { useState } from 'react';

export default function Counter() {
  const nextTick = useNextTick();
  const [count, setCount] = useState(0);
  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  nextTick(() => {
    console.log('next tick');
  });

  // or promise
  // const onchange = async () => {
  //   await nextTick()
  //   console.log('next tick')
  // }

  return (
    <div>
      <p>count: {state.count}</p>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  );
}
```
