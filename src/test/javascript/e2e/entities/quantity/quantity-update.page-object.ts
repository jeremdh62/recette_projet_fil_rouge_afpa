import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class QuantityUpdatePage {
  pageTitle: ElementFinder = element(by.id('afparecetteApp.quantity.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  qtyInput: ElementFinder = element(by.css('input#quantity-qty'));
  unitInput: ElementFinder = element(by.css('input#quantity-unit'));
  ingredientSelect: ElementFinder = element(by.css('select#quantity-ingredient'));
  recipeSelect: ElementFinder = element(by.css('select#quantity-recipe'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setQtyInput(qty) {
    await this.qtyInput.sendKeys(qty);
  }

  async getQtyInput() {
    return this.qtyInput.getAttribute('value');
  }

  async setUnitInput(unit) {
    await this.unitInput.sendKeys(unit);
  }

  async getUnitInput() {
    return this.unitInput.getAttribute('value');
  }

  async ingredientSelectLastOption() {
    await this.ingredientSelect.all(by.tagName('option')).last().click();
  }

  async ingredientSelectOption(option) {
    await this.ingredientSelect.sendKeys(option);
  }

  getIngredientSelect() {
    return this.ingredientSelect;
  }

  async getIngredientSelectedOption() {
    return this.ingredientSelect.element(by.css('option:checked')).getText();
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
    await this.setQtyInput('5');
    expect(await this.getQtyInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setUnitInput('unit');
    expect(await this.getUnitInput()).to.match(/unit/);
    await this.ingredientSelectLastOption();
    await this.recipeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
