import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import NoteUpdatePage from './note-update.page-object';

const expect = chai.expect;
export class NoteDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('afparecetteApp.note.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-note'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class NoteComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('note-heading'));
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
    await navBarPage.getEntityPage('note');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateNote() {
    await this.createButton.click();
    return new NoteUpdatePage();
  }

  async deleteNote() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const noteDeleteDialog = new NoteDeleteDialog();
    await waitUntilDisplayed(noteDeleteDialog.deleteModal);
    expect(await noteDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/afparecetteApp.note.delete.question/);
    await noteDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(noteDeleteDialog.deleteModal);

    expect(await isVisible(noteDeleteDialog.deleteModal)).to.be.false;
  }
}
