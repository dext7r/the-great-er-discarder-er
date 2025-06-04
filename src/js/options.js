// @ts-check

import { storage } from './storage.js';

(function () {

  'use strict';

  let currentOptions;

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
    const title = chrome.i18n.getMessage('optionsTitle');
    if (title) {
      document.title = title;
    }

    // 特殊处理select选项中的时间单位
    updateTimeOptions();
  }

  /**
   * 更新时间选项的显示文本
   */
  function updateTimeOptions() {
    const timeSelect = document.getElementById('timeToDiscard');
    if (timeSelect instanceof HTMLSelectElement) {
      const options = timeSelect.querySelectorAll('option');
      options.forEach(option => {
        const value = option.value;
        let newText = '';

        switch (value) {
          case '0':
            newText = chrome.i18n.getMessage('never');
            break;
          case '0.05':
            newText = '3 seconds';
            break;
          case '0.33':
            newText = '20 seconds';
            break;
          case '1':
            newText = '1 min';
            break;
          case '5':
            newText = `5 ${chrome.i18n.getMessage('minutes')}`;
            break;
          case '10':
            newText = `10 ${chrome.i18n.getMessage('minutes')}`;
            break;
          case '15':
            newText = `15 ${chrome.i18n.getMessage('minutes')}`;
            break;
          case '30':
            newText = `30 ${chrome.i18n.getMessage('minutes')}`;
            break;
          case '60':
            newText = `1 ${chrome.i18n.getMessage('hour')}`;
            break;
          case '120':
            newText = `2 ${chrome.i18n.getMessage('hours')}`;
            break;
          case '240':
            newText = `4 ${chrome.i18n.getMessage('hours')}`;
            break;
          case '360':
            newText = `6 ${chrome.i18n.getMessage('hours')}`;
            break;
          case '720':
            newText = `12 ${chrome.i18n.getMessage('hours')}`;
            break;
          case '1440':
            newText = `1 ${chrome.i18n.getMessage('day')}`;
            break;
          case '2880':
            newText = `2 ${chrome.i18n.getMessage('days')}`;
            break;
          case '4320':
            newText = `3 ${chrome.i18n.getMessage('days')}`;
            break;
        }

        if (newText) {
          option.textContent = newText;
        }
      });
    }
  }

  function initialize() {
    // console.log('options initialize', storage, options);

    // 首先加载i18n文本
    loadI18nMessages();

    for (const element of document.getElementsByClassName('option')) {
      // console.log('initialize', element);
      if (element instanceof HTMLElement) {
        //add change listeners for all 'option' elements
        element.onchange = handleChange(element);
        populateOption(element, currentOptions[element.id]);
      }
    }

    setAutoDiscardOptionsVisibility(currentOptions[storage.DISCARD_TIME] > 0);
    setSyncNoteVisibility(!currentOptions[storage.SYNC_OPTIONS]);
  }

  /**
   * @param {boolean} [value]
   */
  function setModeLabels(value) {
    // console.log('setModeLabels', currentOptions);
    document.querySelectorAll('span.modeLabel').forEach((element) => {
      const current = value === undefined ? currentOptions[storage.SUSPEND_MODE] : value;
      element.innerHTML = current ? chrome.i18n.getMessage('suspend') : chrome.i18n.getMessage('discard');
    });

    // 同时更新标签页设置相关的文本
    updateModeSpecificLabels(current);
  }

  /**
   * 更新与模式相关的标签文本
   * @param {boolean} suspendMode
   */
  function updateModeSpecificLabels(suspendMode) {
    const modeText = suspendMode ? chrome.i18n.getMessage('suspend') : chrome.i18n.getMessage('discard');

    // 更新复选框标签
    const pinnedLabel = document.querySelector('label[for="dontDiscardPinned"] span[data-i18n="doNotDiscardPinned"]');
    if (pinnedLabel) {
      pinnedLabel.textContent = chrome.i18n.getMessage('doNotDiscardPinned', [modeText]);
    }

    const audioLabel = document.querySelector('label[for="dontDiscardAudio"] span[data-i18n="doNotDiscardAudio"]');
    if (audioLabel) {
      audioLabel.textContent = chrome.i18n.getMessage('doNotDiscardAudio', [modeText]);
    }

    const onlineLabel = document.querySelector('label[for="onlineCheck"] span[data-i18n="onlineCheck"]');
    if (onlineLabel) {
      onlineLabel.textContent = chrome.i18n.getMessage('onlineCheck', [modeText]);
    }

    const batteryLabel = document.querySelector('label[for="batteryCheck"] span[data-i18n="batteryCheck"]');
    if (batteryLabel) {
      batteryLabel.textContent = chrome.i18n.getMessage('batteryCheck', [modeText]);
    }
  }

  /**
   * @param {Element} element
   * @param {any}         value
   */
  function populateOption(element, value) {
    // console.log('populateOption', element, value);

    if (element instanceof HTMLInputElement) {
      element.checked = value;
    }
    else if (element instanceof HTMLSelectElement) {
      element.value = value;
    }
    else if (element instanceof HTMLTextAreaElement) {
      element.value = value;
    }
  }

  /**
   * @param {Element} element
   */
  function getOptionValue(element) {
    // console.log('getOptionValue', element);

    if (element instanceof HTMLInputElement) {
      return element.checked;
    }
    else if (element instanceof HTMLSelectElement) {
      return element.value;
    }
    else if (element instanceof HTMLTextAreaElement) {
      return element.value;
    }
  }

  /**
   * @param {boolean} visible
   */
  function setAutoDiscardOptionsVisibility(visible) {
    Array.prototype.forEach.call(document.getElementsByClassName('autoDiscardOption'), (el) => {
      el.style.display = visible ? 'block' : 'none';
    });
  }

  /**
   * @param {boolean} visible
   */
  function setSyncNoteVisibility(visible) {
    const syncNote = document.getElementById('syncNote');
    if (syncNote) {
      syncNote.style.display = visible ? 'block' : 'none';
    }
  }

  /**
   * @param {Element} element
   */
  function handleChange(element) {
    return () => {

      const value = getOptionValue(element);
      if (element.id === storage.DISCARD_TIME) {
        setAutoDiscardOptionsVisibility(Boolean(value));
      }
      else if (element.id === storage.SYNC_OPTIONS) {
        setSyncNoteVisibility(!value);
      }
      else if (element.id === storage.SUSPEND_MODE) {
        setModeLabels(Boolean(value));
      }

      saveChanges(document.getElementsByClassName('option'));

    };
  }

  /**
   * @param {HTMLCollectionOf<Element>} elements
   */
  async function saveChanges(elements) {
    // console.log(['saveChanges',elements]);
    var options = {};
    for (const element of elements) {

      const oldValue = currentOptions[element.id];
      let newValue = getOptionValue(element);
      // console.log('saveChanges', element.id, pref, newValue);

      //clean up whitelist before saving
      if (element.id === storage.WHITELIST) {
        newValue = (await chrome.runtime.sendMessage({ action: 'cleanWhitelist', value: newValue })).value;
      }

      //if interval has changed then reset the tab timers
      if (element.id === storage.DISCARD_TIME && oldValue !== newValue) {
        chrome.runtime.sendMessage({ action: 'resetTabTimers' });
      }

      options[element.id] = newValue;
    }

    // Update the context menu
    chrome.runtime.sendMessage({ action: 'updateContextMenuItems', visible: options[storage.ADD_CONTEXT], discards: options[storage.ADD_DISCARDS] });

    await chrome.runtime.sendMessage({ action: 'setOptions', options });
    // sync options are now saved within setOptions
  }

  function closeSettings() {
    //only close the window if we were opened in a new tab.
    //else, go back to the page we were on.
    //this is to fix closing tabs if they were opened from the context menu.
    if (document.referrer === "") {
      window.close();
    } else {
      history.back();
    }
  }


  chrome.runtime.sendMessage({ action: 'requestCurrentOptions' }, (optionsObj) => {
    currentOptions = optionsObj;
    initialize();
  });

}());
