import { verify } from 'approvals';
import { Item, GildedRose } from '@/gilded-rose';
import { generateGoldenMasterTextTestFor } from '../generate-golden-master-text-test';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('fixme');
  });

  it('verify approvals library works', () => {
    const approvals = new Approvals();
    approvals.verify(generateGoldenMasterTextTestFor(30));
  });
});

class Approvals {
  generateApprovalFile(content: string) {
    this.callVerifyWith(content, { forceApproveAll: true });
  }

  verify(content: string) {
    this.callVerifyWith(content);
  }

  private callVerifyWith(content: string, options?: any) {
    verify(__dirname, 'gildedRoseGM', content, { reporters: ['meld'], ...options });
  }
}