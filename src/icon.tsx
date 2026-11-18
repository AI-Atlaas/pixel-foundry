import { Star } from 'pixelarticons/react/Star.js';
import { Check } from 'pixelarticons/react/Check.js';
import { Heart } from 'pixelarticons/react/Heart.js';
import { Plus } from 'pixelarticons/react/Plus.js';
import { ArrowRight } from 'pixelarticons/react/ArrowRight.js';
import { ChevronDown } from 'pixelarticons/react/ChevronDown.js';
import { Grid2x22 } from 'pixelarticons/react/Grid2x22.js';
import { Code } from 'pixelarticons/react/Code.js';
import { Sun } from 'pixelarticons/react/Sun.js';
import { Moon } from 'pixelarticons/react/Moon.js';
import { Copy } from 'pixelarticons/react/Copy.js';
import { Reload } from 'pixelarticons/react/Reload.js';
import { Close } from 'pixelarticons/react/Close.js';
import { Search } from 'pixelarticons/react/Search.js';
import { BookOpen } from 'pixelarticons/react/BookOpen.js';
import { Sliders } from 'pixelarticons/react/Sliders.js';
import { ExternalLink } from 'pixelarticons/react/ExternalLink.js';
import { Download } from 'pixelarticons/react/Download.js';
import { Menu } from 'pixelarticons/react/Menu.js';
import { ArrowsHorizontal } from 'pixelarticons/react/ArrowsHorizontal.js';
import { InfoBox } from 'pixelarticons/react/InfoBox.js';
import { Minus } from 'pixelarticons/react/Minus.js';
import { Square } from 'pixelarticons/react/Square.js';

// Pixelarticons Base (MIT). Native 24px grid; 12px is reserved for compact details.
const icons = {
  star: Star, check: Check, heart: Heart, plus: Plus, arrow: ArrowRight, down: ChevronDown,
  grid: Grid2x22, code: Code, sun: Sun, moon: Moon, copy: Copy, reset: Reload, close: Close,
  search: Search, book: BookOpen, sliders: Sliders, external: ExternalLink, download: Download,
  menu: Menu, arrows: ArrowsHorizontal, info: InfoBox, minus: Minus, square: Square,
};

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];

/** Pixel icon snapped to 12, 24 or 48px so strokes stay crisp. */
export function Icon({ name = 'star', size = 24 }: { name?: IconName; size?: number }) {
  const Component = icons[name] ?? Star;
  const dimension = size <= 12 ? 12 : size <= 32 ? 24 : 48;
  return (
    <Component
      width={dimension}
      height={dimension}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      data-icon={name}
      style={{ flexShrink: 0 }}
    />
  );
}
