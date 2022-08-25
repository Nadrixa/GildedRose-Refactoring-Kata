export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => createSellableItemWith(item).updateQuality());
    return this.items;
  }
}

function createSellableItemWith(item: Item): SellableItem {

  const sellableItemNames = {
    'Sulfuras, Hand of Ragnaros': SulfurasItem,
    'Aged Brie': AgedBrieItem,
    'Backstage passes to a TAFKAL80ETC concert': BackstagePasseItem,
    'Conjured Mana Cake': ConjuredItem
  }

  return sellableItemNames[item.name] !== undefined ? new sellableItemNames[item.name](item) : new SellableItem(item);
}

class SellableItem {
  constructor(protected item: Item) {}

  updateQuality(): void {
    this.decreaseItemQuality();
    this.decreaseItemSellIn();

    if (this.itemDoesNotHaveSellIn()) {
      this.decreaseItemQuality();
    }
  }

  decreaseItemSellIn() {
    this.item.sellIn = this.item.sellIn - 1;
  }

  decreaseItemQuality() {
    const item = this.item;
    if (!itemHasQuality()) return;
    this.item.quality = this.item.quality - 1

    function itemHasQuality() {
      return item.quality > 0;
    }
  }

  itemDoesNotHaveSellIn() {
    return this.item.sellIn < 0;
  }

  increaseItemQuality() {
    const item = this.item;
    if (!itemQualityIsBelowTheLimit()) return;
    item.quality = item.quality + 1

    function itemQualityIsBelowTheLimit() {
      const qualityLimit = 50;
      return item.quality < qualityLimit;
    }
  }
}

class SulfurasItem extends SellableItem {

  updateQuality(): void {
    return;
  }
}

class AgedBrieItem extends SellableItem {

  updateQuality(): void {
    this.increaseItemQuality();
    this.decreaseItemSellIn();
    if (this.itemDoesNotHaveSellIn()) this.increaseItemQuality()
  }

}

class BackstagePasseItem extends SellableItem {

  updateQuality() {
    const item = this.item;
    this.increaseItemQuality();
    if (itemIsBelowFirstConcertProximityThreshold()) {
      this.increaseItemQuality();
    }
    if (itemIsBelowSecondConcertProximityThreshold()) {
      this.increaseItemQuality();
    }
    this.decreaseItemSellIn();

    if (this.itemDoesNotHaveSellIn()) {
      clearItemQuality();
    }

    function itemIsBelowFirstConcertProximityThreshold() {
      const firstConcertProximityThreshold = 11;
      return item.sellIn < firstConcertProximityThreshold;
    }

    function itemIsBelowSecondConcertProximityThreshold() {
      const secondConcertProximityThreshold = 6;
      return item.sellIn < secondConcertProximityThreshold;
    }

    function clearItemQuality() {
      item.quality = 0
    }
  }
}

class ConjuredItem extends SellableItem {

  updateQuality(): void {
    this.decreaseItemQuality();
    this.decreaseItemQuality();
    this.decreaseItemSellIn();
    if (this.itemDoesNotHaveSellIn()) {
      this.decreaseItemQuality();
    }
  }

}
