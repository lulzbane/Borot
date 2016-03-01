var Gfx;
(function (Gfx) {
    var Text;
    (function (Text) {
        var config = Config;
        var messageContainer;
        var timer;
        function hideMessage() {
            if (timer) {
                clearTimeout(timer);
            }
            if (!messageContainer) {
                messageContainer = document.getElementById(config.gameConfig.message.domId);
            }
            messageContainer.innerHTML = "";
        }
        Text.hideMessage = hideMessage;
        function showMessage(message) {
            hideMessage();
            if (!messageContainer) {
                messageContainer = document.getElementById(config.gameConfig.message.domId);
            }
            messageContainer.innerHTML = message;
            timer = setTimeout(hideMessage, config.gameConfig.message.displayTime);
        }
        Text.showMessage = showMessage;
    })(Text = Gfx.Text || (Gfx.Text = {}));
})(Gfx || (Gfx = {}));
//# sourceMappingURL=text.js.map