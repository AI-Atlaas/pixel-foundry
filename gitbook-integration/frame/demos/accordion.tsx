import { Accordion } from '@base-ui/react/accordion';

const faqs = [
  { q: 'How does it work?', a: 'Base UI behavior. Your pixel theme.' },
  { q: 'Can I use my own palette?', a: 'Yes. Pass an accent color to applyTheme().' },
  { q: 'Does it support dark mode?', a: 'Every palette has a paired dark mode.' },
];

export default function AccordionDemo() {
  return (
    <Accordion.Root className="demo-wide">
      {faqs.map((item) => (
        <Accordion.Item key={item.q} value={item.q}>
          <Accordion.Header>
            <Accordion.Trigger className="px-accordion-trigger">{item.q}</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="px-accordion-panel">{item.a}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
