import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CommentsComponentsPage from './comments.page-object';
import CommentsUpdatePage from './comments-update.page-object';
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

describe('Comments e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let commentsComponentsPage: CommentsComponentsPage;
  let commentsUpdatePage: CommentsUpdatePage;

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
    commentsComponentsPage = new CommentsComponentsPage();
    commentsComponentsPage = await commentsComponentsPage.goToPage(navBarPage);
  });

  it('should load Comments', async () => {
    expect(await commentsComponentsPage.title.getText()).to.match(/Comments/);
    expect(await commentsComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Comments', async () => {
    const beforeRecordsCount = (await isVisible(commentsComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(commentsComponentsPage.table);
    commentsUpdatePage = await commentsComponentsPage.goToCreateComments();
    await commentsUpdatePage.enterData();

    expect(await commentsComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(commentsComponentsPage.table);
    await waitUntilCount(commentsComponentsPage.records, beforeRecordsCount + 1);
    expect(await commentsComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await commentsComponentsPage.deleteComments();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(commentsComponentsPage.records, beforeRecordsCount);
      expect(await commentsComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(commentsComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
