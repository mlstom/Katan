// ImageComponent.jsx
import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

function ImageComponent({ src, x, y, width, height }) {
  const [image] = useImage(src);

  return (
    <Image
      image={image}
      x={x}
      y={y}
      offsetX={width / 2 }
      offsetY={height / 2 }
      width={width}
      height={height}
    />
  );
}

export default ImageComponent;
