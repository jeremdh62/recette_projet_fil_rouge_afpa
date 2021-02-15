import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CommentsUpdatePage {
  pageTitle: ElementFinder = element(by.id('afparecetteApp.comments.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  commentsInput: ElementFinder = element(by.css('textarea#comments-comments'));
  userinfoSelect: ElementFinder = element(by.css('select#comments-userinfo'));
  recipeSelect: ElementFinder = element(by.css('select#comments-recipe'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCommentsInput(comments) {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput() {
    return this.commentsInput.getAttribute('value');
  }

  async userinfoSelectLastOption() {
    await this.userinfoSelect.all(by.tagName('option')).last().click();
  }

  async userinfoSelectOption(option) {
    await this.userinfoSelect.sendKeys(option);
  }

  getUserinfoSelect() {
    return this.userinfoSelect;
  }

  async getUserinfoSelectedOption() {
    return this.userinfoSelect.element(by.css('option:checked')).getText();
  }

  async recipeSelectLastOption() {
    await this.recipeSelect.all(by.tagName('option')).last().click();
  }

  async recipeSelectOption(option) {
    await this.recipeSelect.sendKeys(option);
  }

  getRecipeSelect() {
    return this.recipeSelect;
  }

  async getRecipeSelectedOption() {
    return this.recipeSelect.element(by.css('option:checked')).getText();
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
    await this.setCommentsInput('comments');
    expect(await this.getCommentsInput()).to.match(/comments/);
    await this.userinfoSelectLastOption();
    await this.recipeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
