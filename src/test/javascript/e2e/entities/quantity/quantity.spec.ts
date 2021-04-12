import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import QuantityComponentsPage from './quantity.page-object';
import QuantityUpdatePage from './quantity-update.page-object';
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

describe('Quantity e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let quantityComponentsPage: QuantityComponentsPage;
  let quantityUpdatePage: QuantityUpdatePage;

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
    quantityComponentsPage = new QuantityComponentsPage();
    quantityComponentsPage = await quantityComponentsPage.goToPage(navBarPage);
  });

  it('should load Quantities', async () => {
    expect(await quantityComponentsPage.title.getText()).to.match(/Quantities/);
    expect(await quantityComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Quantities', async () => {
    const beforeRecordsCount = (await isVisible(quantityComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(quantityComponentsPage.table);
    quantityUpdatePage = await quantityComponentsPage.goToCreateQuantity();
    await quantityUpdatePage.enterData();

    expect(await quantityComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(quantityComponentsPage.table);
    await waitUntilCount(quantityComponentsPage.records, beforeRecordsCount + 1);
    expect(await quantityComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await quantityComponentsPage.deleteQuantity();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(quantityComponentsPage.records, beforeRecordsCount);
      expect(await quantityComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(quantityComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
