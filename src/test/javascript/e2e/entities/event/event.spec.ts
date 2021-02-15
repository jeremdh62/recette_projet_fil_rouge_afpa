import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EventComponentsPage from './event.page-object';
import EventUpdatePage from './event-update.page-object';
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

describe('Event e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let eventComponentsPage: EventComponentsPage;
  let eventUpdatePage: EventUpdatePage;

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
    eventComponentsPage = new EventComponentsPage();
    eventComponentsPage = await eventComponentsPage.goToPage(navBarPage);
  });

  it('should load Events', async () => {
    expect(await eventComponentsPage.title.getText()).to.match(/Events/);
    expect(await eventComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Events', async () => {
    const beforeRecordsCount = (await isVisible(eventComponentsPage.noRecords)) ? 0 : await getRecordsCount(eventComponentsPage.table);
    eventUpdatePage = await eventComponentsPage.goToCreateEvent();
    await eventUpdatePage.enterData();

    expect(await eventComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(eventComponentsPage.table);
    await waitUntilCount(eventComponentsPage.records, beforeRecordsCount + 1);
    expect(await eventComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await eventComponentsPage.deleteEvent();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(eventComponentsPage.records, beforeRecordsCount);
      expect(await eventComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(eventComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
