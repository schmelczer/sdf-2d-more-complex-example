import { vec2 } from "gl-matrix";
import {
  compile,
  rgb,
  hsl,
  CircleLight,
  RotatedRectangleFactory,
} from "sdf-2d";

const main = async () => {
  const canvas = document.querySelector("canvas");

  // Set the rectangle to use the zeroth element of the colorPalette
  const Rectangle = RotatedRectangleFactory(0);

  const renderer = await compile(canvas, [
    Rectangle.descriptor,
    CircleLight.descriptor,
  ]);

  const setHue = (hue) =>
    renderer.setRuntimeSettings({
      colorPalette: [hsl(hue, 100, 50)],
    });

  let aspectRatio;
  const setViewArea = () => {
    const canvasSize = renderer.canvasSize;
    aspectRatio = canvasSize.x / canvasSize.y;

    // The view area is given in a coordinate system originated
    // from the bottom (!) left edge of the canvas
    renderer.setViewArea(
      vec2.fromValues(0, 1),
      vec2.fromValues(aspectRatio, 1)
    );
  };

  setViewArea();
  onresize = setViewArea;

  const rectangle = new Rectangle(
    vec2.fromValues(0.5, 0.5),
    vec2.fromValues(0.3, 0.2),
    0
  );

  const light = new CircleLight(vec2.create(), rgb(1, 0.5, 0.1), 0.0005);

  const animate = (currentTime) => {
    // Animate the rectangle
    setHue(((currentTime / 4000) * 360) % 360);
    vec2.set(rectangle.center, aspectRatio / 2, 0.5);
    rectangle.rotation = currentTime / 2000;

    // Animate the light
    vec2.set(
      light.center,
      ((Math.sin(currentTime / 1000) + 1) / 2) * aspectRatio,
      1
    );

    // Render
    renderer.addDrawable(rectangle);
    renderer.addDrawable(light);
    renderer.renderDrawables();

    // Get info
    console.info(renderer.insights);

    // Schedule next frame to be drawn
    // More information:
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

main();
