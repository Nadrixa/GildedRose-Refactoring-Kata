using System;
using Xunit;
using System.Collections.Generic;
using System.Linq;
using ApprovalTests;
using ApprovalTests.Reporters;
using GildedRoseKata;

namespace GildedRoseTests
{
    public class GildedRoseTest
    {
        [Fact]
        [UseReporter(typeof(DiffReporter))]
        public void ShouldKeepTheSameBehaviour()
        {
            IList<Item> items = new List<Item>
            {
                new() { Name = "foo", SellIn = 0, Quality = 0 },
                new() { Name = "foo", SellIn = 0, Quality = 1 },
                new() { Name = "foo", SellIn = 0, Quality = 2 },
                new() { Name = "Aged Brie", SellIn = 0, Quality = 1 },
                new() { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 0, Quality = 1 },
                new() { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 1, Quality = 1 },
                new() { Name = "Sulfuras, Hand of Ragnaros", SellIn = 0, Quality = 80 }
            };
            GildedRose app = new GildedRose(items);
            app.UpdateQuality();
            var itemsDetail = from item in items
                select $"{item.Name}, {item.SellIn}, {item.Quality}";
            Approvals.Verify(String.Join("\n", itemsDetail));
        }
    }
}
