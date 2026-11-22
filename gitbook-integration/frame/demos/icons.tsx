import { Icon, iconNames } from '@ai-atlaas/pixel-foundry';

export default function IconsDemo() {
  return (
    <div className="demo-icons">
      {iconNames.map((name) => (
        <figure key={name}>
          <Icon name={name} />
          <figcaption>{name}</figcaption>
        </figure>
      ))}
    </div>
  );
}
