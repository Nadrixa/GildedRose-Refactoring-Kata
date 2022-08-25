import { verify } from 'approvals';
import { Item, GildedRose } from '@/gilded-rose';
import { generateGoldenMasterTextTestFor } from '../generate-golden-master-text-test';

describe('Gilded Rose', () => {
  it('Should keep the same behaviour', () => {
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
