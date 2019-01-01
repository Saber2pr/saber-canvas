/*
 * @Author: AK-12
 * @Date: 2018-12-29 18:55:04
 * @Last Modified by: AK-12
 * @Last Modified time: 2019-01-01 10:50:02
 */
/**
 * compose
 *
 * @export
 * @template T
 * @param {...Array<(...args: T[]) => T>} funcs
 * @returns
 */
export function compose<T>(...funcs: Array<(...args: T[]) => T>) {
  if (funcs.length === 0) {
    return (arg: T) => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
/**
 * clone
 *
 * @export
 * @template T
 * @param {T} value
 * @returns {T}
 */
export const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))
/**
 * Observer
 *
 * @export
 * @interface Observer
 * @template T
 */
export interface Observer<T> {
  (state: T): void
}
/**
 * UnSubscribe
 *
 * @export
 * @interface UnSubscribe
 * @template T
 */
export interface UnSubscribe<T> {
  (): Observer<T>[]
}
/**
 * Observable
 *
 * @export
 * @class Observable
 * @template T
 */
export class Observable<T = any> {
  /**
   *Creates an instance of Observable.
   * @param {T} state
   * @memberof Observable
   */
  constructor(state: T) {
    this.state = state
    this.observers = new Array<Observer<T>>()
  }
  protected state: T
  private observers: Array<Observer<T>>
  /**
   * subscribe
   *
   * @param {Observer<T>} observer
   * @returns {UnSubscribe<T>}
   * @memberof Observable
   */
  public subscribe(observer: Observer<T>): UnSubscribe<T> {
    this.observers.push(observer)
    return () =>
      (this.observers = this.observers.filter(obser => obser !== observer))
  }
  /**
   * pipe
   *
   * @param {...Array<(...args: T[]) => T>} funcs
   * @memberof Observable
   */
  public pipe(...funcs: Array<(...args: T[]) => T>) {
    !(async () => compose(...funcs.reverse())(this.state))().then(state => {
      this.state = state
      this.observers.forEach(observer => observer(this.state))
    })
    return this
  }
  /**
   * push
   *
   * @param {T} state
   * @memberof Observable
   */
  public push(state: T) {
    return this.pipe(() => clone(state))
  }
  /**
   * pull
   *
   * @returns {T}
   * @memberof Observable
   */
  public pull(): T {
    return clone(this.state)
  }
}
