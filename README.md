# saber-canvas

> use canvas easily!

```bash
npm install saber-canvas
```

```ts
new Canvas('hello', 640, 480)
  .draw(new Node(640, 480))
  .draw(new Label('hello world!').setPosition(300, 20))
  .draw(new Node(100, 200).setColor('blue').setPosition(200, 200))
```

![loadingImage...](https://github.com/Saber2pr/MyWeb/raw/master/resource/canvas.png)
