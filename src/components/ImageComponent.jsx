// ImageComponent.jsx
import Konva from "konva";
import React, { useEffect, useRef } from "react";
import { Group, Image } from "react-konva";
import useImage from "use-image";

function ImageComponent({ src, x, y, width, height, red, green, blue,onClickKuca }) {
  const [image] = useImage(src);
  const imgRef = useRef()
  const shouldColorize = red != null && green != null && blue != null;
  useEffect(() => {
    if (imgRef.current) {
      
      if (shouldColorize) {
        imgRef.current.cache()
        imgRef.current.filters([Konva.Filters.RGBA])
        imgRef.current.red(red)
        imgRef.current.blue(blue)
        imgRef.current.green(green)
      }
    }
  }, [image])


  return (
    <Group listening={true} onClick={()=>onClickKuca?onClickKuca():null}>
      <Image
        ref={imgRef}
        image={image}
        x={x}
        y={y}
        offsetX={width / 2}
        offsetY={height / 2}
        width={width}
        height={height}
      />


      {shouldColorize && (
        <Image
          image={image}
          width={width}
          height={height}
          x={x}
          y={y}
          offsetX={width / 2}
          offsetY={height / 2}
          opacity={0.8}
          globalCompositeOperation="multiply"
        />
      )}

    </Group>
  );
}

export default ImageComponent;
