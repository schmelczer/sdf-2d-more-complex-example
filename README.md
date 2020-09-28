# SDF-2D more complex example

The end result is also available [here](https://schmelczerandras.github.io/sdf-2d-more-complex-example/dist/index.html).

The SDF-2D library can be found on [GitHub](https://github.com/schmelczerandras/sdf-2d) and [NPM](https://www.npmjs.com/package/sdf-2d) as well.

## Running

Simply clone the repository and open [index.html](dist/index.html).

## Building

- Install [Node.js](https://nodejs.org/en/)
- Run `npm install`
- Run `npx webpack`
- Open [index.html](dist/index.html)

## Reproducing this from scratch

We'll be using the files and directory structure created in the [minimal example](https://github.com/schmelczerandras/sdf-2d-minimal-example).

- Paste the following `HTML` into the `<head>` of `index.html`
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    html,
    body,
    canvas {
      margin: 0;
      width: 100%;
      height: 100%;
    }
  </style>
  ```
- Install [gl-matrix](http://glmatrix.net/docs/) by running `npm install gl-matrix --save-dev`
- Copy the following code into `index.js`

  ```js
  import { vec2, vec3 } from "gl-matrix";
  import { compile, Circle, CircleLight } from "sdf-2d";

  const main = async () => {
    const canvas = document.querySelector("canvas");

    const renderer = await compile(canvas, [
      Circle.descriptor,
      CircleLight.descriptor,
    ]);

    renderer.setRuntimeSettings({
      colorPalette: [
        vec3.create(),
        vec3.create(),
        vec3.fromValues(0.5, 0.2, 1), // By default, Circle has a colorIndex of 2
      ],
    });

    let aspectRatio;
    const setViewArea = () => {
      const canvasSize = renderer.canvasSize;
      aspectRatio = canvasSize.x / canvasSize.y;

      // The view area is given in a coordinate system
      // originated from the bottom (!) left edge of the canvas
      renderer.setViewArea(
        vec2.fromValues(0, 1),
        vec2.fromValues(aspectRatio, 1)
      );
    };

    setViewArea();
    onresize = setViewArea;

    const circle = new Circle(vec2.fromValues(0.5, 0.5), 0.1);
    const light = new CircleLight(
      vec2.create(),
      vec3.fromValues(1, 0.5, 0.1),
      0.0005
    );

    const animate = (currentTime) => {
      vec2.set(circle.center, aspectRatio / 2, 0.5);
      vec2.set(
        light.center,
        ((Math.sin(currentTime / 1000) + 1) / 2) * aspectRatio,
        1
      );

      renderer.addDrawable(circle);
      renderer.addDrawable(light);
      renderer.renderDrawables();

      console.log(renderer.insights);

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  main();
  ```

- Run `npx webpack`
- You're finished, open `index.html`

## Next steps

- For an even more complex example, look at the [source code](https://github.com/schmelczerandras/sdf-2d-demo) of the [demo page](https://sdf2d.schmelczer.dev/).
- Or start building your own solution.
  > For a better development and debugging experience, I advise you to look at the [library's documentation](https://schmelczerandras.github.io/sdf-2d/).
- Have fun! 🙂
