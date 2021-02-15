import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import RewardUpdatePage from './reward-update.page-object';

const expect = chai.expect;
export class RewardDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('afparecetteApp.reward.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-reward'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class RewardComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('reward-heading'));
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
    await navBarPage.getEntityPage('reward');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateReward() {
    await this.createButton.click();
    return new RewardUpdatePage();
  }

  async deleteReward() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const rewardDeleteDialog = new RewardDeleteDialog();
    await waitUntilDisplayed(rewardDeleteDialog.deleteModal);
    expect(await rewardDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/afparecetteApp.reward.delete.question/);
    await rewardDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(rewardDeleteDialog.deleteModal);

    expect(await isVisible(rewardDeleteDialog.deleteModal)).to.be.false;
  }
}
