import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RewardComponentsPage from './reward.page-object';
import RewardUpdatePage from './reward-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Reward e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rewardComponentsPage: RewardComponentsPage;
  let rewardUpdatePage: RewardUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    rewardComponentsPage = new RewardComponentsPage();
    rewardComponentsPage = await rewardComponentsPage.goToPage(navBarPage);
  });

  it('should load Rewards', async () => {
    expect(await rewardComponentsPage.title.getText()).to.match(/Rewards/);
    expect(await rewardComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Rewards', async () => {
    const beforeRecordsCount = (await isVisible(rewardComponentsPage.noRecords)) ? 0 : await getRecordsCount(rewardComponentsPage.table);
    rewardUpdatePage = await rewardComponentsPage.goToCreateReward();
    await rewardUpdatePage.enterData();

    expect(await rewardComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(rewardComponentsPage.table);
    await waitUntilCount(rewardComponentsPage.records, beforeRecordsCount + 1);
    expect(await rewardComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await rewardComponentsPage.deleteReward();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(rewardComponentsPage.records, beforeRecordsCount);
      expect(await rewardComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(rewardComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
