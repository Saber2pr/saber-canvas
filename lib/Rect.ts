/*
 * @Author: AK-12
 * @Date: 2019-01-03 11:03:08
 * @Last Modified by:   AK-12
 * @Last Modified time: 2019-01-03 11:03:08
 */
import { IRectProps, INodeProps, ILabelProps } from './Canvas'
/**
 * @export
 * @interface IRect
 * @extends {IRectProps}
 */
export interface IRect extends IRectProps {
  setPosition(x: number, y: number): this
  setSize(w: number, h: number): this
}
/**
 * @export
 * @interface INode
 * @extends {INodeProps}
 */
export interface INode extends INodeProps {
  setColor(color: string): this
}
/**
 * @export
 * @interface ILabel
 * @extends {ILabelProps}
 */
export interface ILabel extends ILabelProps {
  setText(text: string): this
  setFontSize(fontSize: number): this
  setFontStyle(fontStyle: string): this
}
/**
 * @export
 * @class Rect
 * @implements {IRect}
 */
export class Rect implements IRect {
  type: IRect['type']
  x: number
  y: number
  w: number
  h: number
  /**
   *Creates an instance of Rect.
   * @param {number} w
   * @param {number} h
   * @memberof Rect
   */
  constructor(w: number, h: number) {
    this.x = 0
    this.y = 0
    this.w = w
    this.h = h
    this.type = 'Rect'
  }
  /**
   * @param {number} x
   * @param {number} y
   * @returns
   * @memberof Rect
   */
  public setPosition(x: number, y: number) {
    this.x = x
    this.y = y
    return this
  }
  /**
   * @param {number} w
   * @param {number} h
   * @returns
   * @memberof Rect
   */
  public setSize(w: number, h: number) {
    this.w = w
    this.h = h
    return this
  }
}
/**
 * @export
 * @class Node
 * @extends {Rect}
 * @implements {INode}
 */
export class Node extends Rect implements INode {
  type: INode['type']
  color: string
  /**
   *Creates an instance of Node.
   * @param {number} w
   * @param {number} h
   * @memberof Node
   */
  constructor(w: number, h: number) {
    super(w, h)
    this.color = '#3a32af'
    this.type = 'Node'
  }
  /**
   * @param {string} color
   * @returns
   * @memberof Node
   */
  public setColor(color: string) {
    this.color = color
    return this
  }
}
/**
 * @export
 * @class Label
 * @extends {Node}
 * @implements {ILabel}
 */
export class Label extends Node implements ILabel {
  type: ILabel['type']
  fontSize: number
  fontStyle: string
  text: string
  /**
   *Creates an instance of Label.
   * @param {string} text
   * @param {number} [fontSize=23]
   * @memberof Label
   */
  constructor(text: string, fontSize: number = 23) {
    super(text.length * fontSize, fontSize)
    this.fontStyle = 'serif'
    this.color = '563a6d'
    this.text = text
    this.fontSize = fontSize
    this.type = 'Label'
  }
  /**
   * @param {number} fontSize
   * @returns
   * @memberof Label
   */
  public setFontSize(fontSize: number) {
    this.fontSize = fontSize
    this.setSize(this.text.length * fontSize, fontSize)
    return this
  }
  /**
   * @param {string} fontStyle
   * @returns
   * @memberof Label
   */
  public setFontStyle(fontStyle: string) {
    this.fontStyle = fontStyle
    return this
  }
  /**
   * @param {string} text
   * @returns
   * @memberof Label
   */
  public setText(text: string) {
    this.text = text
    return this
  }
}
