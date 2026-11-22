import { Input } from '@base-ui/react/input';

export default function InputDemo() {
  return (
    <div className="demo-stack">
      <label className="field-label" htmlFor="player-name">Player name</label>
      <Input id="player-name" className="px-input" placeholder="e.g. pixel_pioneer" />
      <label className="field-label" htmlFor="bad-name">With an error</label>
      <Input id="bad-name" className="px-input" defaultValue="??" aria-invalid="true" />
    </div>
  );
}
