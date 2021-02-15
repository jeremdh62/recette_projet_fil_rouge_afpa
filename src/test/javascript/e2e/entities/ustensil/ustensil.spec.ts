import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UstensilComponentsPage from './ustensil.page-object';
import UstensilUpdatePage from './ustensil-update.page-object';
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

describe('Ustensil e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ustensilComponentsPage: UstensilComponentsPage;
  let ustensilUpdatePage: UstensilUpdatePage;

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
    ustensilComponentsPage = new UstensilComponentsPage();
    ustensilComponentsPage = await ustensilComponentsPage.goToPage(navBarPage);
  });

  it('should load Ustensils', async () => {
    expect(await ustensilComponentsPage.title.getText()).to.match(/Ustensils/);
    expect(await ustensilComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Ustensils', async () => {
    const beforeRecordsCount = (await isVisible(ustensilComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(ustensilComponentsPage.table);
    ustensilUpdatePage = await ustensilComponentsPage.goToCreateUstensil();
    await ustensilUpdatePage.enterData();

    expect(await ustensilComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(ustensilComponentsPage.table);
    await waitUntilCount(ustensilComponentsPage.records, beforeRecordsCount + 1);
    expect(await ustensilComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await ustensilComponentsPage.deleteUstensil();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(ustensilComponentsPage.records, beforeRecordsCount);
      expect(await ustensilComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(ustensilComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
