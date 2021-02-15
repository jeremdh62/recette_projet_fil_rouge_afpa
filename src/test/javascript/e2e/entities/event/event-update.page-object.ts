import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EventUpdatePage {
  pageTitle: ElementFinder = element(by.id('afparecetteApp.event.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  eventInput: ElementFinder = element(by.css('input#event-event'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEventInput(event) {
    await this.eventInput.sendKeys(event);
  }

  async getEventInput() {
    return this.eventInput.getAttribute('value');
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
    await this.setEventInput('event');
    expect(await this.getEventInput()).to.match(/event/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
