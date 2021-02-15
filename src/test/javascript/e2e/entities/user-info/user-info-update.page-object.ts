import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class UserInfoUpdatePage {
  pageTitle: ElementFinder = element(by.id('afparecetteApp.userInfo.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  newsletterInput: ElementFinder = element(by.css('input#user-info-newsletter'));
  createdAtInput: ElementFinder = element(by.css('input#user-info-createdAt'));
  updatedAtInput: ElementFinder = element(by.css('input#user-info-updatedAt'));
  userNameInput: ElementFinder = element(by.css('input#user-info-userName'));
  userSelect: ElementFinder = element(by.css('select#user-info-user'));
  roleSelect: ElementFinder = element(by.css('select#user-info-role'));
  rewardSelect: ElementFinder = element(by.css('select#user-info-reward'));

  getPageTitle() {
    return this.pageTitle;
  }

  getNewsletterInput() {
    return this.newsletterInput;
  }
  async setCreatedAtInput(createdAt) {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput() {
    return this.createdAtInput.getAttribute('value');
  }

  async setUpdatedAtInput(updatedAt) {
    await this.updatedAtInput.sendKeys(updatedAt);
  }

  async getUpdatedAtInput() {
    return this.updatedAtInput.getAttribute('value');
  }

  async setUserNameInput(userName) {
    await this.userNameInput.sendKeys(userName);
  }

  async getUserNameInput() {
    return this.userNameInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async roleSelectLastOption() {
    await this.roleSelect.all(by.tagName('option')).last().click();
  }

  async roleSelectOption(option) {
    await this.roleSelect.sendKeys(option);
  }

  getRoleSelect() {
    return this.roleSelect;
  }

  async getRoleSelectedOption() {
    return this.roleSelect.element(by.css('option:checked')).getText();
  }

  async rewardSelectLastOption() {
    await this.rewardSelect.all(by.tagName('option')).last().click();
  }

  async rewardSelectOption(option) {
    await this.rewardSelect.sendKeys(option);
  }

  getRewardSelect() {
    return this.rewardSelect;
  }

  async getRewardSelectedOption() {
    return this.rewardSelect.element(by.css('option:checked')).getText();
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
    const selectedNewsletter = await this.getNewsletterInput().isSelected();
    if (selectedNewsletter) {
      await this.getNewsletterInput().click();
      expect(await this.getNewsletterInput().isSelected()).to.be.false;
    } else {
      await this.getNewsletterInput().click();
      expect(await this.getNewsletterInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01-01-2001');
    expect(await this.getCreatedAtInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedAtInput('01-01-2001');
    expect(await this.getUpdatedAtInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setUserNameInput('userName');
    expect(await this.getUserNameInput()).to.match(/userName/);
    await this.userSelectLastOption();
    await this.roleSelectLastOption();
    await this.rewardSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
