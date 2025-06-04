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
    const title = chrome.i18n.getMessage('aboutTitle');
    if (title) {
      document.title = title;
    }
  }

  var readyStateCheckInterval = window.setInterval(function () {
    if (document.readyState === 'complete') {

      window.clearInterval(readyStateCheckInterval);

      // 首先加载i18n文本
      loadI18nMessages();

      var versionEl = document.getElementById('aboutVersion');
      versionEl.innerHTML = 'The Great-<span class="italic">er</span> Tab Discarder v' + chrome.runtime.getManifest().version;

    }
  }, 50);

}());
