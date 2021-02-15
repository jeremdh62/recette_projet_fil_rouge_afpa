import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class UstensilUpdatePage {
  pageTitle: ElementFinder = element(by.id('afparecetteApp.ustensil.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  ustensilInput: ElementFinder = element(by.css('input#ustensil-ustensil'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUstensilInput(ustensil) {
    await this.ustensilInput.sendKeys(ustensil);
  }

  async getUstensilInput() {
    return this.ustensilInput.getAttribute('value');
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
    await this.setUstensilInput('ustensil');
    expect(await this.getUstensilInput()).to.match(/ustensil/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
