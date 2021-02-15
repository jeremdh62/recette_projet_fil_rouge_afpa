import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import UserInfoUpdatePage from './user-info-update.page-object';

const expect = chai.expect;
export class UserInfoDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('afparecetteApp.userInfo.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-userInfo'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class UserInfoComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('user-info-heading'));
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
    await navBarPage.getEntityPage('user-info');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateUserInfo() {
    await this.createButton.click();
    return new UserInfoUpdatePage();
  }

  async deleteUserInfo() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const userInfoDeleteDialog = new UserInfoDeleteDialog();
    await waitUntilDisplayed(userInfoDeleteDialog.deleteModal);
    expect(await userInfoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/afparecetteApp.userInfo.delete.question/);
    await userInfoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(userInfoDeleteDialog.deleteModal);

    expect(await isVisible(userInfoDeleteDialog.deleteModal)).to.be.false;
  }
}
