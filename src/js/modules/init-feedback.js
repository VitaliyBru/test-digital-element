import PopupController from "./classes/popup-controller";

export default () => {
  const feedbackPopup = new PopupController({
    'open-button': `.js-feedback-open`,
    'close-button': `.js-feedback-close`,
    'close-success': `.js-feedback-success`,
    'popup-overlay': `.js-feedback-overlay`,
    'form-name': `feedback`
  });
  feedbackPopup.initPopup();
}
