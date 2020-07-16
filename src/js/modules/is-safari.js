const isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
  navigator.userAgent &&
  navigator.userAgent.indexOf('CriOS') < 0 &&
  navigator.userAgent.indexOf('FxiOS') < 0;

export default () => {
  if (isSafari) {
    document.body.classList.add(`safari`);
  }
}
