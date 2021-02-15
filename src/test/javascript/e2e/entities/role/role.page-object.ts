import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import RoleUpdatePage from './role-update.page-object';

const expect = chai.expect;
export class RoleDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('afparecetteApp.role.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-role'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class RoleComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('role-heading'));
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
    await navBarPage.getEntityPage('role');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateRole() {
    await this.createButton.click();
    return new RoleUpdatePage();
  }

  async deleteRole() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const roleDeleteDialog = new RoleDeleteDialog();
    await waitUntilDisplayed(roleDeleteDialog.deleteModal);
    expect(await roleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/afparecetteApp.role.delete.question/);
    await roleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(roleDeleteDialog.deleteModal);

    expect(await isVisible(roleDeleteDialog.deleteModal)).to.be.false;
  }
}
