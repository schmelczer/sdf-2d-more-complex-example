import { compile, Circle, CircleLight } from "sdf-2d";

const main = async () => {
  const canvas = document.querySelector("canvas");
  const renderer = await compile(canvas, [
    Circle.descriptor,
    CircleLight.descriptor,
  ]);

  renderer.addDrawable(new Circle([200, 200], 50));
  renderer.addDrawable(new CircleLight([500, 300], [1, 0.5, 0], 0.5));

  renderer.renderDrawables();
};

main();
