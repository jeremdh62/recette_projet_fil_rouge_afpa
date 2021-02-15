import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserInfoComponentsPage from './user-info.page-object';
import UserInfoUpdatePage from './user-info-update.page-object';
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

describe('UserInfo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userInfoComponentsPage: UserInfoComponentsPage;
  let userInfoUpdatePage: UserInfoUpdatePage;

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
    userInfoComponentsPage = new UserInfoComponentsPage();
    userInfoComponentsPage = await userInfoComponentsPage.goToPage(navBarPage);
  });

  it('should load UserInfos', async () => {
    expect(await userInfoComponentsPage.title.getText()).to.match(/User Infos/);
    expect(await userInfoComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete UserInfos', async () => {
    const beforeRecordsCount = (await isVisible(userInfoComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(userInfoComponentsPage.table);
    userInfoUpdatePage = await userInfoComponentsPage.goToCreateUserInfo();
    await userInfoUpdatePage.enterData();

    expect(await userInfoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(userInfoComponentsPage.table);
    await waitUntilCount(userInfoComponentsPage.records, beforeRecordsCount + 1);
    expect(await userInfoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await userInfoComponentsPage.deleteUserInfo();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(userInfoComponentsPage.records, beforeRecordsCount);
      expect(await userInfoComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(userInfoComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
