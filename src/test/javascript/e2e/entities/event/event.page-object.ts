import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EventUpdatePage from './event-update.page-object';

const expect = chai.expect;
export class EventDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('afparecetteApp.event.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-event'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EventComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('event-heading'));
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
    await navBarPage.getEntityPage('event');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEvent() {
    await this.createButton.click();
    return new EventUpdatePage();
  }

  async deleteEvent() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const eventDeleteDialog = new EventDeleteDialog();
    await waitUntilDisplayed(eventDeleteDialog.deleteModal);
    expect(await eventDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/afparecetteApp.event.delete.question/);
    await eventDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(eventDeleteDialog.deleteModal);

    expect(await isVisible(eventDeleteDialog.deleteModal)).to.be.false;
  }
}
