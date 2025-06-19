import { Line } from 'react-konva';

export function Put({ polje1, polje2, boja }) {
  return (
    <Line
      points={[polje1.x, polje1.y, polje2.x, polje2.y]}
      stroke={boja}
      strokeWidth={6}
      lineCap="round"
    />
  );
}