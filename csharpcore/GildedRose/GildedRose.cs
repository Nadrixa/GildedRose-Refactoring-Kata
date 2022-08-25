using System.Collections.Generic;

namespace GildedRoseKata
{
    public class GildedRose
    {
        readonly IList<Item> _items;
        public GildedRose(IList<Item> items)
        {
            _items = items;
        }

        public void UpdateQuality()
        {
            foreach (var item in _items)
            {
                CreateGildedRoseItemFrom(item).Update();
            }
        }

        private Regular CreateGildedRoseItemFrom(Item item)
        {
            return (item.Name) switch
            {
                "Aged Brie" => new AgedBrie(item),
                "Backstage passes to a TAFKAL80ETC concert" => new BackstagePass(item),
                "Sulfuras, Hand of Ragnaros" => new Sulfuras(item),
                "Conjured" => new Conjured(item),
                _ => new Regular(item)
            };
        }

        private class Conjured : Regular
        {
            public Conjured(Item item) : base(item)
            {
            }

            public override void Update()
            {
                DecreaseQuality();
                DecreaseQuality();
                DecreaseSellIn();
                if(HasSellDateBeenPassed())
                {
                    DecreaseQuality();
                    DecreaseQuality();
                }
            }
        }

        private class Regular
        {
            protected readonly Item Item;

            public Regular(Item item)
            {
                Item = item;
            }

            public virtual void Update()
            {
                DecreaseQuality();
                DecreaseSellIn();
                if (HasSellDateBeenPassed())
                {
                    DecreaseQuality();
                }
            }
            
            protected void DecreaseQuality()
            {
                if (Item.Quality > 0)
                {
                    Item.Quality -= 1;
                }
            }

            protected bool HasSellDateBeenPassed()
            {
                return Item.SellIn < 0;
            }

            protected void DecreaseSellIn()
            {
                Item.SellIn -= 1;
            }
            
            protected void IncreaseQuality()
            {
                if (Item.Quality < 50)
                {
                    Item.Quality += 1;
                }
            }
        }

        private class AgedBrie : Regular
        {
            
            public AgedBrie(Item item) : base(item)
            {
            }
            
            public override void Update()
            {
                IncreaseQuality();
                DecreaseSellIn();
                if (HasSellDateBeenPassed())
                {
                    IncreaseQuality();
                }
            }
        }

        class BackstagePass : Regular
        {

            public BackstagePass(Item item) : base(item)
            {
            }

            public override void Update()
            {
                IncreaseQuality();
                if (isTheConcertBelowTheFirstThreshold())
                {
                    IncreaseQuality();
                }
                if (isTheConcertBelowSecondThreshold())
                {
                    IncreaseQuality();
                }
                DecreaseSellIn();

                if (HasSellDateBeenPassed())
                {
                    clearItemQuality();
                }

                bool isTheConcertBelowTheFirstThreshold()
                {
                    return Item.SellIn < 11;
                }

                bool isTheConcertBelowSecondThreshold()
                {
                    return Item.SellIn < 6;
                }

                void clearItemQuality()
                {
                    Item.Quality = 0;
                }
            }
        }

        class Sulfuras : Regular
        {
            public Sulfuras(Item item) : base(item)
            {
            }
            
            public override void Update()
            {
            }
        }
    }
}
