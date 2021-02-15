import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class RewardUpdatePage {
  pageTitle: ElementFinder = element(by.id('afparecetteApp.reward.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  rewardInput: ElementFinder = element(by.css('input#reward-reward'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setRewardInput(reward) {
    await this.rewardInput.sendKeys(reward);
  }

  async getRewardInput() {
    return this.rewardInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setRewardInput('reward');
    expect(await this.getRewardInput()).to.match(/reward/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
