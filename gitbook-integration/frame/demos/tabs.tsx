import { Tabs } from '@base-ui/react/tabs';

export default function TabsDemo() {
  return (
    <Tabs.Root defaultValue="inventory" className="demo-stack">
      <Tabs.List className="px-tab-list" aria-label="Character info">
        <Tabs.Tab className="px-tab" value="inventory">Inventory</Tabs.Tab>
        <Tabs.Tab className="px-tab" value="skills">Skills</Tabs.Tab>
        <Tabs.Tab className="px-tab" value="map">Map</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="inventory">Sword, shield and three potions.</Tabs.Panel>
      <Tabs.Panel value="skills">Archery 7 · Stealth 4 · Cooking 9</Tabs.Panel>
      <Tabs.Panel value="map">You are in the Night Garden.</Tabs.Panel>
    </Tabs.Root>
  );
}
