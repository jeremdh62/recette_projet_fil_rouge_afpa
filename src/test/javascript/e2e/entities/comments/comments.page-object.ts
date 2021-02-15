import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CommentsUpdatePage from './comments-update.page-object';

const expect = chai.expect;
export class CommentsDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('afparecetteApp.comments.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-comments'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CommentsComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('comments-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('comments');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateComments() {
    await this.createButton.click();
    return new CommentsUpdatePage();
  }

  async deleteComments() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const commentsDeleteDialog = new CommentsDeleteDialog();
    await waitUntilDisplayed(commentsDeleteDialog.deleteModal);
    expect(await commentsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/afparecetteApp.comments.delete.question/);
    await commentsDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(commentsDeleteDialog.deleteModal);

    expect(await isVisible(commentsDeleteDialog.deleteModal)).to.be.false;
  }
}
