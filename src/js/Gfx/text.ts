module Gfx.Text {
  import config = Config;
  var messageContainer;
  var timer;

  export function hideMessage() {
    if (timer) {
      clearTimeout(timer);
    }
    if (!messageContainer) {
      messageContainer = document.getElementById(config.gameConfig.message.domId);
    }
    messageContainer.innerHTML = "";
  }

  export function showMessage(message) {
    hideMessage();
    if (!messageContainer) {
      messageContainer = document.getElementById(config.gameConfig.message.domId);
    }
    messageContainer.innerHTML = message;
    timer = setTimeout(hideMessage, config.gameConfig.message.displayTime);
  } 
}