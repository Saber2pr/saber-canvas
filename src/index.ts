import { randVec } from './lib/rand'
import { call } from './lib/call'
import { IMethod, IResult, mergeMat } from './lib/2048'
import { Mat, MatSet, Mat_foreach } from './lib/Mat'
import { Canvas, Label, Node } from './lib/Canvas'
import { $ } from './lib/dom'

let len = 4
let size = 70
let margin = size + 10

let mat = new Mat(0, len)
let canvas = new Canvas('2048', 400, 400)

let drawBackground = () =>
  canvas
    .clear()
    .draw(new Node(400, 400))
    .draw(new Label('2048').setPosition(170, 10))
drawBackground()

let matRaw = raw => 60 + 10 + raw * margin
let matCol = col => 10 + col * margin + 60

mat.subscribe(arr => {
  drawBackground()
  Mat_foreach<number>(arr, (value, raw, col) =>
    canvas.draw(
      new Label(String(value))
        .setPosition(matRaw(raw), matCol(col))
        .setColor('red')
    )
  )
})

let merge = (method: IMethod) =>
  new Promise<IResult>(resolve =>
    mat.pipe(
      arr => call(() => MatSet(arr, 2, randVec(arr.length)), 2),
      arr => {
        let result = mergeMat(arr, method)
        resolve(result)
        return result.map
      }
    )
  )

let initButtons = (method: IMethod) =>
  ($<HTMLButtonElement>(method).onclick = () => merge(method))

initButtons('up')
initButtons('down')
initButtons('left')
initButtons('right')

let title = new Label('hello world').setPosition(170, 10)
let background = new Node(640, 480)
let block = new Node(60, 100).setColor('green').setPosition(200, 100)

new Canvas('hello', 500, 500).draw(background, block).draw(title)
