import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RoleComponentsPage from './role.page-object';
import RoleUpdatePage from './role-update.page-object';
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

describe('Role e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let roleComponentsPage: RoleComponentsPage;
  let roleUpdatePage: RoleUpdatePage;

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
    roleComponentsPage = new RoleComponentsPage();
    roleComponentsPage = await roleComponentsPage.goToPage(navBarPage);
  });

  it('should load Roles', async () => {
    expect(await roleComponentsPage.title.getText()).to.match(/Roles/);
    expect(await roleComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Roles', async () => {
    const beforeRecordsCount = (await isVisible(roleComponentsPage.noRecords)) ? 0 : await getRecordsCount(roleComponentsPage.table);
    roleUpdatePage = await roleComponentsPage.goToCreateRole();
    await roleUpdatePage.enterData();

    expect(await roleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(roleComponentsPage.table);
    await waitUntilCount(roleComponentsPage.records, beforeRecordsCount + 1);
    expect(await roleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await roleComponentsPage.deleteRole();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(roleComponentsPage.records, beforeRecordsCount);
      expect(await roleComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(roleComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
