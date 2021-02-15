import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class NoteUpdatePage {
  pageTitle: ElementFinder = element(by.id('afparecetteApp.note.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  noteInput: ElementFinder = element(by.css('input#note-note'));
  recipeSelect: ElementFinder = element(by.css('select#note-recipe'));
  userinfoSelect: ElementFinder = element(by.css('select#note-userinfo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNoteInput(note) {
    await this.noteInput.sendKeys(note);
  }

  async getNoteInput() {
    return this.noteInput.getAttribute('value');
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
    await this.setNoteInput('5');
    expect(await this.getNoteInput()).to.eq('5');
    await this.recipeSelectLastOption();
    await this.userinfoSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
