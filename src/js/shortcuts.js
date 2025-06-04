// @ts-check

(function () {

  'use strict';

  /**
   * 加载i18n文本到页面元素
   */
  function loadI18nMessages() {
    // 加载所有带有data-i18n属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const messageKey = element.getAttribute('data-i18n');
      if (messageKey) {
        const message = chrome.i18n.getMessage(messageKey);
        if (message) {
          element.textContent = message;
        }
      }
    });

    // 设置页面标题
    const title = chrome.i18n.getMessage('shortcutsTitle');
    if (title) {
      document.title = title;
    }
  }

  var readyStateCheckInterval = window.setInterval(function () {
    if (document.readyState === 'complete') {

      window.clearInterval(readyStateCheckInterval);

      // 首先加载i18n文本
      loadI18nMessages();

      const
        // optionEls   = document.getElementsByClassName('option'),
        shortcutsEl = document.getElementById('keyboardShortcuts'),
        configureEl = document.getElementById('configureShortcuts');
      let count = 0;

      if (!shortcutsEl || !configureEl) return;

      //populate keyboard shortcuts
      chrome.commands.getAll(function (commands) {
        commands.forEach(function (command) {
          // console.log(command);
          const description = command.description || 'Activate this extension';
          const shortcut = command.shortcut !== '' ? command.shortcut : chrome.i18n.getMessage('notSet') || '(not set)';
          const style = [3, 5].includes(count) ? 'margin: 15px 0 0;' : '';
          shortcutsEl.innerHTML += `<div style="${style}">${description}: &nbsp; <span class="bold">${shortcut}</span></div>`;
          count++;
        });
      });

      //listener for configureShortcuts
      configureEl.onclick = () => {
        chrome.tabs.create({ url: 'chrome://extensions/configureCommands' });
        return false;
      };
    }
  }, 100);

}());
