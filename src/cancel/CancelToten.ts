import { Canceler, CancelExecutor, CancelTokenSource } from '../types'
import Cancel from './Cancel'

interface PromiseResolve {
  (reason: Cancel): void
}

export class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let promiseResolve: PromiseResolve

    this.promise = new Promise<Cancel>(resolve => {
      promiseResolve = resolve
    })

    // 执行传入的executor
    executor(message => {
      if (this.reason) {
        return
      }

      this.reason = new Cancel(message)
      promiseResolve(this.reason)
    })
  }

  throwIfCanceled() {
    if (this.reason) {
      throw this.reason
    }
  }

  // 相当于CancelToken的工厂函数，把token和cancel返回
  static source(): CancelTokenSource {
    let cancel: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })

    return {
      cancel: cancel!,
      token
    }
  }
}
