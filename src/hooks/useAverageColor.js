const { useEffect, useState } = require('react');
import { FastAverageColor } from 'fast-average-color';

const fac = new FastAverageColor();
export default function useAverageColor(dom) {
  const [color, setColor] = useState('#fff');
  useEffect(() => {
    if (dom) {
      fac
        .getColorAsync(dom, { mode: 'speed', algorithm: 'simple' })
        .then((color) => {
          setColor(color?.hex || '#fff');
        })
        .catch((e) => {});
    }
  }, [dom]);
  return color;
}
