import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

import path from 'path';

const expect = chai.expect;

const fileToUpload = '../../../../../../src/main/webapp/content/images/logo-jhipster.png';
const absolutePath = path.resolve(__dirname, fileToUpload);
export default class RecipeUpdatePage {
  pageTitle: ElementFinder = element(by.id('afparecetteApp.recipe.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#recipe-name'));
  descriptionInput: ElementFinder = element(by.css('input#recipe-description'));
  pictureInput: ElementFinder = element(by.css('input#file_picture'));
  videoInput: ElementFinder = element(by.css('input#recipe-video'));
  difficultyInput: ElementFinder = element(by.css('input#recipe-difficulty'));
  priceInput: ElementFinder = element(by.css('input#recipe-price'));
  unrollRecipeInput: ElementFinder = element(by.css('textarea#recipe-unrollRecipe'));
  nbPersonInput: ElementFinder = element(by.css('input#recipe-nbPerson'));
  timeInput: ElementFinder = element(by.css('input#recipe-time'));
  seasonInput: ElementFinder = element(by.css('input#recipe-season'));
  originInput: ElementFinder = element(by.css('input#recipe-origin'));
  onlineInput: ElementFinder = element(by.css('input#recipe-online'));
  cookingInput: ElementFinder = element(by.css('input#recipe-cooking'));
  favoriteInput: ElementFinder = element(by.css('input#recipe-favorite'));
  createdAtInput: ElementFinder = element(by.css('input#recipe-createdAt'));
  updatedAtInput: ElementFinder = element(by.css('input#recipe-updatedAt'));
  ingredientSelect: ElementFinder = element(by.css('select#recipe-ingredient'));
  ustensilSelect: ElementFinder = element(by.css('select#recipe-ustensil'));
  categorySelect: ElementFinder = element(by.css('select#recipe-category'));
  eventSelect: ElementFinder = element(by.css('select#recipe-event'));
  userinfoSelect: ElementFinder = element(by.css('select#recipe-userinfo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setPictureInput(picture) {
    await this.pictureInput.sendKeys(picture);
  }

  async getPictureInput() {
    return this.pictureInput.getAttribute('value');
  }

  async setVideoInput(video) {
    await this.videoInput.sendKeys(video);
  }

  async getVideoInput() {
    return this.videoInput.getAttribute('value');
  }

  async setDifficultyInput(difficulty) {
    await this.difficultyInput.sendKeys(difficulty);
  }

  async getDifficultyInput() {
    return this.difficultyInput.getAttribute('value');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return this.priceInput.getAttribute('value');
  }

  async setUnrollRecipeInput(unrollRecipe) {
    await this.unrollRecipeInput.sendKeys(unrollRecipe);
  }

  async getUnrollRecipeInput() {
    return this.unrollRecipeInput.getAttribute('value');
  }

  async setNbPersonInput(nbPerson) {
    await this.nbPersonInput.sendKeys(nbPerson);
  }

  async getNbPersonInput() {
    return this.nbPersonInput.getAttribute('value');
  }

  async setTimeInput(time) {
    await this.timeInput.sendKeys(time);
  }

  async getTimeInput() {
    return this.timeInput.getAttribute('value');
  }

  async setSeasonInput(season) {
    await this.seasonInput.sendKeys(season);
  }

  async getSeasonInput() {
    return this.seasonInput.getAttribute('value');
  }

  async setOriginInput(origin) {
    await this.originInput.sendKeys(origin);
  }

  async getOriginInput() {
    return this.originInput.getAttribute('value');
  }

  getOnlineInput() {
    return this.onlineInput;
  }
  async setCookingInput(cooking) {
    await this.cookingInput.sendKeys(cooking);
  }

  async getCookingInput() {
    return this.cookingInput.getAttribute('value');
  }

  getFavoriteInput() {
    return this.favoriteInput;
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

  async ustensilSelectLastOption() {
    await this.ustensilSelect.all(by.tagName('option')).last().click();
  }

  async ustensilSelectOption(option) {
    await this.ustensilSelect.sendKeys(option);
  }

  getUstensilSelect() {
    return this.ustensilSelect;
  }

  async getUstensilSelectedOption() {
    return this.ustensilSelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption() {
    await this.categorySelect.all(by.tagName('option')).last().click();
  }

  async categorySelectOption(option) {
    await this.categorySelect.sendKeys(option);
  }

  getCategorySelect() {
    return this.categorySelect;
  }

  async getCategorySelectedOption() {
    return this.categorySelect.element(by.css('option:checked')).getText();
  }

  async eventSelectLastOption() {
    await this.eventSelect.all(by.tagName('option')).last().click();
  }

  async eventSelectOption(option) {
    await this.eventSelect.sendKeys(option);
  }

  getEventSelect() {
    return this.eventSelect;
  }

  async getEventSelectedOption() {
    return this.eventSelect.element(by.css('option:checked')).getText();
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
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPictureInput(absolutePath);
    await waitUntilDisplayed(this.saveButton);
    await this.setVideoInput('video');
    expect(await this.getVideoInput()).to.match(/video/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDifficultyInput('5');
    expect(await this.getDifficultyInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPriceInput('5');
    expect(await this.getPriceInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setUnrollRecipeInput('unrollRecipe');
    expect(await this.getUnrollRecipeInput()).to.match(/unrollRecipe/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNbPersonInput('5');
    expect(await this.getNbPersonInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setTimeInput('PT12S');
    expect(await this.getTimeInput()).to.contain('12');
    await waitUntilDisplayed(this.saveButton);
    await this.setSeasonInput('season');
    expect(await this.getSeasonInput()).to.match(/season/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOriginInput('origin');
    expect(await this.getOriginInput()).to.match(/origin/);
    await waitUntilDisplayed(this.saveButton);
    const selectedOnline = await this.getOnlineInput().isSelected();
    if (selectedOnline) {
      await this.getOnlineInput().click();
      expect(await this.getOnlineInput().isSelected()).to.be.false;
    } else {
      await this.getOnlineInput().click();
      expect(await this.getOnlineInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setCookingInput('cooking');
    expect(await this.getCookingInput()).to.match(/cooking/);
    await waitUntilDisplayed(this.saveButton);
    const selectedFavorite = await this.getFavoriteInput().isSelected();
    if (selectedFavorite) {
      await this.getFavoriteInput().click();
      expect(await this.getFavoriteInput().isSelected()).to.be.false;
    } else {
      await this.getFavoriteInput().click();
      expect(await this.getFavoriteInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setCreatedAtInput('01-01-2001');
    expect(await this.getCreatedAtInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setUpdatedAtInput('01-01-2001');
    expect(await this.getUpdatedAtInput()).to.eq('2001-01-01');
    // this.ingredientSelectLastOption();
    // this.ustensilSelectLastOption();
    // this.categorySelectLastOption();
    // this.eventSelectLastOption();
    await this.userinfoSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
