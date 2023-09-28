type Signal<T> = [T, (value: T | ((prev: T) => T)) => void]

interface FiberNode<T = any> {
  value: Signal<T>
  next: FiberNode | null
}

const stack: any[] = []
let func: any = null

export function run(fn: any) {
  entry(fn)
  fn()
  exit(fn)
}

function entry(fn: any) {
  if (!fn.fiber) {
    fn.fiber = {
      value: null,
      next: null,
    } as unknown as FiberNode
    fn.prev = fn.fiber
  }
  stack.push(func)
  func = fn
}

function exit(fn: any) {
  fn.prev = fn.fiber
  stack.pop()
}

function createSignal<T>(initialValue: T): Signal<T> {
  const signal: Signal<T> = [
    initialValue,
    (valOrCb: T | ((prev: T) => T)) => {
      const value = valOrCb instanceof Function ? valOrCb(signal[0]) : valOrCb
      func.prev = func.fiber
      signal[0] = value
      run(func)
    },
  ]
  return signal
}

export function useState<T>(initialValue: T): Signal<T> {
  if (func.prev.next) {
    const signal = func.prev.next.value
    func.prev = func.prev.next
    return signal
  }
  const signal = createSignal(initialValue)
  const curr = { value: signal, next: null }
  func.prev.next = curr
  func.prev = curr
  return signal
}
