import { useEffect, useState } from 'react';
import { Progress } from '@base-ui/react/progress';

export default function ProgressDemo() {
  const [xp, setXp] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => setXp((v) => (v >= 100 ? 0 : v + 4)), 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <Progress.Root value={xp} className="demo-wide">
      <div className="slider-label">
        <Progress.Label>Experience</Progress.Label>
        <Progress.Value />
      </div>
      <Progress.Track className="px-progress-track">
        <Progress.Indicator className="px-progress-indicator" style={{ height: '100%' }} />
      </Progress.Track>
    </Progress.Root>
  );
}
