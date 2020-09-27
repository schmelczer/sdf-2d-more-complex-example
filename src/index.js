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
