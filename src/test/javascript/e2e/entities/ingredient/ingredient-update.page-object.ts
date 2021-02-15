import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class IngredientUpdatePage {
  pageTitle: ElementFinder = element(by.id('afparecetteApp.ingredient.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  ingredientInput: ElementFinder = element(by.css('input#ingredient-ingredient'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIngredientInput(ingredient) {
    await this.ingredientInput.sendKeys(ingredient);
  }

  async getIngredientInput() {
    return this.ingredientInput.getAttribute('value');
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
    await this.setIngredientInput('ingredient');
    expect(await this.getIngredientInput()).to.match(/ingredient/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
