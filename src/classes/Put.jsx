import { Line } from 'react-konva';

export function Put({ polje1, polje2, boja }) {
  const bojaString = `rgba(${boja.r},${boja.g},${boja.b})`
  return (
    <Line
      points={[polje1.x, polje1.y, polje2.x, polje2.y]}
      stroke={bojaString}
      strokeWidth={6}
      lineCap="round"
    />
  );
}