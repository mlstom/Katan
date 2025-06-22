import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import Konva from "konva";

// ✅ Import both dice sprites
import dice1Sprite from "../assets/kockica2.png";
import dice2Sprite from "../assets/kockica1.png";

const FRAME_WIDTH = 32;
const FRAME_HEIGHT = 32;
const FRAME_COUNT = 6;

export default function DoubleDiceRoller({ onRoll }) {
  const [dice1Img, setDice1Img] = useState(null);
  const [dice2Img, setDice2Img] = useState(null);
  const dice1Ref = useRef();
  const dice2Ref = useRef();

  const anim1Ref = useRef();
  const anim2Ref = useRef();

  // Load both images
  useEffect(() => {
    const img1 = new Image();
    img1.src = dice1Sprite;
    img1.onload = () => setDice1Img(img1);

    const img2 = new Image();
    img2.src = dice2Sprite;
    img2.onload = () => setDice2Img(img2);
  }, []);

  const rollDice = () => {
    const d1 = dice1Ref.current;
    const d2 = dice2Ref.current;

    if (!d1?.getLayer() || !d2?.getLayer()) {
      setTimeout(rollDice, 50);
      return;
    }

    let frame = 0;
    const totalFrames = 12;

    anim1Ref.current = new Konva.Animation(() => {
      d1.crop({
        x: FRAME_WIDTH * (frame % FRAME_COUNT),
        y: 0,
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
      });
    }, d1.getLayer());

    anim2Ref.current = new Konva.Animation(() => {
      d2.crop({
        x: FRAME_WIDTH * (frame % FRAME_COUNT),
        y: 0,
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
      });
    }, d2.getLayer());

    anim1Ref.current.start();
    anim2Ref.current.start();

    const interval = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        clearInterval(interval);
        anim1Ref.current.stop();
        anim2Ref.current.stop();

        const result1 = Math.floor(Math.random() * FRAME_COUNT);
        const result2 = Math.floor(Math.random() * FRAME_COUNT);

        d1.crop({
          x: FRAME_WIDTH * result1,
          y: 0,
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
        });

        d2.crop({
          x: FRAME_WIDTH * result2,
          y: 0,
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
        });

        if (onRoll) {
          onRoll(result1 + 1, result2 + 1);
        }
      }
    }, 100);
  };

  return (
    <div>
      <button onClick={rollDice}>Roll Dice</button>
      <Stage width={200} height={100}>
        <Layer>
          {dice1Img && (
            <KonvaImage
              image={dice1Img}
              ref={dice1Ref}
              x={20}
              y={20}
              width={FRAME_WIDTH}
              height={FRAME_HEIGHT}
              crop={{
                x: 0,
                y: 0,
                width: FRAME_WIDTH,
                height: FRAME_HEIGHT,
              }}
            />
          )}
          {dice2Img && (
            <KonvaImage
              image={dice2Img}
              ref={dice2Ref}
              x={140}
              y={20}
              width={FRAME_WIDTH}
              height={FRAME_HEIGHT}
              crop={{
                x: 0,
                y: 0,
                width: FRAME_WIDTH,
                height: FRAME_HEIGHT,
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}