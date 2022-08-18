import { Item, GildedRose } from '../app/gilded-rose';

export function generateGoldenMasterTextTestFor (days: number = 2): string {
  const items = [
    new Item("+5 Dexterity Vest", 10, 20), //
    new Item("Aged Brie", 2, 0), //
    new Item("Elixir of the Mongoose", 5, 7), //
    new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    // this conjured item does not work properly yet
    new Item("Conjured Mana Cake", 3, 6)];
  
  
  const gildedRose = new GildedRose(items);

  let text = '';
  
  for (let i = 0; i < days; i++) {
    text += `-------- day ${i} --------\n`;
    text += 'name, sellIn, quality\n';
    items.forEach(element => {
      text += `${element.name} ${element.sellIn} ${element.quality}\n`;
    });
    text += '\n';
    gildedRose.updateQuality();
  }

  return text;
}
