import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NoteComponentsPage from './note.page-object';
import NoteUpdatePage from './note-update.page-object';
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

describe('Note e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let noteComponentsPage: NoteComponentsPage;
  let noteUpdatePage: NoteUpdatePage;

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
    noteComponentsPage = new NoteComponentsPage();
    noteComponentsPage = await noteComponentsPage.goToPage(navBarPage);
  });

  it('should load Notes', async () => {
    expect(await noteComponentsPage.title.getText()).to.match(/Notes/);
    expect(await noteComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Notes', async () => {
    const beforeRecordsCount = (await isVisible(noteComponentsPage.noRecords)) ? 0 : await getRecordsCount(noteComponentsPage.table);
    noteUpdatePage = await noteComponentsPage.goToCreateNote();
    await noteUpdatePage.enterData();

    expect(await noteComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(noteComponentsPage.table);
    await waitUntilCount(noteComponentsPage.records, beforeRecordsCount + 1);
    expect(await noteComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await noteComponentsPage.deleteNote();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(noteComponentsPage.records, beforeRecordsCount);
      expect(await noteComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(noteComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
