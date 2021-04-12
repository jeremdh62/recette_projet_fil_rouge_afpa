import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import QuantityUpdatePage from './quantity-update.page-object';

const expect = chai.expect;
export class QuantityDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('afparecetteApp.quantity.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-quantity'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class QuantityComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('quantity-heading'));
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
    await navBarPage.getEntityPage('quantity');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateQuantity() {
    await this.createButton.click();
    return new QuantityUpdatePage();
  }

  async deleteQuantity() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const quantityDeleteDialog = new QuantityDeleteDialog();
    await waitUntilDisplayed(quantityDeleteDialog.deleteModal);
    expect(await quantityDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/afparecetteApp.quantity.delete.question/);
    await quantityDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(quantityDeleteDialog.deleteModal);

    expect(await isVisible(quantityDeleteDialog.deleteModal)).to.be.false;
  }
}
